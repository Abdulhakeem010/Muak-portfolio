document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".marquee-block");
  const keywords = ["tech", "code", "software", "laptop", "developer"];

  blocks.forEach((block, index) => {
    const keyword = keywords[index % keywords.length];
    const randomSeed = Math.floor(Math.random() * 10000);
    const imageUrl = `https://source.unsplash.com/360x240/?${keyword}&sig=${randomSeed}`;

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = keyword;

    block.appendChild(img);
  });
});