let lastScrollTop = 0; // Track last scroll position
const header = document.getElementById('header'); // Select the header element

window.addEventListener('scroll', function() {
  let currentScroll = window.scrollY || document.documentElement.scrollTop; // Get current scroll position

  if (currentScroll > lastScrollTop) {
    // If scrolling down, hide the header
    header.classList.add('hidden');
  } else {
    // If scrolling up, show the header
    header.classList.remove('hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position (prevent negative value)
});



const years = [2025, 2024, 2023, 2022, 2021];
const username = "Abdulhakeem010"; // Change to your GitHub username

const yearList = document.getElementById("year-list");
const graphContainer = document.getElementById("contribution-graph");
const monthLabels = document.getElementById("month-labels");
const graphYear = document.getElementById("graph-year");

// Create year buttons
years.forEach((year, index) => {
  const btn = document.createElement("button");
  btn.textContent = year;
  if (index === 0) btn.classList.add("active");
  btn.addEventListener("click", () => {
    document.querySelectorAll(".year-list button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadContributionGraph(year);
  });
  yearList.appendChild(btn);
});

// Load initial year
loadContributionGraph(years[0]);

function loadContributionGraph(year) {
  graphContainer.innerHTML = "";
  monthLabels.innerHTML = "";
  graphYear.textContent = year;

  // Define URL here
  const url = `https://github-contributions-api.deno.dev/Abdulhakeem010.json?from=2025-01-01&to=2025-12-31`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("API Response:", data); // Check if the response is correct

      if (!data || !Array.isArray(data.contributions)) {
        graphContainer.innerText = "Couldn't load contributions 😢";
        return;
      }

      const seenMonths = new Set();

      data.contributions.forEach((week, weekIndex) => {
        const firstDay = week[0]; // First day of the week
        const month = new Date(firstDay.date).toLocaleString("default", { month: "short" });

        // Add month label if it's a new month
        if (!seenMonths.has(month)) {
          seenMonths.add(month);
          const monthLabel = document.createElement("div");
          monthLabel.textContent = month;
          monthLabels.appendChild(monthLabel);
        } else {
          const spacer = document.createElement("div");
          monthLabels.appendChild(spacer);
        }

        // Render each day's contribution
        week.forEach(day => {
          const cell = document.createElement("div");
          cell.className = "day";
          cell.title = `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`;
          cell.style.backgroundColor = getColor(day.count);
          graphContainer.appendChild(cell);
        });
      });
    })
    .catch(error => {
      graphContainer.innerText = "Error loading data: " + error;
    });
}

function getColor(count) {
  if (count === 0) return "#e0e0e0";  // No contributions
  if (count < 2) return "rgba(0, 255, 255, 0.2)";  // Light color
  if (count < 4) return "rgba(0, 255, 255, 0.4)";  // Light-medium color
  if (count < 6) return "rgba(0, 255, 255, 0.6)";  // Medium color
  return "rgba(0, 255, 255, 0.85)";  // High contribution color
}