
const loginform = document.getElementById("login-form");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const Error = document.getElementById("Error");


loginform.addEventListener("submit", function(e){
    // ngan chan su kien load lai trang
    e.preventDefault();

// validate du lieu dau vao

//laydu lie tu local ve
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];
// tim kiem email va mat khau nguoi dung tren google
    const findUser =  userLocal.find(
        (user) =>
        user.email === emailElement.value && 
        user.password === passwordElement.value
    );
    if (!findUser){
        Error.style.display = "block"
    } else {
        window.location.href = "index.html";
    
        localStorage.setItem("userLogin", JSON.stringify(findUser));
    }
});
function togglePassword() {
    var passwordInput = document.getElementById("password");
    var togglePassword = document.querySelector(".toggle-password i");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
}

