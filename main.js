const blocks = document.querySelectorAll(".marquee-block");
const keywords = ["code", "tech", "developer", "laptop", "software"];

blocks.forEach((block, index) => {
  const randomSeed = Math.floor(Math.random() * 10000);
  const keyword = keywords[index % keywords.length];

  const img = document.createElement("img");
  img.src = `https://source.unsplash.com/300x200/?${keyword}&sig=${randomSeed}`;
  img.alt = keyword;
  img.style.height = "150px";
  img.style.marginRight = "10px";
  img.style.borderRadius = "10px";

  block.appendChild(img);
});