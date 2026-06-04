export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GSHEET_URL = process.env.GSHEET_URL;
  const SECRET     = process.env.SECRET;

  try {
    const data = req.body;

    // Forward to Google Sheet with secret injected server-side
    const response = await fetch(GSHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, secret: SECRET }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Submission failed' });
  }
}