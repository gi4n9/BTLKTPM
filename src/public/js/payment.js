document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    const payButton = document.getElementById('payButton');
    let selectedSeats = [];

    // Thêm sự kiện click cho từng ghế
    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            const seatNumber = seat.getAttribute('data-seat');
            const filmId = seat.getAttribute('data-film');
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
                    filmId,
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
            const { filmId, theaterId, date, time, roomName } = selectedSeats[0];

            // Hiển thị thông tin trong modal
            document.getElementById('modalFilm').textContent = filmId;
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
        // Xử lý logic thanh toán tại đây, ví dụ: gọi API để xác nhận thanh toán
        alert('Thanh toán thành công!');

        // Reset sau khi thanh toán thành công
        selectedSeats = [];
        payButton.style.display = 'none';
        seats.forEach(seat => seat.classList.remove('selected'));
    });
});
