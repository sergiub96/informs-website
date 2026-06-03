export const config = { runtime: 'edge' };

export default function handler(req) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': 'https://informs.ro',
  };
  const key = process.env.GROQ_API_KEY;
  if (!key) return new Response(JSON.stringify({ error: 'Key not set' }), { status: 500, headers });
  return new Response(JSON.stringify({ k: key, prefix: key.slice(0, 8) + '...' }), { headers });
}
