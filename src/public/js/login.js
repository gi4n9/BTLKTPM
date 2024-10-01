document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm'); // Lấy form đăng nhập

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn form gửi đi ngay lập tức

        const formData = new FormData(form); // Lấy dữ liệu từ form
        const data = Object.fromEntries(formData); // Chuyển đổi thành object

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Chuyển đổi dữ liệu thành chuỗi JSON
            });

            if (response.ok) {
                const result = await response.json(); // Nhận dữ liệu JSON từ server
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('userLogin', JSON.stringify(result.user));
                window.location.href = '/home'; // Chuyển hướng đến trang home
            } else {
                const errorText = await response.text(); // Lấy thông báo lỗi từ server
                alert('Đăng nhập không thành công: ' + errorText);
            }
        } catch (error) {
            console.error('Error:', error); // In lỗi ra console
            alert('Có lỗi xảy ra khi đăng nhập.');
        }
    });
});

// Hàm để hiển thị/ẩn mật khẩu
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.querySelector(".toggle-password i");
    if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Thay đổi kiểu mật khẩu thành text
        togglePasswordIcon.classList.remove("fa-eye"); // Thay đổi biểu tượng
        togglePasswordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password"; // Thay đổi kiểu mật khẩu thành password
        togglePasswordIcon.classList.remove("fa-eye-slash"); // Thay đổi biểu tượng
        togglePasswordIcon.classList.add("fa-eye");
    }
}
