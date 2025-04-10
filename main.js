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



const username = "YOUR_USERNAME_HERE"; // Replace with your GitHub username
const years = [2022, 2023, 2024, 2025];

const yearList = document.getElementById("year-list");

years.forEach((year) => {
  const yearBtn = document.createElement("div");
  yearBtn.className = "year-item";
  yearBtn.textContent = year;
  yearBtn.onclick = () => fetchAndRender(year);
  yearList.appendChild(yearBtn);
});

function fetchAndRender(year) {
  const url = `https://github-contributions-api.deno.dev/${username}.json?year=${year}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("API Response: ", data);
      document.getElementById("total-contributions").textContent =
        `Total Contributions in ${year}: ${data.totalContributions || 0}`;
      renderGraph(data.contributions);
    })
    .catch((err) => {
      console.error("Failed to fetch data:", err);
    });
}

function renderGraph(contributions) {
  const graphContainer = document.getElementById("contribution-graph");
  graphContainer.innerHTML = "";

  contributions.forEach((week) => {
    const weekColumn = document.createElement("div");
    weekColumn.classList.add("week-column");

    week.forEach((day) => {
      const dayBlock = document.createElement("div");
      dayBlock.classList.add("day-block");

      const count = day.count || 0;
      dayBlock.style.backgroundColor = getColorForCount(count);
      dayBlock.title = `${day.date}: ${count} contributions`;

      weekColumn.appendChild(dayBlock);
    });

    graphContainer.appendChild(weekColumn);
  });
}

function getColorForCount(count) {
  if (count === 0) return "#ebedf0";
  if (count < 5) return "#9be9a8";
  if (count < 10) return "#40c463";
  if (count < 20) return "#30a14e";
  return "#216e39";
}

// Load most recent year on startup
fetchAndRender(years[years.length - 1]);