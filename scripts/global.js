const cart = document.querySelector('.cart-wrapper');
const cartItemsContainer = document.querySelector('.cart-items-container');
const CART_ITEMS = 'cart-items';

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.closest('.cart-item-decrement')) {
        const button = e.target.closest('.cart-item-decrement');
        const quantity = button.nextElementSibling;
        const id = quantity.dataset.id;
        const sizeId = quantity.dataset.sizeId;
        const newQuantity = parseInt(quantity.value) - 1;

        if (newQuantity <= 0) return;

        quantity.value = newQuantity;
        updateItemQuantity(id, sizeId, newQuantity);
        getCartItemsTotal();
    }

    if (e.target.closest('.cart-item-increment')) {
        const button = e.target.closest('.cart-item-increment');
        const quantity = button.previousElementSibling;
        const id = quantity.dataset.id;
        const sizeId = quantity.dataset.sizeId;
        const newQuantity = parseInt(quantity.value) + 1;

        quantity.value = newQuantity;
        updateItemQuantity(id, sizeId, newQuantity);
        getCartItemsTotal();
    }

    if (e.target.closest('.remove-item')) {
        const button = e.target.closest('.remove-item');
        const id = button.dataset.id;
        const size = button.dataset.sizeId;
        removeItem(id, size);
        getCartItems();
        getItemsCount();
        getCartItemsTotal();
    }
});

cartItemsContainer.addEventListener('focusout', (e) => {
    if (e.target.closest('.item-quantity')) {
        const quantity = e.target.closest('.item-quantity');
        const id = quantity.dataset.id;
        const sizeId = quantity.dataset.sizeId;
        const newQuantity = quantity.value;

        if (newQuantity <= 0) {
            getCartItems();
            return;
        };

        updateItemQuantity(id, sizeId, newQuantity);
        getCartItemsTotal();
    }
});

document.querySelector('.nav-menu').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links-wrapper ul');
    navLinks.classList.toggle('show-nav-menu');
});

document.querySelector('.cart-icon').addEventListener('click', () => {
    cart.classList.remove('hide-cart');
    document.body.classList.toggle('no-scroll');
    cart.classList.toggle('show-cart');
    getCartItems();
    getItemsCount();
    getCartItemsTotal();
});

document.querySelector('.cart-close').addEventListener('click', () => {
    cart.classList.remove('show-cart');
    document.body.classList.remove('no-scroll');
    cart.classList.toggle('hide-cart');
    displayCartItemCount();
});

function displayCartItemCount() {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    document.querySelector('.cart-badge').innerHTML = cart.length;
}

function getItemsCount() {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    document.querySelector('.cart-item-count').innerHTML = `You currently have ${cart.length} items on your cart.`;
}

function removeItem(id, size) {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    const newCart = cart.filter(i => i.id != id || i.size != size);

    localStorage.setItem(CART_ITEMS, JSON.stringify(newCart));
}

function updateItemQuantity(id, size, newQuantity) {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS));

    cart.forEach(item => {
        if (item.id == id && item.size == size)
            item.quantity = newQuantity;
    });

    localStorage.setItem(CART_ITEMS, JSON.stringify(cart));
}

function getCartItems() {
    const cart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];

    cartItemsContainer.innerHTML = '';

    for (const merchandise of cart) {
        const cartItem = document.createElement('div');
        cartItem.setAttribute('class', 'cart-item');

        cartItem.innerHTML = `<div class="cart-item-header">
                                    <a class="remove-item" data-id="${merchandise.id}" data-size-id="${merchandise.size}">
                                        <img src="/assets/icons/remove_cart_item_icon.svg">
                                    </a>
                                </div>
                                <div class="cart-item-image">
                                    <img src="${merchandise.img}">
                                </div>
                                <div class="cart-item-info-and-quantity">
                                    <label>${merchandise.name}</label>
                                    <label class="item-color">${merchandise.color}</label>
                                    <label class="item-size">${merchandise.size}</label>
                                    <div class="cart-item-quantity">
                                        <button class="cart-item-decrement">
                                            <img src="/assets/icons/decrement_icon.svg">
                                        </button>
                                        <input class="item-quantity no-spinner" data-id="${merchandise.id}" data-size-id="${merchandise.size}" type="number" value="${merchandise.quantity}">
                                        <button class="cart-item-increment">
                                            <img src="/assets//icons/increment_icon.svg">
                                        </button>
                                    </div>
                                </div>
                                <div class="cart-item-price">
                                    <label>₱${merchandise.price}</label>
                                </div>`;

        cartItemsContainer.appendChild(cartItem);
    }
}

function getCartItemsTotal() {
    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];
    const checkoutButton = document.querySelector('.cart-checkout');
    const isNotEmpty = cartItems.length;
    let total = 0;

    if (!isNotEmpty) {
        checkoutButton.classList.remove('show-checkout');
        return;
    }

    cartItems.forEach(item => {
        total += parseInt(item.price * item.quantity);
    });

    checkoutButton.classList.add('show-checkout');
    checkoutButton.innerHTML = `CHECKOUT EST (₱${total})`;
}

displayCartItemCount();