document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    const payButton = document.getElementById('payButton');
    let selectedSeats = [];

    // Thêm sự kiện click cho từng ghế
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            const seatNumber = seat.getAttribute('data-seat');
            const filmTitle = seat.getAttribute('data-film'); // Đổi từ filmId sang filmTitle
            const theaterId = seat.getAttribute('data-theater');
            const date = seat.getAttribute('data-date');
            const time = seat.getAttribute('data-time');
            const roomName = seat.getAttribute('data-room');
            
            // Nếu ghế đã chọn, bỏ chọn và xóa khỏi danh sách selectedSeats
            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s.seat !== seatNumber);
            } else {
                // Nếu chưa chọn, thêm ghế vào danh sách selectedSeats
                seat.classList.add('selected');
                selectedSeats.push({
                    filmTitle, // Đổi từ filmId sang filmTitle
                    theaterId,
                    date,
                    time,
                    roomName,
                    seat: seatNumber
                });
            }

            // Hiển thị nút "Thanh toán" nếu có ghế được chọn
            if (selectedSeats.length > 0) {
                payButton.style.display = 'block';
            } else {
                payButton.style.display = 'none';
            }
        });
    });

    // Hiển thị pop-up thanh toán khi bấm "Thanh toán"
    payButton.addEventListener('click', function () {
        if (selectedSeats.length > 0) {
            // Lấy thông tin từ ghế đầu tiên (vì film, theater, date, time, room đều giống nhau cho các ghế)
            const { filmTitle, theaterId, date, time, roomName } = selectedSeats[0];

            // Hiển thị thông tin trong modal
            document.getElementById('modalFilm').textContent = filmTitle; // Đổi từ filmId sang filmTitle
            document.getElementById('modalTheater').textContent = theaterId;
            document.getElementById('modalDate').textContent = date;
            document.getElementById('modalTime').textContent = time;
            document.getElementById('modalRoom').textContent = roomName;

            // Hiển thị danh sách các ghế đã chọn
            const seatList = selectedSeats.map(seat => seat.seat).join(', ');
            document.getElementById('modalSeats').textContent = seatList;
        }
    });

    // Xử lý thanh toán khi bấm "Xác nhận thanh toán"
    document.getElementById('confirmPayButton').addEventListener('click', function () {
        if (selectedSeats.length > 0) {
            const { filmTitle, theaterId, date, time, roomName } = selectedSeats[0]; 
            const seatNumbers = selectedSeats.map(seat => seat.seat);
    
            // Lấy token từ localStorage
            const token = localStorage.getItem('token');
    
            // Gửi dữ liệu ghế đã chọn lên server để lưu vào database
            fetch('/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Thêm token vào header
                },
                body: JSON.stringify({
                    filmTitle,
                    theaterId,
                    date,
                    time,
                    roomName,
                    seats: seatNumbers
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                console.log(token);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.message === 'Booking successful') {
                    alert('Thanh toán thành công!');
                } else {
                    alert('Thanh toán thất bại, vui lòng thử lại!');
                }
    
                // Reset sau khi thanh toán thành công
                selectedSeats = [];
                payButton.style.display = 'none';
                seats.forEach(seat => seat.classList.remove('selected'));
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Lỗi khi thanh toán, vui lòng thử lại!');
            });
        }
    });
});
