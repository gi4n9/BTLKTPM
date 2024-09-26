import sales from "./data/sale.json" with { type: "json"};
import sukiens from "./data/sukien.json" with { type: "json" };

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

const renderModalFilm = (data) => {
    const modals = document.getElementById("list-modal");
    data.forEach((item, index) => {
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = 
        `
        <div class="modal fade" id="film-${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 pt-0">
                    <div class="row film-info">
                        <div class="col col-4 d-flex flex-column align-items-center">
                            <img src="${item.src}" class="film-img" alt="">
                            <a href="/pages/showtimes/index.html" class="d-block">
                                <button class="btn btn-pick mt-3">
                                    <img src="https://www.bhdstar.vn/wp-content/themes/loodo-starter/inc/imgs/ticketIcon.png" height="20" width="20" alt="">
                                    Mua vé ngay
                                </button>
                            </a>
                        </div>
                        <div class="col col-8">
                            <p class="sale-title">${item.title}</p>
                            <p>${item.note}</p>
                            <p>Phân loại: <span class="badge bg-danger">T18</span></p>
                            <p>Định dạng: <span class="badge bg-success">2D</span></p>
                            <p>Đạo diễn: ${item.dao_dien}</p>
                            <p>Diễn viên: ${item.dien_vien}</p>
                            <p>Thể loại: ${item.the_loai}</p>
                            <p>Khởi chiếu: ${item.khoi_chieu}</p>
                            <p>Thời lượng: ${item.thoi_luong}</p>
                            <p>Ngôn ngữ: ${item.phu_de}</p>
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
    renderSaleList("list-sale-1", sales, "sale");
    renderSaleList("list-sale-2", sukiens, "sukien");
    renderModalSale(sales, "sale");
    renderModalSale(sukiens, "sukien");
}

render();