const renderSaleList = (id, data, type) => {
    const list = document.getElementById(id);

    data.forEach((item, index) => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('swiper-slide');
    
        filmContainer.innerHTML = 
        `
        <a href="" data-bs-toggle="modal" data-bs-target="#${type}-${index}">
            <img class="ratio ratio-16x9" src="${item.src}" alt="">
            <p class="mt-3 sale-title text-start">${item.title}</p>
            <p class="mt-1 text-start">Thời gian khuyến mãi: 26/8/2023 - 26/9/2023</p>
        </a>
        `
    
        list.appendChild(filmContainer);
    })
}

const renderModalSale = (data, type) => {
    const modals = document.getElementById("list-modal");
    data.forEach((item, index) => {
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = 
        `
        <div class="modal fade" id="${type}-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 pt-0">
                    <div class="row film-info">
                        <div class="col col-4 d-flex flex-column align-items-center">
                            <img src="${item.src}" class="ratio ratio-16x9" alt="">
                        </div>
                        <div class="col col-8">
                            <p class="sale-title">${item.title}</p>
                            <p>${item.time}</p>
                            <p>${item.note}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `

        modals.appendChild(modalContainer);
    })
}

const render = () => {
    renderSaleList("list-sale-1", [], "sale");
    renderSaleList("list-sale-2", [], "sukien");
    renderModalSale([], "sale");
    renderModalSale([], "sukien");
}

render();