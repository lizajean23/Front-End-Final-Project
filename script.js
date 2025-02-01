// Select the container
const productsContainer = document.getElementById('productsContainer');

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        // Limit to 8 products
        return products.slice(0, 8);
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '★'.repeat(fullStars);
    if (hasHalfStar) {
        starsHTML += '½';
    }
    starsHTML += '☆'.repeat(5 - Math.ceil(rating));
    return starsHTML;
}

// Function to display products
function displayProducts(products) {
    productsContainer.innerHTML = products.map(product => {
        const originalPrice = Math.round(product.price * 1.2); 
        const discount = '-20%';
        
        return `
            <div class="product">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-content">
                    <h3>${product.title}</h3>
                    <div class="rating">
                        <div class="stars">${createStarRating(product.rating.rate)}</div>
                        <span class="rating-number">${product.rating.rate}/5</span>
                    </div>
                    <div class="price-container">
                        <span class="current-price">$${product.price}</span>
                        <span class="original-price">$${originalPrice}</span>
                        <span class="discount">${discount}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initialize
async function initialize() {
    const products = await fetchProducts();
    displayProducts(products);
}

initialize();