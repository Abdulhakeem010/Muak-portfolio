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


// const username = "Abdulhakeem010";
// const graphContainer = document.getElementById("contribution-graph");

// // Custom color levels
// const colorLevels = [
//   "#eeeeee", // 0 contributions
//   "#94a3b8",
//   "#64748b",
//   "#475569",
//   "#334155"  // max contributions
// ];

// function getColor(count) {
//   if (count === 0) return colorLevels[0];
//   if (count < 5) return colorLevels[1];
//   if (count < 10) return colorLevels[2];
//   if (count < 20) return colorLevels[3];
//   return colorLevels[4];
// }

// fetch(`https://github-contributions-api.deno.dev/Abdulhakeem010.json`)
//   .then(res => res.json())
//   .then(data => {
//     console.log("API Response:", data);

//     if (!data || !data.contributions) {
//       console.error("No contributions found or unexpected data format");
//       return;
//     }

//     data.contributions.forEach(week => {
//       week.days.forEach(day => {
//         const cell = document.createElement("div");
//         cell.className = "day";
//         cell.title = `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`;
//         cell.style.backgroundColor = getColor(day.count);
//         graphContainer.appendChild(cell);
//       });
//     });
//   })
//   .catch(err => console.error("Error loading contribution data:", err));


// const graphContainer = document.getElementById("contribution-graph");

// fetch("https://github-contributions-api.deno.dev/Abdulhakeem010.json")
//   .then(res => res.json())
//   .then(data => {
//     console.log("API Response:", data); // keep this for debugging

//     if (!data || !Array.isArray(data.contributions)) {
//       graphContainer.innerText = "Couldn't load contributions 😢";
//       return;
//     }

//     data.contributions.forEach(week => {
//       week.forEach(day => {
//         const cell = document.createElement("div");
//         cell.className = "day";
//         cell.title = `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`;
//         cell.style.backgroundColor = getColor(day.count);
//         graphContainer.appendChild(cell);
//       });
//     });
//   })
//   .catch(err => console.error("Error loading contribution data:", err));

// function getColor(count) {
//   // Customize this to match your portfolio's color theme
//   if (count === 0) return "#e4e4e4"; // light gray
//   if (count < 2) return "rgba(0, 255, 255, 0.2)";
//   if (count < 4) return "rgba(0, 255, 255, 0.4)";
//   if (count < 6) return "rgba(0, 255, 255, 0.6)";
//   return "rgba(0, 255, 255, 0.8)";
// }

const graphContainer = document.getElementById("contribution-graph");
const monthLabels = document.getElementById("month-labels");

fetch("https://github-contributions-api.deno.dev/Abdulhakeem010.json")
  .then(res => res.json())
  .then(data => {
    if (!data || !Array.isArray(data.contributions)) {
      graphContainer.innerText = "Couldn't load contributions 😢";
      return;
    }

    const seenMonths = new Set();

    data.contributions.forEach((week, weekIndex) => {
      // Add month label at the top of each new month
      const firstDayOfWeek = week[0];
      const month = new Date(firstDayOfWeek.date).toLocaleString("default", {
        month: "short",
      });

      if (!seenMonths.has(month)) {
        const monthLabel = document.createElement("div");
        monthLabel.textContent = month;
        seenMonths.add(month);
        monthLabels.appendChild(monthLabel);
      } else {
        // Add empty placeholder for spacing
        const spacer = document.createElement("div");
        monthLabels.appendChild(spacer);
      }

      week.forEach(day => {
        const cell = document.createElement("div");
        cell.className = "day";
        cell.title = `${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`;
        cell.style.backgroundColor = day.color || getColor(day.count);
        graphContainer.appendChild(cell);
      });
    });
  });

function getColor(count) {
  if (count === 0) return "#e0e0e0";
  if (count < 2) return "rgba(0, 255, 255, 0.2)";
  if (count < 4) return "rgba(0, 255, 255, 0.4)";
  if (count < 6) return "rgba(0, 255, 255, 0.6)";
  return "rgba(0, 255, 255, 0.85)";
}