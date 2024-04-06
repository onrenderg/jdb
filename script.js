// Get DOM elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Fetch the JSON data from data.json
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const notes = data;

        // Create a new Fuse instance
        const fuse = new Fuse(notes, {
            keys: ["title", "content", "tags"]
        });

        // Add event listener to the search input
        searchInput.addEventListener("input", handleSearch);

        // Function to handle search input
        function handleSearch() {
            const searchTerm = searchInput.value;
            if (searchTerm) {
                const result = fuse.search(searchTerm);
                displaySearchResults(result);
            } else {
                searchResults.innerHTML = "";
            }
        }

        // Function to display search results
        function displaySearchResults(results) {
            searchResults.innerHTML = "";

            if (results.length === 0) {
                searchResults.innerHTML = "<p>No results found.</p>";
                return;
            }

            results.forEach((result) => {
                const note = result.item;
                const noteElement = document.createElement("div");
                noteElement.innerHTML = `
          <div class="card mt-3">
            <div class="card-body">
              <h5 class="card-title">${note.title}</h5>
              <pre class="card-text"></pre> <!-- Placeholder for content -->
              <p class="card-text"><small class="text-muted">${note.date}</small></p>
            </div>
          </div>
        `;

                // Set content using innerText to preserve line breaks and formatting
                const preElement = noteElement.querySelector(".card-text");
                preElement.innerText = note.content;

                searchResults.appendChild(noteElement);
            });
        }
    })
    .catch(error => {
        console.error("Error fetching JSON data:", error);
    });