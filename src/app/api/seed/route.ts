import { NextResponse } from 'next/server';
import { getNeon } from '@/lib/neon';
import { mockSneakers } from '@/lib/data';
import { generateEmbedding } from '@/lib/embeddings';

export async function GET(req: Request) {
  try {
    const sql = getNeon();

    // 1. Enable pgvector extension
    await sql`CREATE EXTENSION IF NOT EXISTS vector;`;

    // 2. Drop existing table if it exists to reset
    await sql`DROP TABLE IF EXISTS products;`;

    // 3. Create products table
    await sql`
      CREATE TABLE products (
        id VARCHAR(50) PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        category TEXT NOT NULL,
        width_fit TEXT NOT NULL,
        use_case_tags TEXT[],
        materials TEXT[],
        sizes NUMERIC[],
        color TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        embedding vector(384) -- Xenova/all-MiniLM-L6-v2 produces 384-dimensional embeddings
      );
    `;

    // 4. Seed data
    for (const sneaker of mockSneakers) {
      // Create a chunk of text that represents the sneaker for embedding
      const textChunk = `Name: ${sneaker.name}, Category: ${sneaker.category}, Color: ${sneaker.color}, Fit: ${sneaker.widthFit}, Uses: ${sneaker.useCaseTags.join(', ')}, Materials: ${sneaker.materials.join(', ')}, Description: ${sneaker.description}`;
      
      const embedding = await generateEmbedding(textChunk);

      await sql`
        INSERT INTO products (
          id, name, price, category, width_fit, use_case_tags, materials, sizes, color, description, image_url, embedding
        ) VALUES (
          ${sneaker.id}, ${sneaker.name}, ${sneaker.price}, ${sneaker.category}, ${sneaker.widthFit},
          ${sneaker.useCaseTags}, ${sneaker.materials}, ${sneaker.sizes}, ${sneaker.color},
          ${sneaker.description}, ${sneaker.imageUrl}, ${`[${embedding.join(',')}]`}
        )
      `;
    }

    return NextResponse.json({ message: 'Database seeded successfully.' });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
