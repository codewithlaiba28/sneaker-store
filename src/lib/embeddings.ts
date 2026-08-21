import { pipeline } from '@xenova/transformers';

class EmbeddingPipeline {
  static task = 'feature-extraction';
  static model = 'Xenova/all-MiniLM-L6-v2';
  static instance: any = null;

  static async getInstance(progress_callback?: any) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task as any, this.model, { progress_callback });
    }
    return this.instance;
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const embedder = await EmbeddingPipeline.getInstance();
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}
