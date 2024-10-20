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
    document.getElementById('confirmPayButton').addEventListener('click', async function (e) {
        e.preventDefault();

        if (selectedSeats.length === 0) {
            alert('Vui lòng chọn ít nhất một ghế để thanh toán.');
            return;
        }

        // Sử dụng các giá trị từ ghế đầu tiên để tạo endpoint chính xác
        const { filmName, theaterId, date, time } = selectedSeats[0];

        const data = {
            seats: selectedSeats.map(seat => ({
                seat: seat.seat
            }))
        };

        try {
            const response = await fetch(`/films/${filmName}/theaters/${theaterId}/dates/${date}/showtimes/${time}/seats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                alert('Thanh toán thành công!');
                // Chuyển hướng tới trang xác nhận hoặc home sau khi thanh toán thành công
                window.location.href = '/home';
            } else {
                alert('Thanh toán thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra trong quá trình thanh toán.');
        }

        // Reset sau khi thanh toán thành công
        selectedSeats = [];
        payButton.style.display = 'none';
        seats.forEach(seat => seat.classList.remove('selected'));
    });


});
