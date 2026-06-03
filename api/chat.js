module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Cheia Groq nu e configurată pe server.' });
  }

  const { q, context = [] } = req.body || {};
  if (!q) return res.status(400).json({ error: 'Întrebare lipsă.' });

  const ctxText = context.slice(0, 5).map((s, i) => {
    const cod  = s.cod  || (i + 1);
    const cat  = s.cat  || s.categorie  || '';
    const intb = s.q    || s.intrebare  || '';
    const ans  = s.a    || s.raspuns    || '';
    return `---\nSpetă #${cod} | Categorie: ${cat}\nÎntrebare: ${intb}\nRăspuns ANAP: ${ans}`;
  }).join('\n');

  const system = 'Ești un expert în achiziții publice din România. Răspunzi EXCLUSIV în română, concis și precis, bazat pe contextul furnizat. Nu inventa legislație sau articole de lege. Dacă informația lipsește din context, spune explicit că nu o găsești în baza de date.';
  const user   = `Context:\n${ctxText}\n\nÎntrebarea utilizatorului: ${q}\n\nFormulează un răspuns clar și structurat bazat pe contextul de mai sus.`;

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: system },
          { role: 'user',   content: user   },
        ],
        temperature: 0.2,
        max_tokens:  1024,
      }),
    });

    const data = await r.json();

    if (data.error) {
      const msg = (data.error && data.error.message) ? data.error.message : 'Eroare Groq API.';
      return res.status(500).json({ error: msg });
    }

    return res.json({
      raspuns: data.choices[0].message.content,
      surse:   context,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Eroare server: ' + e.message });
  }
};
