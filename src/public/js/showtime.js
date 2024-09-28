import raps from "./data/rap.json" with { type: "json" };

const renderTheaterList = (id) => {
    const list = document.getElementById(id);

    raps.forEach(item => {
        const e = document.createElement('div');
        e.classList.add("showtime", "d-flex", "flex-column", "align-items-start");


        e.innerHTML =
            `
        <div class=" d-flex flex-row justify-content-center gap-2 align-items-center">
        <img src="${item.src}" height="24" width="24" alt="">
        <span>${item.name}</span>
    </div>
    <p class="mt-2">${item.address}</p>
    <div class="row" style="width: 100%;">
        <div class="time col-3">
            <div class="time-value" data-bs-toggle="modal" data-bs-target="#modal-1">
                14:25-12/5
            </div>
            <div class="gap-2 mt-1 d-flex flex-row justify-content-center align-items-center">
                <span class="badge bg-secondary">PHỤ ĐỀ</span>
                <span class="badge bg-secondary bg-success">2D</span>
            </div>
        </div>
        <div class="time col-3">
            <div class="time-value" data-bs-toggle="modal" data-bs-target="#modal-1">
                16:25-12/5
            </div>
            <div class="gap-2 mt-1 d-flex flex-row justify-content-center align-items-center">
                <span class="badge bg-secondary">PHỤ ĐỀ</span>
                <span class="badge bg-secondary bg-success">2D</span>
            </div>
        </div>
        <div class="time col-3">
            <div class="time-value" data-bs-toggle="modal" data-bs-target="#modal-1">
                18:25-12/5
            </div>
            <div class="gap-2 mt-1 d-flex flex-row justify-content-center align-items-center">
                <span class="badge bg-secondary">PHỤ ĐỀ</span>
                <span class="badge bg-secondary bg-success">2D</span>
            </div>
        </div>
        <div class="time col-3">
            <div class="time-value" data-bs-toggle="modal" data-bs-target="#modal-1">
                20:25-12/5
            </div>
            <div class="gap-2 mt-1 d-flex flex-row justify-content-center align-items-center">
                <span class="badge bg-secondary">PHỤ ĐỀ</span>
                <span class="badge bg-secondary bg-success">2D</span>
            </div>
        </div>
        
    </div>
        `

        list.appendChild(e);
    })
}



const render = () => {
    renderTheaterList("list-show-time");
}

render();