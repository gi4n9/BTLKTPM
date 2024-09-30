document.getElementById('formRegister').addEventListener('submit', async (event) => {
    event.preventDefault(); // Ngăn form gửi đi ngay lập tức

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData); // Chuyển đổi FormData thành object

    try {
        const response = await fetch(event.target.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify(data), // Chuyển đổi dữ liệu thành chuỗi JSON
        });

        const result = await response.text();
        alert(result); // Hiển thị phản hồi từ server
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi trong quá trình đăng ký.');
    }
});
