const cardsScrollableContainer = document.querySelector('.cards-scrollable-container');
const leftScroll = document.querySelector('.card-scroll-button.left');
const rightScroll = document.querySelector('.card-scroll-button.right');

leftScroll.addEventListener('click', () => {
    cardsScrollableContainer.scrollBy({ left: -1, behavior: 'smooth' });
});

rightScroll.addEventListener('click', () => {
    cardsScrollableContainer.scrollBy({ left: 1, behavior: 'smooth' });
});


async function getAllNewProduct() {
    try {
        const response = await fetch("/tshirts.json");

        if (!response.ok) return;

        const data = await response.json();
        for (const item of data) {
            if (item.status === 'new') {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                card.innerHTML = `<img src="${item.img}">
                                 <div class="card-name-and-price-wrapper">
                                    <label>${item.name}</label>
                                    <label>₱${item.price}</label>
                                 </div>
                                 <div class="card-color-description-wrapper">
                                    <label>${item.color}</label>
                                 </div>`;

                cardsScrollableContainer.appendChild(card);
            }
        }

    } catch (error) {
        console.log('Error Details: ', error);
    }
}

async function getAllProduct() {
    try {
        const response = await fetch("/tshirts.json");

        if (!response.ok) return;

        cardsGridContainer = document.querySelector('.cards-grid-container');

        const data = await response.json();
        for (const item of data) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card-grid mobile-card');

            card.innerHTML = `<img src="${item.img}">
                                <div class="card-name-and-price-wrapper">
                                <label>${item.name}</label>
                                <label>₱${item.price}</label>
                              </div>
                              <div class="card-color-description-wrapper">
                                <label>${item.color}</label>
                              </div>`;

            cardsGridContainer.appendChild(card);
        }

    } catch (error) {
        console.log('Error Details: ', error);
    }
}

getAllNewProduct();
getAllProduct();