let lastScrollTop = 0; 
const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY || document.documentElement.scrollTop; 

  if (currentScroll > lastScrollTop) {
  
    header.classList.add("hidden");
  } else {
  
    header.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


const menuToggle = document.getElementById("menu-toggle");
const navs = document.querySelector(".header-navs");
const navLinks = document.querySelectorAll(".nav");

// Toggle menu icon and nav
menuToggle.addEventListener("click", () => {
  navs.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Auto-close nav when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navs.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});


const track = document.querySelector(".carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carousel = document.querySelector(".carousel");
const images = track.querySelectorAll("img");

let index = 0;
let maxIndex = 0;
let imageWidth = 0;

// Get the current image width + gap
function getImageWidth() {
  const image = track.querySelector("img");
  if (!image) return 0;
  const style = getComputedStyle(track);
  const gap = parseInt(style.columnGap || style.gap || 10);
  return image.getBoundingClientRect().width + gap;
}

// Recalculate image width and max scroll index
function calculateMaxIndex() {
  imageWidth = getImageWidth();
  const totalScrollableWidth = track.scrollWidth - carousel.offsetWidth;

  maxIndex = Math.ceil(totalScrollableWidth / imageWidth); // << KEY FIX

  // Clamp index to valid range
  if (index > maxIndex) index = maxIndex;
  if (index < 0) index = 0;

  updateTrackPosition();
}

// Move the carousel
function updateTrackPosition() {
  track.style.transform = `translateX(-${index * imageWidth}px)`;
  
}

// Button click events
prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateTrackPosition();
  }
});

nextBtn.addEventListener("click", () => {
  if (index < maxIndex) {
    index++;
    updateTrackPosition();
  }
});

// Recalculate on load and resize
window.addEventListener("load", calculateMaxIndex);
window.addEventListener("resize", calculateMaxIndex);