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

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : "Login";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Logging in...";
        }

        const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

        fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(async res => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error("Invalid email or password. Please try again.");
            }

            localStorage.setItem("fatcat_token", data.access_token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    firstName: data.user.firstName,
                    fullName: data.user.firstName,
                    email: data.user.email,
                    phone: data.user.phone
                })
            );

            if (typeof showNotification === "function") {
                showNotification("Login successful! Welcome back.", "success");
            }
            setTimeout(() => {
                window.location.href = "../dashboard/dashboard.html";
            }, 1000);
        })
        .catch(err => {
            // Offline fallback to localStorage
            if (err.message && (err.message.includes("Failed to fetch") || err.message.includes("NetworkError"))) {
                console.warn("Backend offline, checking localStorage fallback:", err);
                const savedUser = localStorage.getItem("fatcatUser");
                if (!savedUser) {
                    if (typeof showNotification === "function") {
                        showNotification("Invalid email or password. Please try again.", "error");
                    }
                    emailError.textContent = "No account found. Please sign up first.";
                    emailInput.classList.add("invalid");
                    return;
                }
                const user = JSON.parse(savedUser);
                if (email !== user.email || password !== user.password) {
                    if (typeof showNotification === "function") {
                        showNotification("Invalid email or password. Please try again.", "error");
                    }
                    emailError.textContent = "Invalid email or password. Please try again.";
                    emailInput.classList.add("invalid");
                    return;
                }
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("loggedInUser", JSON.stringify({
                    firstName: user.firstName,
                    fullName: user.fullName || user.firstName,
                    email: user.email,
                    phone: user.phone
                }));
                if (typeof showNotification === "function") {
                    showNotification("Login successful! Welcome back.", "success");
                }
                setTimeout(() => {
                    window.location.href = "../dashboard/dashboard.html";
                }, 1000);
                return;
            }

            // Server-returned validation or credential error
            if (typeof showNotification === "function") {
                showNotification("Invalid email or password. Please try again.", "error");
            }
            emailError.textContent = "Invalid email or password. Please try again.";
            emailInput.classList.add("invalid");
            passwordInput.classList.add("invalid");
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });

    });

}