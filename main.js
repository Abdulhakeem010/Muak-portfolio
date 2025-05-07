
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

const username = "Abdulhakeem010";
const years = [2025];
const token = "";

const yearList = document.getElementById("year-list");
let activeYearButton = null;

years.forEach((year) => {
  const yearBtn = document.createElement("div");
  yearBtn.className = "year-item";
  yearBtn.textContent = year;
  yearBtn.onclick = () => {
    setActiveYearButton(yearBtn);
    fetchAndRender(year);
  };
  yearList.appendChild(yearBtn);
});

function setActiveYearButton(button) {
  if (activeYearButton) {
    activeYearButton.classList.remove("active");
  }
  button.classList.add("active");
  activeYearButton = button;
}

async function fetchAndRender(year) {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
  const total = json.data.user.contributionsCollection.contributionCalendar.totalContributions;

  document.getElementById("total-contributions").textContent = `Total Contributions in ${year}: ${total}`;
  renderGraph(weeks);
}

function renderGraph(weeks) {
  const graphContainer = document.getElementById("contribution-graph");
  const monthLabels = document.getElementById("month-labels");

  graphContainer.innerHTML = "";
  monthLabels.innerHTML = "";

  let previousMonth = "";

  weeks.forEach((week, weekIndex) => {
    const weekColumn = document.createElement("div");
    weekColumn.className = "week-column";

    week.contributionDays.forEach((day) => {
      const dayBlock = document.createElement("div");
      dayBlock.className = "day-block";
      dayBlock.style.backgroundColor = day.color;
      dayBlock.title = `${day.date}: ${day.contributionCount} contributions`;
      weekColumn.appendChild(dayBlock);
    });

    graphContainer.appendChild(weekColumn);

    // Add month label at the top only when the month changes
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const currentMonth = new Date(firstDay.date).toLocaleString("default", { month: "short" });
      if (currentMonth !== previousMonth) {
        const label = document.createElement("div");
        label.className = "month-label";
        label.textContent = currentMonth;
        monthLabels.appendChild(label);
        previousMonth = currentMonth;
      } else {
        const label = document.createElement("div");
        label.className = "month-label empty";
        monthLabels.appendChild(label);
      }
    }
  });
}

const lastYearBtn = yearList.lastChild;
setActiveYearButton(lastYearBtn);
fetchAndRender(years[years.length - 1]);

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




window.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animation
  gsap.from(".hero-section h1", {
    duration: 1,
    y: 80,
    ease: "power2.out"
  });

  gsap.from(".hero-section p", {
    duration: 1,
    y: 80,
    delay: 0.3,
    ease: "power2.out"
  });
  gsap.from(".hero-socials", {
    duration: 1,
    y: 80,
    delay: 0.6,
    ease: "power2.out"
  });


 // Scroll animations (no fade)
  gsap.from(".cg", {
    scrollTrigger: ".cg",
    duration: 1,
    y: 100,
    ease: "power2.out"
  });

  gsap.from(".marquee-container", {
    scrollTrigger: ".marquee-container",
    duration: 1,
    y: 100,
    ease: "power2.out"
  });

  gsap.from(".selected-project", {
    scrollTrigger: ".selected-project",
    y: 100,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".first-project", {
    scrollTrigger: ".first-project",
    y: 100,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from("footer", {
    scrollTrigger: "footer",
    y: 100,
    duration: 1,
    ease: "power2.out"
  });

});