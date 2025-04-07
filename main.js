const apiKey = 'C06GoKb-Hb0wCQ80ULCp2RwDiUbIKQD9LwI8z23o25k'; // Replace with your Unsplash API key
const url = `https://api.unsplash.com/photos/random?query=tech&client_id=${apiKey}`;

document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".marquee-block");
  const keywords = ["tech", "code", "software", "laptop", "developer"];

  blocks.forEach((block, index) => {
    const keyword = keywords[index % keywords.length];
    fetch(`${url}&query=${keyword}`)
      .then(response => response.json())
      .then(data => {
        const img = document.createElement("img");
        img.src = data[0].urls.small; // Get the image URL from the API response
        img.alt = keyword;

        block.appendChild(img);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
});