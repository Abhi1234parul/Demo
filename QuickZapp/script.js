const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 299, image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
    { id: 2, name: 'Chicken Burger', price: 199, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 3, name: 'Caesar Salad', price: 249, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 4, name: 'Pasta Carbonara', price: 349, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=711&q=80' },
    { id: 5, name: 'Fish and Chips', price: 399, image: 'https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 6, name: 'Vegetable Stir Fry', price: 279, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80' },
];

const cart = [];

// Helper function to format price in INR
function formatPriceINR(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

function displayMenu() {
    const menuContainer = document.getElementById('menu');
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'col';
        menuItem.innerHTML = `
            <div class="card h-100">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${formatPriceINR(item.price)}</p>
                    <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(itemId) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${formatPriceINR(item.price)}</td>
            <td>${item.quantity}</td>
            <td>${formatPriceINR(item.price * item.quantity)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = formatPriceINR(total);
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your order! It will be ready soon.');
        cart.length = 0;
        updateCart();
    } else {
        alert('Your cart is empty. Please add items before checking out.');
    }
});

// Initialize the menu when the page loads
document.addEventListener('DOMContentLoaded', displayMenu);