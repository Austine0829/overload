document.querySelector('.nav-menu').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links-wrapper ul');
    navLinks.classList.toggle('show-nav-menu');
});

// TODO: design needs fixing
document.querySelector('.cart-icon').addEventListener('click', () => {
    const cart = document.querySelector('.cart-wrapper');
    cart.classList.toggle('show-cart');
});