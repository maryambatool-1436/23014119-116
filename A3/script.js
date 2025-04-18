const menuToggle = document.getElementById("menu-toggle");
const productsPageGrid = document.querySelector(".products.grid");
const recommendedGrid = document.querySelector(".recommended.grid");
const cartGrid = document.querySelector(".cart");

// Mobile menu functionality
function toggleMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const hamburgerSpans = document.querySelectorAll("#menu-toggle span");
    toggleMenu.isMenuOpen = toggleMenu.isMenuOpen || false;
    toggleMenu.isMenuOpen = !toggleMenu.isMenuOpen;
    const isMenuOpen = toggleMenu.isMenuOpen;

    if (mobileMenu) {
        mobileMenu.style.transform = isMenuOpen
            ? "translateY(0)"
            : "translateY(-100%)";
    }
    if (hamburgerSpans.length === 3) {
        if (isMenuOpen) {
            hamburgerSpans[0].style.transform =
                "rotate(45deg) translate(5px, 5px)";
            hamburgerSpans[1].style.opacity = "0";
            hamburgerSpans[2].style.transform =
                "rotate(-45deg) translate(3px, -3px)";
        } else {
            hamburgerSpans[0].style.transform = "none";
            hamburgerSpans[1].style.opacity = "1";
            hamburgerSpans[2].style.transform = "none";
        }
    }
    const menuToggleBtn = document.getElementById("menu-toggle");
    if (menuToggleBtn) {
        menuToggleBtn.setAttribute("aria-expanded", isMenuOpen);
    }
}

function setupThemeToggles() {
    const themeToggle = document.getElementById("theme-toggle");
    const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
    const menuToggle = document.getElementById("menu-toggle");

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener("click", toggleTheme);
    }
}

// Function to toggle between light and dark themes
function toggleTheme() {
    // Check if the HTML element has the 'dark' class
    if (document.documentElement.classList.contains("dark")) {
        // If it does, switch to light theme
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        // If it doesn't, switch to dark theme
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}

// Function to initialize theme based on local storage or system preference
function initTheme() {
    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
    } else {
        // If no saved preference, check system preference
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            document.documentElement.classList.add("dark");
        }
    }

    // Listen for changes in system preference
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            // Only apply system preference if user hasn't set a preference
            if (!localStorage.getItem("theme")) {
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        });
}

// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Notebook",
        description: "High-quality paper, hardcover, perfect for journaling.",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Notebooks"],
    },
    {
        id: 2,
        name: "Fountain Pen Set",
        description: "Elegant design with smooth writing experience.",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Pens & Pencils"],
    },
    {
        id: 3,
        name: "Desk Organizer",
        description: "Keep your workspace tidy with our wooden organizer.",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Desk Accessories"],
    },
    {
        id: 4,
        name: "Colored Pencil Set",
        description: "24 vibrant colors for artists and designers.",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1531592937781-344ad608fabf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Pens & Pencils"],
    },
    {
        id: 5,
        name: "Weekly Planner",
        description: "Stay organized with our premium weekly planner.",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1676042344266-78843a25bd0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Planners"],
    },
    {
        id: 6,
        name: "Sticky Notes Set",
        description: "Colorful sticky notes for reminders and notes.",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1554103210-26d928978fb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Desk Accessories"],
    },
    {
        id: 7,
        name: "Leather Journal",
        description: "Handcrafted leather journal with premium paper.",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1519327232521-1ea2c736d34d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Notebooks"],
    },
    {
        id: 8,
        name: "Desk Lamp",
        description:
            "Adjustable LED desk lamp with multiple brightness levels.",
        price: "$45.99",
        image: "https://images.unsplash.com/photo-1568205612837-017257d2310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Desk Accessories"],
    },
];

// --- CART FUNCTIONALITY ---

function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    setCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== productId);
    setCart(cart);
}

function renderCart(cartGrid) {
    if (!cartGrid) return;
    const cart = getCart();
    cartGrid.innerHTML = "";
    if (cart.length === 0) {
        cartGrid.innerHTML =
            '<div class="col-span-full text-center text-gray-500">Your cart is empty.</div>';
        return;
    }
    cart.forEach((item) => {
        const card = document.createElement("div");
        card.className = "flex flex-col md:flex-row items-start py-6";
        card.innerHTML = `
            <div class="md:w-1/4 mb-4 md:mb-0">
                <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-lg"/>
            </div>
            <div class="md:w-3/4 md:pl-6">
                <div class="flex flex-col md:flex-row md:justify-between">
                    <div>
                        <h3 class="text-lg font-bold mb-1">${item.name}</h3>
                        <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            ${item.description}
                        </p>
                        <p class="text-sm text-gray-500 dark:text-gray-500 mb-4">SKU: ${item.sku}</p>
                    </div>
                    <div class="text-lg font-bold">${item.price}</div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <label for="quantity3" class="mr-2 text-sm">Quantity:</label>
                        <select
                            id="quantity3"
                            name="quantity3"
                            class="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-2 py-1"
                        >
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <button class="remove-cart-item text-primary-light dark:text-primary-dark text-sm hover:underline" data-idx="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartGrid.appendChild(card);
    });
    // Attach remove event
    cartGrid.querySelectorAll(".remove-cart-item").forEach((btn) => {
        btn.addEventListener("click", function () {
            removeFromCart(parseInt(this.dataset.idx));
            renderCart(cartGrid);
        });
    });
}

function setupAddToCartButtons(productsGrid) {
    if (!productsGrid) return;
    productsGrid.addEventListener("click", function (e) {
        if (e.target && e.target.matches(".add-to-cart-btn")) {
            const idx = e.target.getAttribute("data-idx");
            addToCart(products.find((p) => p.id == idx));
            renderCart(cartGrid);
        }
    });
}

// --- PATCH PRODUCT RENDERING TO ADD BUTTONS ---
function renderProducts(products, productsGrid) {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className =
            "bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover" />
            <div class="p-4">
                <h3 class="text-lg font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold">${product.price}</span>
                    <button class="add-to-cart-btn bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm" data-idx="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Function to filter products by tag
function filterProductsByTag(products, tag) {
    if (tag === "All Products") {
        return products;
    }
    return products.filter((product) => product.tags.includes(tag));
}

// Function to set up category filters
function setupCategoryFilters(products) {
    const categoryLinks = document.querySelectorAll(".flex.flex-wrap.gap-2 a");

    categoryLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const tag = link.textContent.trim();
            const filteredProducts = filterProductsByTag(products, tag);
            renderProducts(filteredProducts, productsPageGrid);
        });
    });
}

// Function to handle reset form
function setupContactFormReset() {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            form.reset();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggles();
    initTheme();
    renderProducts(products, productsPageGrid);
    renderProducts(products.slice(4, 9), recommendedGrid);
    setupAddToCartButtons(productsPageGrid);
    setupAddToCartButtons(recommendedGrid);
    renderCart(cartGrid);
    setupCategoryFilters(products);
    setupContactFormReset();
});
