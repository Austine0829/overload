async function getAllPicture() {
    try {
        const response = await fetch('/pictures.json');

        if (!response.ok) return;

        const gridContainer = document.querySelector('.grid-container');

        const datas = await response.json();
        for (const data of datas) {
            const gridBox = document.createElement('div');
            gridBox.setAttribute('class', 'grid-box');

            gridBox.innerHTML = `<div class="grid-box">
                                    <img src="${data.img}">
                                </div>`;

            gridContainer.appendChild(gridBox);
        }
    } catch (error) {

    }
}

getAllPicture();