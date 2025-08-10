const loginModalWrapper = document.querySelector('.login-modal-wrapper');
const loginModal = document.querySelector('.login-modal');

document.querySelector('.login-icon').addEventListener('click', () => {
    loginModalWrapper.classList.add('show-login-modal');
});

document.querySelector('.close-login-modal').addEventListener('click', () => {
    loginModalWrapper.classList.remove('show-login-modal');
});