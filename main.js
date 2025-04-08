const blocks = document.querySelectorAll(".marquee-block");
const keywords = ["code", "tech", "developer", "laptop", "software"];

// Use your Vercel URL here
const BASE_API_URL = "https://muak-portfolio.vercel.app/api/unsplash";

blocks.forEach(async (block, index) => {
  const keyword = keywords[index % keywords.length];

  try {
    const res = await fetch(`${BASE_API_URL}?q=${keyword}`);
    const data = await res.json();

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = keyword;
    img.style.width = "360px";
    img.style.height = "240px";
    img.style.borderRadius = "10px";
    img.style.objectFit = "cover";

    block.appendChild(img);
  } catch (err) {
    console.error(`Failed to fetch image for ${keyword}:`, err);
  }
});