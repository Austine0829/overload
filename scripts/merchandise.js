const gridContainer = document.querySelector('.grid-container');
const CART_ITEMS = 'cart-items';

async function renderAndInitializeElements() {
    await getAllMerchandise();
    colorAllCheckedRadio();
}

async function getAllMerchandise() {
    try {
        const response = await fetch('/tshirts.json');

        if (!response.ok) return;

        const data = await response.json();
        for (const merchandise of data) {
            const gridBox = document.createElement('div');
            gridBox.setAttribute('class', 'grid-box');

            gridBox.innerHTML = `<div class="grid-box-image">
                                    <img src="${merchandise.img}">
                                </div>
                                <div class="grid-box-name-and-price">
                                    <label>${merchandise.name}</label>
                                    <label>₱${merchandise.price}</label>
                                </div>
                                <div class="grid-box-color-label">
                                    <label>${merchandise.color}</label>
                                </div>
                                <div class="grid-box-sizes">
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="XS" checked>
                                        XS
                                    </label>
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="S">
                                        S
                                    </label>
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="M">
                                        M
                                    </label>
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="L">
                                        L
                                    </label>
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="XL">
                                        XL
                                    </label>
                                    <label class="size-box">
                                        <input class="size-radio" type="radio" name="${merchandise.id}" value="XXL">
                                        XXL
                                    </label>
                                </div>
                                <button class="add-to-cart" data-id="${merchandise.id}">ADD TO CART</button>`;

            gridContainer.appendChild(gridBox);
        }

    } catch (error) {
        console.log("Error Details: ", error);
    }
}

function colorAllCheckedRadio() {
    const sizeRadio = gridContainer.querySelectorAll('.size-radio');
    sizeRadio.forEach(radio => {
        if (radio.checked) {
            const sizeBox = radio.closest('.size-box');
            sizeBox.style.color = 'white';
            sizeBox.style.backgroundColor = 'black';
        }
    });
}

gridContainer.addEventListener('click', (e) => {
    if (!e.target.matches('.size-radio')) return;
    const sizeBox = e.target.closest('.size-box');
    const gridBoxSizes = e.target.closest('.grid-box-sizes');
    const allSizeBox = gridBoxSizes.querySelectorAll('.size-box');

    allSizeBox.forEach(box => {
        box.style.color = 'black';
        box.style.backgroundColor = 'white';
    });

    sizeBox.style.color = 'white';
    sizeBox.style.backgroundColor = 'black';
});

gridContainer.addEventListener('click', (e) => {
    if (!e.target.matches('.add-to-cart')) return;
    const id = e.target.dataset.id;
    const gridBoxSizes = e.target.previousElementSibling;
    const sizeRadio = gridBoxSizes.querySelectorAll('.size-radio');

    sizeRadio.forEach(radio => {
        if (radio.checked) {
            var size = radio.value;
            addToCart(id, size);
        }
    });
});

async function addToCart(id, size) {
    const response = await fetch('/tshirts.json');
    const data = await response.json();

    const merchandise = data.find(d => d.id == id);
    Object.assign(merchandise, { size: size });

    const cart = JSON.parse(localStorage.getItem(CART_ITEMS)) || [];

    const isExisting = cart.some(i => i.id == merchandise.id);
    if (isExisting) return;

    cart.push(merchandise);
    localStorage.setItem(CART_ITEMS, JSON.stringify(cart));
}

renderAndInitializeElements();