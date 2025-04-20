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

// const track = document.querySelector(".carousel-track");
// const prevBtn = document.getElementById("prevBtn");
// const nextBtn = document.getElementById("nextBtn");
// const carousel = document.querySelector(".carousel");
// const images = track.querySelectorAll("img");

// const imageWidth = images[0].offsetWidth + 20; // 20px is the gap
// let index = 0;

// // Update max index on window resize
// let maxIndex = 0;

// function calculateMaxIndex() {
//   const visibleCount = Math.floor(carousel.offsetWidth / imageWidth);
//   maxIndex = images.length - visibleCount;
//   if (index > maxIndex) index = maxIndex;
//   updateTrackPosition();
// }

// function updateTrackPosition() {
//   track.style.transform = `translateX(-${index * imageWidth}px)`;
// }

// prevBtn.addEventListener("click", () => {
//   if (index > 0) {
//     index--;
//     updateTrackPosition();
//   }
// });

// nextBtn.addEventListener("click", () => {
//   if (index < maxIndex) {
//     index++;
//     updateTrackPosition();
//   }
// });

// // Recalculate on load and on resize
// window.addEventListener("load", calculateMaxIndex);
// window.addEventListener("resize", calculateMaxIndex);

const track = document.querySelector(".carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const carousel = document.querySelector(".carousel");
const images = track.querySelectorAll("img");

let imageWidth = images[0].offsetWidth + 20;
let index = 0;
let maxIndex = 0;

function calculateMaxIndex() {
  imageWidth = images[0].offsetWidth + 20;
  const visibleCount = Math.floor(carousel.offsetWidth / imageWidth);
  maxIndex = images.length - visibleCount;
  if (index > maxIndex) index = maxIndex;
  updateTrackPosition();
}

function updateButtons() {
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= maxIndex;
}

function updateTrackPosition() {
  track.style.transform = `translateX(-${index * imageWidth}px)`;
  updateButtons();
}

// Click events
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

// Touch swipe support
let startX = 0;
let currentX = 0;
let isSwiping = false;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

carousel.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;
  currentX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  const diff = startX - currentX;
  if (Math.abs(diff) > 50) {
    if (diff > 0 && index < maxIndex) {
      index++;
    } else if (diff < 0 && index > 0) {
      index--;
    }
    updateTrackPosition();
  }
  isSwiping = false;
});

// Init
window.addEventListener("load", calculateMaxIndex);
window.addEventListener("resize", calculateMaxIndex);