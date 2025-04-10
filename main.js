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

