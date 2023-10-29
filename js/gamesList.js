// document.addEventListener('DOMContentLoaded', async function() {
//     const gamesGrid = document.querySelector(".games-container .games-grid");
//     const loadingIndicator = document.getElementById("loading-indicator");
//     const errorMessage = document.getElementById("error-message");
//     const sortSelect = document.getElementById("sort-select");
//     const filterSelect = document.getElementById("filter-select");

//     let gamesData;

//     // Display content and hide loading indicator
//     const displayAndHideLoading = () => {

//             // Hide loading indicator
//             loadingIndicator.classList.add("hidden");
 
//             gamesData.forEach(game => {
//                 const gameItem = `
//                 <a href="game-specific.html?id=${game.id}">
//                     <div class="game-item">
//                         <img src="${game.images[0].src}" alt="${game.name}" class="game-img">
//                         <div class="game-spec">
//                             <h5 class="game-title">${game.name}</h5>
//                             <h5 class="game-price">${game.prices.currency_symbol}${game.prices.price}</h5>
//                                 <button class="game-btn btn">Details</button>
//                         </div>
//                     </div>
//                 </a>`;
//                 gamesGrid.innerHTML += gameItem;
//             });
//         };

//     // Show loading indicator
//     loadingIndicator.classList.remove("hidden");


//     // Fetch the games data from the API
//     try {
//         const response = await fetch("https://ibang.no/wp-json/wc/store/products");
//         gamesData = await response.json();

    //     // Display content and hide loading indicator
    //     displayAndHideLoading();
    // } catch (error) {
    //     console.error("Fetch error:", error);

    //     // Display error message
    //     errorMessage.classList.remove("hidden");
    //     errorMessage.textContent = "An error occurred while fetching games"

    //     // Hide loading indicator in case of error
    //     loadingIndicator.classList.add("hidden");

//     }
// });

document.addEventListener('DOMContentLoaded', async function() {
    const gamesGrid = document.querySelector(".games-container .games-grid");
    const loadingIndicator = document.getElementById("loading-indicator");
    const errorMessage = document.getElementById("error-message");
    const sortSelect = document.getElementById("sort-select");
    const filterSelect = document.getElementById("filter-select");

    let gamesData;

    const displayAndHideLoading = () => {
        // Clear previous games
        gamesGrid.innerHTML = '';

        let sortedAndFilteredGames = [...gamesData];

        // Sorting
        const sortBy = sortSelect.value;
        if (sortBy === 'price-asc') {
          sortedAndFilteredGames.sort((a, b) => parseFloat(a.prices.price) - parseFloat(b.prices.price));
        } else if (sortBy === 'price-desc') {
          sortedAndFilteredGames.sort((a, b) => parseFloat(b.prices.price) - parseFloat(a.prices.price));
        }

        // Filtering
        const filterBy = filterSelect.value;
        if (filterBy === 'featured') {
            sortedAndFilteredGames = sortedAndFilteredGames.filter(game => game.featured);
        } else if (filterBy !== '') {
            sortedAndFilteredGames = sortedAndFilteredGames.filter(game => game.categories.some(category => category.name === filterBy));
        };

        // Hide loading indicator
        loadingIndicator.classList.add("hidden");

        // Display games
        sortedAndFilteredGames.forEach(game => {
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

    // Fetch the games data from the API
    try {
        const response = await fetch("https://ibang.no/wp-json/wc/store/products");
        gamesData = await response.json();

        // Initial display
        displayAndHideLoading();

        const categorySet = new Set();
        gamesData.forEach(game => {
            game.categories.forEach(category => categorySet.add(category.name));
        });

        const filterSelect = document.getElementById("filter-select");
        categorySet.forEach(category => {
            const option = document.createElement("option");
            option.text = category;
            option.value = category;
            filterSelect.add(option);
        });

        // Event listeners for sort and filter
        sortSelect.addEventListener('change', () => {
            displayAndHideLoading();
        });

        filterSelect.addEventListener('change', () => {
            displayAndHideLoading();
        })

        // Display content and hide loading indicator
        displayAndHideLoading();
    } catch (error) {
        console.error("Fetch error:", error);

        // Display error message
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "An error occurred while fetching games"

        // Hide loading indicator in case of error
        loadingIndicator.classList.add("hidden");
}});