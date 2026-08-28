const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const serviceDropdownLink = document.getElementById("servicesLink");

if (serviceDropdownLink) {

    const serviceDropdown = serviceDropdownLink.closest(".dropdown");

    serviceDropdownLink.addEventListener("click", function (e) {

        if (window.innerWidth <= 900) {
            e.preventDefault(); // stop routing
            if (serviceDropdown) serviceDropdown.classList.toggle("active");
        }

    });

}

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

if (dropdown && dropbtn) {
    dropbtn.addEventListener("click", () => {
        dropdown.classList.toggle("open");
    });
}

const reveals = document.querySelectorAll(".reveal-left, .reveal-right");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("reveal-active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


const form = document.getElementById("loginForm");
if (form) {

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        emailError.textContent = "";
        passwordError.textContent = "";
        emailInput.classList.remove("invalid");
        passwordInput.classList.remove("invalid");

        let valid = true;

        const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === "") {
            emailError.textContent = "Email is required.";
            emailInput.classList.add("invalid");
            valid = false;
        } else if (!EMAIL_REGEX.test(email)) {
            emailError.textContent = "Enter a valid email address.";
            emailInput.classList.add("invalid");
            valid = false;
        }

        if (password === "") {
            passwordError.textContent = "Password is required.";
            passwordInput.classList.add("invalid");
            valid = false;
        } else if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters.";
            passwordInput.classList.add("invalid");
            valid = false;
        }

        if (!valid) {
            return;
        }

        const savedUser = localStorage.getItem("fatcatUser");
        if (!savedUser) {
            emailError.textContent = "No account found. Please sign up first.";
            emailInput.classList.add("invalid");
            return;
        }

        const user = JSON.parse(savedUser);

        if (email !== user.email) {
            emailError.textContent = "Email address is incorrect.";
            emailInput.classList.add("invalid");
            return;
        }

        if (password !== user.password) {
            passwordError.textContent = "Incorrect password.";
            passwordInput.classList.add("invalid");
            return;
        }

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                firstName: user.firstName,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            })
        );

        window.location.href = "../dashboard/dashboard.html";

    });

}