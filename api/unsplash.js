export default async function handler(req, res) {
  // Allow cross-origin requests (CORS) from any domain
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow any domain to access this resource
  
  // Optional: You could restrict this header to your frontend URL if needed
  // res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Allow only this domain

  // Other CORS headers for more control (for preflight requests):
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query.q || 'tech';
  const accessKey = process.env.UNSPLASH_KEY;

  if (!accessKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}&orientation=landscape`
    );
    const data = await response.json();

    res.status(200).json({ image: data[0].urls.small });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch image" });
  }
}