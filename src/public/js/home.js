const renderFilmList = (id, data, type) => {
    const list = document.getElementById(id);

    data.forEach((item,index) => {
        const filmContainer = document.createElement('div');
        filmContainer.classList.add('swiper-slide');
        filmContainer.innerHTML = 
        `
        <div class="film">
            <img src="${item.src}" alt="">
            <div class="d-flex flex-row gap-1 mt-2">
                <span class="badge bg-danger">T18</span>
                <span class="badge bg-secondary">PHỤ ĐỀ</span>
                <span class="badge bg-success">2D</span>
            </div>
            <p class="mt-3 one-line">${item.title}</p>
            <p class="mt-1">Thể loại phim: ${item.the_loai}</p>
            <div class="d-flex flex-row justify-content-between align-center">
                <a href="/showtimes" class="d-block">
                    <button class="btn btn-pick mt-3">
                        <img src="https://www.bhdstar.vn/wp-content/themes/loodo-starter/inc/imgs/ticketIcon.png" height="20" width="20" alt="">
                        Mua vé ngay
                    </button>
                </a>
                <button class="btn btn-show mt-3" data-bs-toggle="modal" data-bs-target="#${type}-${index}">i</button>
            </div>
        </div>
        `
        list.appendChild(filmContainer);
    })
}

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

const renderModalFilm = (data, type) => {
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
                            <img src="${item.src}" class="film-img" alt="">
                            <a href="/showtimes" class="d-block">
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
                            <p>Ngôn ngữ: ${item.ngon_ngu}</p>
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

    })
}

const render = async () => {
    const response_film = await fetch("http://localhost:3000/news");
    const films = await response_film.json();

    renderSaleList("list-sale-1", [], "sale");
    renderModalSale([], "sale");
    
    renderFilmList("list-film-1", [...films].filter(f => f.type === "ban_truoc"), "films_ban_truoc");
    renderFilmList("list-film-2", [...films].filter(f => f.type === "dang_chieu"), "films_dangchieu");
    renderFilmList("list-film-3", [...films].filter(f => f.type === "sap_chieu"), "films_sapchieu");
    renderSaleList("list-sale-2", [], "sukien");

    // renderModalFilm(films, "film");
    renderModalFilm([...films].filter(f => f.type === "ban_truoc"), "films_ban_truoc");
    renderModalFilm([...films].filter(f => f.type === "dang_chieu"), "films_dangchieu");
    renderModalFilm([...films].filter(f => f.type === "sap_chieu"), "films_sapchieu");
    // renderModalSale(sukiens, "sukien");
}

render();