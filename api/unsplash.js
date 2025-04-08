export default async function handler(req, res) {
  const query = req.query.q || "tech";
  const accessKey = process.env.UNSPLASH_KEY;

  if (!accessKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}&orientation=landscape`
    );
    const data = await response.json();

    res.status(200).json({ image: data.urls.small });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
}