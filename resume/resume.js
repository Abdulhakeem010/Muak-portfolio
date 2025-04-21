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

const hamburger = document.querySelector(".menu-toggle");
const navBar = document.querySelector(".header-navs");
const navLinks = document.querySelectorAll(".header-navs .nav");

hamburger.onclick = function () {
  navBar.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Toggle scroll on body
  if (navBar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

// Auto-close nav when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  });
});
