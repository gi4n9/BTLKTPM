document.getElementById("dashboard-btn").addEventListener("click", function() {
    document.getElementById("dashboard-section").style.display = "block";
    document.getElementById("movie-list-section").style.display = "none";
    document.getElementById("user-access-section").style.display = "none";
});

document.getElementById("movie-list-btn").addEventListener("click", function() {
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("movie-list-section").style.display = "block";
    document.getElementById("user-access-section").style.display = "none";
});

document.getElementById("user-access-btn").addEventListener("click", function() {
    document.getElementById("dashboard-section").style.display = "none";
    document.getElementById("movie-list-section").style.display = "none";
    document.getElementById("user-access-section").style.display = "block";
});

// Dữ liệu giả thống kê phim (sau này sẽ lấy từ server - huy cứu tôi nhé :>)
const movieStatsData = [
    { name: 'Phim 1', genre: 'Hành Động', booked: 50, paid: 30, unpaid: 20, totalMoney: '$500' },
    { name: 'Phim 2', genre: 'Kinh Dị', booked: 40, paid: 25, unpaid: 15, totalMoney: '$400' }
];

// Tổng hợp dữ liệu
const dashboardMovieStats = document.getElementById('dashboard-movie-stats');
movieStatsData.forEach(movie => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.booked}</td>
        <td>${movie.paid}</td>
        <td>${movie.unpaid}</td>
        <td>${movie.totalMoney}</td>
    `;
    dashboardMovieStats.appendChild(row);
});

// Data tạm thời (sau này sẽ lấy từ server - huy cứu tôi nhé :>)
const userData = [
    { id: 1, name: 'User 1', phone: '123456789', movie: 'Phim 1', tickets: 2, paid: '$20' },
    { id: 2, name: 'User 2', phone: '987654321', movie: 'Phim 2', tickets: 3, paid: '$24' }
];

// Danh sách phim
const movieList = document.getElementById('movie-list');
movieData.forEach(movie => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.seats}</td>
        <td>${movie.time}</td>
        <td>${movie.price}</td>
    `;
    movieList.appendChild(row);
});

// Danh sách user
const userList = document.getElementById('user-list');
userData.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.phone}</td>
        <td>${user.movie}</td>
        <td>${user.tickets}</td>
        <td>${user.paid}</td>
    `;
    userList.appendChild(row);
});

// Hiển thị thông tin admin
const adminInfo = document.getElementById('admin-info');
const dropdownMenu = document.getElementById('dropdown-menu');

adminInfo.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

