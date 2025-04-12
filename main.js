let lastScrollTop = 0; // Track last scroll position
const header = document.getElementById("header"); // Select the header element

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY || document.documentElement.scrollTop; // Get current scroll position

  if (currentScroll > lastScrollTop) {
    // If scrolling down, hide the header
    header.classList.add("hidden");
  } else {
    // If scrolling up, show the header
    header.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Update last scroll position (prevent negative value)
});


const username = "Abdulhakeem010";
const years = [2022, 2023, 2024, 2025];
const token = ""; // Replace this

const yearList = document.getElementById("year-list");

years.forEach((year) => {
  const yearBtn = document.createElement("div");
  yearBtn.className = "year-item";
  yearBtn.textContent = year;
  yearBtn.onclick = () => fetchAndRender(year);
  yearList.appendChild(yearBtn);
});

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
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
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

    // Add month label at first occurrence
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const currentMonth = new Date(firstDay.date).toLocaleString('default', { month: 'short' });
      if (currentMonth !== previousMonth) {
        const monthLabel = document.createElement("div");
        monthLabel.className = "month-label";
        monthLabel.textContent = currentMonth;
        monthLabels.appendChild(monthLabel);
        previousMonth = currentMonth;
      } else {
        const emptyLabel = document.createElement("div");
        emptyLabel.className = "month-label";
        monthLabels.appendChild(emptyLabel);
      }
    }
  });
}

// Load the most recent year by default
fetchAndRender(years[years.length - 1]);
