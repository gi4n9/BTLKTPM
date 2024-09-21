import raps from "./data/rap.json"  with { type: "json" }; 

const renderTheaterList = (id) => {
    const list = document.getElementById(id);

    raps.forEach(item => {
        const e = document.createElement('div');
        e.classList.add("col", "col-lg-3","col-md-4", "col-sm-6", "col-12","theater","d-flex","flex-column","gap-2","align-items-start");
    
        e.innerHTML = 
        `
        <img src="${item.src}" alt="">
        <h5>${item.name}</h5>
        <img src="../../icons/like.svg" height="16" width="16" alt="">
        <p>Địa chỉ: ${item.address}</p>
        <button class="btn btn-outline-primary" style="width: 100%;"><img src="../../icons/share.svg" height="20" width="20" alt=""> CHIA SẺ</button>
        `
    
        list.appendChild(e);
    })
}



const render = () => {
    renderTheaterList("list-theater");
}

render();