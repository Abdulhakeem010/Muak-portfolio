const keywords = ["code", "tech", "developer", "laptop", "software"];
const numberOfImages = 5;

for (let i = 1; i <= numberOfImages; i++) {
  const container = document.getElementById(`imageContainer${i}`);
  const randomSeed = Math.floor(Math.random() * 10000);
  const keyword = keywords[i % keywords.length];

  const img = document.createElement("img");
  img.src = `https://source.unsplash.com/300x200/?${keyword}&sig=${randomSeed}`;
  img.alt = keyword;
  img.style.height = "150px";
  img.style.marginRight = "10px";
  img.style.borderRadius = "10px";

  container.appendChild(img);
}