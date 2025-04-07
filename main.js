const container = document.getElementById("imageContainer");
    const keywords = ["code", "tech", "developer", "laptop", "software"];
    const numberOfImages = 10;

    for (let i = 0; i < numberOfImages; i++) {
      const keyword = keywords[i % keywords.length];
      const randomSeed = Math.floor(Math.random() * 10000); // force new images
      const imageUrl = `https://source.unsplash.com/300x200/?${keyword}&sig=${randomSeed}`;
      
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = keyword;
      container.appendChild(img);
    }