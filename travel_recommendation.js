function handleSearch() {
  const input = document.getElementById("searchInput").value.trim();
  if (input) {
    alert("Searching for: " + input);
    // Add real search logic here
  } else {
    alert("Please enter a destination or keyword.");
  }
}

function handleReset() {
  document.getElementById("searchInput").value = "";
}


