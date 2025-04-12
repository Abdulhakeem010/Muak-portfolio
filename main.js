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
const years = [2025,2024,2023,2022];
const token = ""; // Replace this with your GitHub PAT

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

// Set the most recent year as active and fetch its data
const lastYearBtn = yearList.firstChild;
setActiveYearButton(lastYearBtn);
fetchAndRender(years[years.length - 1]);

