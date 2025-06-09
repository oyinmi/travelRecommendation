// document.addEventListener("DOMContentLoaded", () => {
//     fetch("travel_recommendation_api.json")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Network response was not OK");
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log("Fetched data:", data); // For debugging
//         displayRecommendations(data);
//       })
//       .catch(error => {
//         console.error("Error fetching the data:", error);
//       });
// });
  


document.addEventListener("DOMContentLoaded", () => {
    let travelData;
  
    // Fetch travel data once when the page loads
    fetch("travel_recommendation_api.json")
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch travel data");
        return response.json();
      })
      .then(data => {
        travelData = data;
        console.log("Travel data loaded successfully");
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  
    // Add event listener to the Search button
    document.getElementById("searchBtn").addEventListener("click", () => {
      const input = document.getElementById("searchInput").value.trim().toLowerCase();
      const container = document.getElementById("recommendations");
      container.innerHTML = ""; // Clear previous results
  
      if (!input) {
        container.innerHTML = "<p>Please enter a search term.</p>";
        return;
      }
  
      if (!travelData) {
        container.innerHTML = "<p>Data not yet loaded. Please try again shortly.</p>";
        return;
      }
  
      let results = [];
  
      // Check for beaches
      if (input === "beach" || input === "beaches") {
        results = travelData.beaches;
      }
  
      // Check for temples
      else if (input === "temple" || input === "temples") {
        results = travelData.temples;
      }
  
      // Check for matching country name
      else {
        travelData.countries.forEach(country => {
          if (country.name.toLowerCase().includes(input)) {
            results.push(...country.cities);
          }
        });
      }
  
      // Show at least 2 results or display a message
      if (results.length >= 2) {
        results.slice(0, 4).forEach(item => {
          container.appendChild(createCard(item.name, "images/" + item.imageUrl, item.description));
        });
      } else {
        container.innerHTML = "<p>No or insufficient results found. Try another keyword.</p>";
      }
    });
  });
  
  // Function to create a result card
  function createCard(title, imageUrl, description) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.border = "1px solid #ccc";
    card.style.padding = "16px";
    card.style.margin = "12px";
    card.style.borderRadius = "8px";
    card.style.width = "300px";
    card.style.backgroundColor = "#f9f9f9";
    card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
    card.style.textAlign = "center";
  
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;
    img.style.width = "100%";
    img.style.height = "180px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "4px";
  
    const name = document.createElement("h3");
    name.textContent = title;
  
    const desc = document.createElement("p");
    desc.textContent = description;
  
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(desc);
  
    return card;
  }
  

// to clear search box
function resetSearchInput() {
  document.getElementById("searchInput").value = "";
}


