import { NextResponse } from 'next/server';
import { getNeon } from '@/lib/neon';
import { generateEmbedding } from '@/lib/embeddings';

export async function POST(req: Request) {
  try {
    const { messages, shownProductIds = [] } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const sql = getNeon();
    
    // Generate embedding for user query
    const userEmbedding = await generateEmbedding(lastMessage.content);

    // Retrieve top 4 matching products
    let products = [];
    if (shownProductIds.length > 0) {
      products = await sql`
        SELECT id, name, price, category, width_fit as "widthFit", use_case_tags as "useCaseTags", materials, sizes, color, description, image_url as "imageUrl",
               1 - (embedding <=> ${`[${userEmbedding.join(',')}]`}) AS similarity
        FROM products
        WHERE id != ALL(${shownProductIds})
        ORDER BY embedding <=> ${`[${userEmbedding.join(',')}]`}
        LIMIT 4;
      `;
    } else {
      products = await sql`
        SELECT id, name, price, category, width_fit as "widthFit", use_case_tags as "useCaseTags", materials, sizes, color, description, image_url as "imageUrl",
               1 - (embedding <=> ${`[${userEmbedding.join(',')}]`}) AS similarity
        FROM products
        ORDER BY embedding <=> ${`[${userEmbedding.join(',')}]`}
        LIMIT 4;
      `;
    }

    // Construct Context
    const contextLines = products.map((p, i) => 
      `[Product ${i+1}] Name: ${p.name}, Price: $${p.price}, Sizes: ${p.sizes.join(', ')}, Color: ${p.color}, Style/Tags: ${p.useCaseTags.join(', ')}. Description: ${p.description}`
    ).join('\n');

    const systemPrompt = `You are a luxury sneaker fitting assistant for the brand LUMEN.
You are conversational and helpful. Answer the user's specific question directly and naturally.
If the user asks for shoe recommendations or wants to see collections, choose the best matches from the CONTEXT provided below.
If you recommend products to the user, you MUST include the exact text "[SHOW_PRODUCTS]" anywhere in your response. 
If the user is just chatting, saying hi, or asking a general question, DO NOT include "[SHOW_PRODUCTS]" and do not recommend products.
Never invent products, prices, or sizes not present in the context.
If nothing matches well, say so honestly and suggest the closest option from the CONTEXT.
Keep your tone elegant, concise, and professional - matching a quiet luxury brand.

CONTEXT:
${contextLines}
`;

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    // Format messages for Gemini API
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API failed: ${geminiRes.statusText}`);
    }

    const geminiData = await geminiRes.json();
    let aiMessage = geminiData.candidates[0].content.parts[0].text;

    let finalProducts = [];
    if (aiMessage.includes('[SHOW_PRODUCTS]')) {
      finalProducts = products;
      aiMessage = aiMessage.replace('[SHOW_PRODUCTS]', '').trim();
    }

    return NextResponse.json({
      message: aiMessage,
      products: finalProducts // pass products so UI can render mini cards
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
