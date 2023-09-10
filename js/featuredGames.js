document.addEventListener('DOMContentLoaded', async function() {
    const gamesGrid = document.querySelector(".games-container .games-grid");
    const errorMessage = document.getElementById("error-message");

    // Show loading indicator
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.classList.remove("hidden");
    
    // Fetch the games data from the API
    try {
        const response = await fetch("https://api.noroff.dev/api/v1/gamehub");
        const games = await response.json();

        const fourGames = games.slice(0, 4);

        loadingIndicator.classList.add("hidden");

        fourGames.forEach(game => {
            const gameItem = `
            <a href="game-specific.html?id=${game.id}">
                <div class="game-item">
                    <img src="${game.image}" alt="${game.title}" class="game-img">
                    <div class="game-spec">
                        <h5 class="game-title">${game.title}</h5>
                        <h5 class="game-price">$${game.price}</h5>
                        <button class="game-btn btn">Details</button>
                    </div>
                </div>
            </a>`;
            gamesGrid.innerHTML += gameItem;
        });
    } catch (error) {
        console.error("Fetch error:", error);

        // Display error message
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "An error occurred while fetching games";

        // Hide loading indicator in case of error
        loadingIndicator.classList.add("hidden");
    }
});


