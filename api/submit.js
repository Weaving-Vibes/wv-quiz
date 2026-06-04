export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GSHEET_URL = process.env.GSHEET_URL;
  const SECRET     = process.env.SECRET;

  try {
    const data = req.body;
    const response = await fetch(GSHEET_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, secret: SECRET }),
    });

    const text = await response.text();
    console.log('Sheet response:', text);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Submission failed' });
  }
}