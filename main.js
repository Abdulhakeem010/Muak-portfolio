const marquee = document.getElementById("imageMarquee");
const keywords = ["tech", "code", "developer", "laptop", "software"];
const totalImages = 50;

async function loadImages() {
  for (let i = 0; i < totalImages; i++) {
    const keyword = keywords[i % keywords.length];
    try {
      const response = await fetch(`/api/unsplash?q=${keyword}`);
      const data = await response.json();

      const imageBlock = document.createElement("div");
      imageBlock.className = "image-block";

      const img = document.createElement("img");
      img.src = data.image;
      img.alt = keyword;

      imageBlock.appendChild(img);
      marquee.appendChild(imageBlock);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }

  // Duplicate for infinite loop
  marquee.innerHTML += marquee.innerHTML;
}

loadImages();