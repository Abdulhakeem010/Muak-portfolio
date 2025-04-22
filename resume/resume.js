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

  document.body.classList.toggle('no-scroll', navBar.classList.contains('active'));
};

const ANIMATION_DURATION = 600;

// Auto-close nav when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetHref = link.getAttribute("href");

    navBar.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";

    // manual navigation atp
    setTimeout(() => {
      window.location.href = targetHref;
    }, ANIMATION_DURATION);
  });
});