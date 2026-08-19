// ===== HAMBURGER MENU (same behaviour as login.js) =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ===== REGEX PATTERNS =====
const NAME_REGEX = /^[A-Za-z]{2,30}$/; // letters only, 2-30 chars
const FULL_NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/; // words separated by space/'/-
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// min 8 chars, at least 1 lowercase, 1 uppercase, 1 digit, 1 special char
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

// ===== FIELDS =====
const form = document.getElementById("signupForm");
const firstName = document.getElementById("firstName");
const fullName = document.getElementById("fullName");
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

function validateFullName() {
    const el = document.getElementById("fullNameError");
    if (!fullName.value.trim()) return setError(fullName, el, "Full name is required.");
    if (!FULL_NAME_REGEX.test(fullName.value.trim())) {
        return setError(fullName, el, "Enter a valid full name.");
    }
    return setError(fullName, el, "");
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
fullName.addEventListener("input", validateFullName);
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
        validateFullName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
    ];

    const isValid = validations.every(Boolean);

    if (isValid) {
        // Replace with real signup logic (API call etc.)
        alert("Account created successfully!");
        form.reset();
    }
});

// ===== CANCEL =====
cancelBtn.addEventListener("click", () => {
    form.reset();
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("input").forEach((el) => el.classList.remove("invalid"));
});