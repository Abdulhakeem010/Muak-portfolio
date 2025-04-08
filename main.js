const blocks = document.querySelectorAll(".marquee-block");
const keywords = ["code", "tech", "developer", "laptop", "software"];

blocks.forEach(async (block, index) => {
  const keyword = keywords[index % keywords.length];

  try {
    const res = await fetch(`/api/unsplash?q=${keyword}`);
    const data = await res.json();

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = keyword;
    img.style.height = "240px";
    img.style.borderRadius = "10px";
    img.style.objectFit = "cover";

    block.appendChild(img);
  } catch (err) {
    console.error(`Failed to fetch image for ${keyword}:`, err);
  }
});