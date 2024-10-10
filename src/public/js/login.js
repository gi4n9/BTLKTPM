document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm'); // Lấy form đăng nhập
    const errorElement = document.getElementById('error-message'); // Lấy thẻ để hiển thị lỗi

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn form gửi đi ngay lập tức

        const formData = new FormData(form); // Lấy dữ liệu từ form
        const data = Object.fromEntries(formData); // Chuyển đổi thành object

        try {
            const response = await fetch('http://localhost:3000/', { // Gửi yêu cầu tới server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Chuyển đổi object thành chuỗi JSON
            });

            // Kiểm tra mã trạng thái phản hồi
            if (response.redirected) {
                // Nếu server chuyển hướng, đưa người dùng tới trang home
                window.location.href = response.url; // Chuyển hướng đến URL trả về từ server
            } else {
                const result = await response.json(); // Nhận phản hồi từ server

                // Nếu có lỗi
                if (!result.success) {
                    errorElement.style.display = 'block';  // Hiển thị thông báo lỗi
                }
            }
        } catch (error) {
            console.error('Error:', error);
            errorElement.style.display = 'block'; // Hiển thị thông báo lỗi
            errorElement.textContent = 'Có lỗi xảy ra khi đăng nhập.';
        }
    });
    
    // Hàm để tắt thông báo khi người dùng nhập lại mật khẩu

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    emailInput.addEventListener('focus', () => {
        errorElement.style.display = 'none'; // Ẩn thông báo lỗi khi người dùng nhập lại
    });
    passwordInput.addEventListener('focus', () => {
        errorElement.style.display = 'none'; // Ẩn thông báo lỗi khi người dùng nhập lại
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
