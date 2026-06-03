export const config = { runtime: 'edge' };

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers });
  if (req.method === 'GET')     return new Response(JSON.stringify({ ok: true, runtime: 'edge' }), { headers });
  if (req.method !== 'POST')   return new Response(null, { status: 405, headers });

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return new Response(JSON.stringify({ error: 'Cheia Groq nu e configurată.' }), { status: 500, headers });
  }

  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: 'Body invalid.' }), { status: 400, headers });
  }

  const { q, context = [] } = body;
  if (!q) return new Response(JSON.stringify({ error: 'Întrebare lipsă.' }), { status: 400, headers });

  const ctxText = context.slice(0, 5).map((s, i) => {
    const cod  = s.cod  || (i + 1);
    const cat  = s.cat  || s.categorie  || '';
    const intb = s.q    || s.intrebare  || '';
    const ans  = s.a    || s.raspuns    || '';
    return `---\nSpetă #${cod} | Categorie: ${cat}\nÎntrebare: ${intb}\nRăspuns ANAP: ${ans}`;
  }).join('\n');

  const system = 'Ești un expert în achiziții publice din România. Răspunzi EXCLUSIV în română, concis și precis, bazat pe contextul furnizat. Nu inventa legislație. Dacă informația lipsește din context, spune explicit.';
  const user   = `Context:\n${ctxText}\n\nÎntrebare: ${q}\n\nFormulează un răspuns clar bazat pe context.`;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + GROQ_API_KEY },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        temperature: 0.2,
        max_tokens: 1024,
      }),
    });

    const data = await r.json();
    if (!r.ok || data.error) {
      const msg = data.error?.message || `Groq ${r.status}`;
      return new Response(JSON.stringify({ error: msg }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ raspuns: data.choices[0].message.content, surse: context }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Eroare server: ' + e.message }), { status: 500, headers });
  }
}
