document.addEventListener('DOMContentLoaded', async function() {
    const gamesGrid = document.querySelector(".games-container .games-grid");
    const loadingIndicator = document.getElementById("loading-indicator");
    const errorMessage = document.getElementById("error-message");

    let gamesData;

    // Display content and hide loading indicator
    const displayAndHideLoading = () => {

            // Hide loading indicator
            loadingIndicator.classList.add("hidden");

            gamesData.forEach(game => {
                const gameItem = `
                <a href="game-specific.html?id=${game.id}">
                    <div class="game-item">
                        <img src="${game.images[0].src}" alt="${game.name}" class="game-img">
                        <div class="game-spec">
                            <h5 class="game-title">${game.name}</h5>
                            <h5 class="game-price">${game.prices.currency_symbol}${game.prices.price}</h5>
                                <button class="game-btn btn">Details</button>
                        </div>
                    </div>
                </a>`;
                gamesGrid.innerHTML += gameItem;
            });
        };

    // Show loading indicator
    loadingIndicator.classList.remove("hidden");


    // Fetch the games data from the API
    try {
        const response = await fetch("http://ibang.no/wp-json/wc/store/products");
        gamesData = await response.json();

        // Display content and hide loading indicator
        displayAndHideLoading();
    } catch (error) {
        console.error("Fetch error:", error);

        // Display error message
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "An error occurred while fetching games"

        // Hide loading indicator in case of error
        loadingIndicator.classList.add("hidden");

    }
});