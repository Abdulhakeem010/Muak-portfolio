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
const items = track.querySelectorAll(".carousel-item");

let index = 0;
let maxIndex = items.length;
let imageWidth = 0;

function getItemWidth() {
  const item = track.querySelector(".carousel-item");
  if (!item) return 0;
  const style = getComputedStyle(track);
  const gap = parseInt(style.columnGap || style.gap || 10);
  return item.getBoundingClientRect().width + gap;
}

function updateBtns() {
  prevBtn.style.display = index ? "flex" : "none";
  nextBtn.style.display = index < maxIndex ? "flex" : "none";
}

function calculateMaxIndex() {
  imageWidth = getItemWidth();
  const totalScrollableWidth = track.scrollWidth - carousel.offsetWidth;
  maxIndex = Math.ceil(totalScrollableWidth / imageWidth);

  if (index > maxIndex) index = maxIndex;
  if (index < 0) index = 0;

  updateTrackPosition();
}

function updateTrackPosition() {
  track.style.transform = `translateX(-${index * imageWidth}px)`;
}

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateTrackPosition();
    updateBtns();
  }
});

nextBtn.addEventListener("click", () => {
  if (index < maxIndex) {
    index++; // index = index + 1
    updateTrackPosition();
    updateBtns();
  }
});

window.addEventListener("load", calculateMaxIndex);
window.addEventListener("resize", calculateMaxIndex);

updateBtns();
