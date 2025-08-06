const cart = document.querySelector('.cart-wrapper');

document.querySelector('.nav-menu').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links-wrapper ul');
    navLinks.classList.toggle('show-nav-menu');
});

document.querySelector('.cart-icon').addEventListener('click', () => {
    cart.classList.remove('hide-cart');
    document.body.classList.toggle('no-scroll');
    cart.classList.toggle('show-cart');
});

document.querySelector('.cart-close').addEventListener('click', () => {
    cart.classList.remove('show-cart');
    document.body.classList.remove('no-scroll');
    cart.classList.toggle('hide-cart');
});