document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".marquee-block");
  const keywords = ["tech", "code", "developer", "laptop", "software"];
  const accessKey = "C06GoKb-Hb0wCQ80ULCp2RwDiUbIKQD9LwI8z23o25k"; // Replace this with your real key

  blocks.forEach((block, index) => {
    const keyword = keywords[index % keywords.length];
    const url = `https://api.unsplash.com/photos/random?query=${keyword}&orientation=landscape&client_id=${accessKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const img = document.createElement("img");
        img.src = data.urls.small;
        img.alt = keyword;
        img.style.height = "240px";
        img.style.width = "360px";
        img.style.borderRadius = "10px";
        img.style.objectFit = "cover";

        block.appendChild(img);
      })
      .catch((error) => {
        console.error("Unsplash API Error:", error);
      });
  });
});