// Extract the game ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");
// API endpoint including the game ID
const apiEndpoint = `http://game-hub-cms.local/wp-json/wc/store/products/${gameId}`;
// Show loading indicator
const loadingIndicator = document.getElementById("loading-indicator");
loadingIndicator.classList.remove("hidden");
// Error message
const errorMessage = document.getElementById("error-message");

// Fetch the specific game details
async function getGameDetails () {
    try {
        const response = await fetch(apiEndpoint);
        const game = await response.json();
        loadingIndicator.classList.add("hidden");

        // Create HTML
        const gameDetails = `
        <div class="left-col">
            <img src="${game.images[0].src}" alt="${game.name}" class="game-img">
        </div>
        <div class="right-col">
            <div class="info-wrap">
                <h1 class="spec-game-title">${game.name}</h1>
                <span class="spec-platform">Genre: ${game.categories[0].name}</span>
                <span class="price">${game.prices.currency_symbol}${game.prices.price}</span>
            </div>
            <div class="buy-btn-wrap">
                <button id="addToCartBtn" class="buy-btn btn">Add to Cart</button>
            </div>
            <div class="game-desc">
            <p class="game-description">${game.description}</p>
            </div>
        </div>`;

        // Add the HTML to the container
        const gameContainer = document.querySelector(".game-container");
        gameContainer.innerHTML += gameDetails;

        document.getElementById("addToCartBtn").addEventListener("click", function() {
            addToCart(game);
        });
    } catch (error) {
        console.error("Fetch error:", error);
        // Hide loading indicator if there was an error
        loadingIndicator.classList.add("hidden");

        // Display error message
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "An error occurred while fetching games"
    }
}

// display a message when the user has added a new item to cart
function showFlashMessage() {
    const flash = document.getElementById("flash");
    flash.classList.remove("hidden");
    setTimeout(() => {
        flash.classList.add("hidden");
    }, 3000);
}

// Call the function to get the game details
getGameDetails();