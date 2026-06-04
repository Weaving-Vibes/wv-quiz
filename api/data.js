export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GSHEET_DATA_URL = process.env.GSHEET_DATA_URL;

  try {
    const response = await fetch(GSHEET_DATA_URL);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Data fetch error:', err);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}