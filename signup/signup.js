// ===== HAMBURGER MENU (same behaviour as login.js) =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ===== REGEX PATTERNS =====
const NAME_REGEX = /^[A-Za-z]{2,30}$/;
const PHONE_REGEX = /^[6-9][0-9]{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// ===== FIELDS =====
const form = document.getElementById("signupForm");
const firstName = document.getElementById("firstName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const cancelBtn = document.getElementById("cancelBtn");

// ===== HELPERS =====
function setError(input, errorEl, message) {
    errorEl.textContent = message;
    input.classList.toggle("invalid", Boolean(message));
    return message === "";
}

function validateFirstName() {
    const el = document.getElementById("firstNameError");
    if (!firstName.value.trim()) return setError(firstName, el, "First name is required.");
    if (!NAME_REGEX.test(firstName.value.trim())) {
        return setError(firstName, el, "Only letters, 2-30 characters.");
    }
    return setError(firstName, el, "");
}

function validatePhone() {
    const el = document.getElementById("phoneError");
    if (!phone.value.trim()) {
        return setError( phone, el, "Phone number is required." );
    }
    if (!PHONE_REGEX.test(phone.value.trim())) {
        return setError( phone, el, "Enter a valid 10-digit phone number." );
    }
    return setError(phone, el, "");
}

function validateEmail() {
    const el = document.getElementById("emailError");
    if (!email.value.trim()) return setError(email, el, "Email is required.");
    if (!EMAIL_REGEX.test(email.value.trim())) {
        return setError(email, el, "Enter a valid email address.");
    }
    return setError(email, el, "");
}

function validatePassword() {
    const el = document.getElementById("passwordError");
    if (!password.value) return setError(password, el, "Password is required.");
    if (!PASSWORD_REGEX.test(password.value)) {
        return setError(
            password,
            el,
            "Min 8 chars incl. uppercase, lowercase, number & symbol."
        );
    }
    return setError(password, el, "");
}

function validateConfirmPassword() {
    const el = document.getElementById("confirmPasswordError");
    if (!confirmPassword.value) return setError(confirmPassword, el, "Please confirm your password.");
    if (confirmPassword.value !== password.value) {
        return setError(confirmPassword, el, "Passwords do not match.");
    }
    return setError(confirmPassword, el, "");
}

// ===== LIVE VALIDATION =====
firstName.addEventListener("input", validateFirstName);
phone.addEventListener("input", () => { phone.value = phone.value .replace(/\D/g, "") .slice(0, 10); validatePhone();});
email.addEventListener("input", validateEmail);
password.addEventListener("input", () => {
    validatePassword();
    if (confirmPassword.value) validateConfirmPassword();
});
confirmPassword.addEventListener("input", validateConfirmPassword);

// ===== SUBMIT =====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validations = [
        validateFirstName(),
        validatePhone(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword()
    ];

    const isValid = validations.every(Boolean);
    if (!isValid) {
        return;
    }
    const userData = {
        firstName: firstName.value.trim(),
        phone: phone.value.trim(),
        email: email.value .trim() .toLowerCase(),
        password: password.value
    };

    localStorage.setItem( "fatcatUser",JSON.stringify(userData) );
    window.location.href = "../login/login.html";

});

// ===== CANCEL =====
cancelBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("input").forEach((el) => el.classList.remove("invalid"));
});