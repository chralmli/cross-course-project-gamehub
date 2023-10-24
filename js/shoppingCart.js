document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.querySelector(".cart-container .cart-content-container");
    const checkoutForm = document.getElementById("checkout-form");

    // Saving the cart quantity in local storage
    localStorage.setItem("cartCount", cart.length);

    function updatePrices() {
        const subtotal = cart.reduce((acc, item) => acc + item.prices.price * item.count, 0);
        const shipping = 9.99;
        const total = subtotal + shipping;

        document.querySelector(".price-info:nth-child(1) span:last-child").innerText = `$${subtotal.toFixed(2)}`;
        document.querySelector(".price-info:nth-child(2) span:last-child").innerText = `$${shipping.toFixed(2)}`;
        document.querySelector(".price-info:nth-child(3) span:last-child").innerText = `$${total.toFixed(2)}`;
        document.querySelector(".check-btn-container .pay-btn span:first-child").innerText = `$${total.toFixed(2)}`;
    }

    function modifyCart(id, action) {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (action === "increment") {
                item.count++;
            } else if (action === "decrement") {
                item.count--;
                if (item.count === 0) {
                    cart = cart.filter(item => item.id !== id);
                }
            } else if (action === "remove") {
                cart = cart.filter(item => item.id !== id);
            }
            saveCart();
            renderCartItems();
            updatePrices();
        } 
    }

    // Render cart items
    function renderCartItems() {

        // Retrieve cart items from local storage
        cart = JSON.parse(localStorage.getItem("cart") || "[]");

        let cartHTML = "";
        if (cart.length === 0) {
            cartHTML = `<p>Your cart is empty.</p><a class="back-to-shop" href="games.html">Go back to Shop</a>`;
            document.getElementById("clear-cart-button").style.display = "none";
        } else {
            cart.forEach(item => {
                const cartItemHTML = createCartItemHTML(item);
                cartHTML += cartItemHTML;
            });
        }

        cartContainer.innerHTML = cartHTML;
        updateCartCount();
    }

    function clearCart() {
        cart = [];
        saveCart();
        renderCartItems();
        updatePrices();
        updateCartCount();
    }

    function createCartItemHTML(item) {
        const cartItemHTML = `
        <div class="cart-items">
            <div class="img-box">
                <img src="${item.images[0].src}" alt="${item.name}" height="65px">
            </div>
            <div class="desc">
                <h1 class="title">${item.name}</h1>
                <h3 class="platform">${item.categories[0].name}</h3>
            </div>
            <div class="counter">
                <i class="fa-solid fa-plus" data-item-id="${item.id}"></i>
                <div class="count">${item.count}</div>
                <i class="fa-solid fa-minus" data-item-id="${item.id}"></i>
            </div>
            <div class="prices">
                <div class="amount">${item.prices.currency_symbol}${item.prices.price}</div>
            </div>
            <div class="remove">
                <i class="fa-solid fa-trash" data-item-id="${item.id}"></i>
            </div>
        </div>
        `;

        return cartItemHTML;
    }



    renderCartItems();
    updatePrices();

    // Add event listeners to dynamically created elements
    cartContainer.addEventListener("click", function(e) {
        const itemId = e.target.getAttribute("data-item-id");
        if (e.target.classList.contains("fa-trash")) {
            modifyCart(itemId, "remove");
        } else if (e.target.classList.contains("fa-plus")) {
            modifyCart(itemId, "increment");
        } else if (e.target.classList.contains("fa-minus")) {
            modifyCart(itemId, "decrement");
        }
        updateCartCount();
    });

    checkoutForm.addEventListener("submit", function(e) {
        e.preventDefault();
    });

    document.getElementById("checkBtn").addEventListener("click", function() {
        window.location.href = "checkout.html";
    });

    document.getElementById("clear-cart-button").addEventListener("click", function() {
        clearCart();
    })
});