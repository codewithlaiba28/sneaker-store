import { neon } from '@neondatabase/serverless';

export function getNeon() {
  const connectionString = process.env.NEON_DATABASE_URL;
  if (!connectionString) {
    throw new Error('NEON_DATABASE_URL environment variable is not set');
  }
  return neon(connectionString);
}
