// ===== HAMBURGER MENU (same behaviour as login.js) =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ===== REGEX PATTERNS =====
const NAME_REGEX = /^[A-Za-z\s]{2,30}$/;
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
const signupTerms = document.getElementById("signupTerms");
const cancelBtn = document.getElementById("cancelBtn");

// ===== HELPERS =====
function setError(input, errorEl, message) {
    if (errorEl) errorEl.textContent = message;
    if (input) input.classList.toggle("invalid", Boolean(message));
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
        return setError(phone, el, "Phone number is required.");
    }
    if (!PHONE_REGEX.test(phone.value.trim())) {
        return setError(phone, el, "Enter a valid 10-digit phone number.");
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

function validateTerms(showToast = true) {
    const shouldShow = (showToast === true);
    const el = document.getElementById("termsError");
    if (window.TermsManager && typeof window.TermsManager.validate === "function") {
        const isValid = window.TermsManager.validate(form, shouldShow);
        if (!isValid) {
            const state = window.TermsManager.getState(form);
            if (!state.opened) {
                if (el) el.textContent = "Please review the Terms & Conditions before submitting.";
            } else if (!state.scrolledToBottom) {
                if (el) el.textContent = "Please read the Terms & Conditions completely before accepting.";
            } else {
                if (el) el.textContent = "Please accept the Terms & Conditions to continue.";
            }
            return false;
        }
    } else {
        if (!signupTerms || !signupTerms.checked) {
            if (el) el.textContent = "Please accept the Terms & Conditions to continue.";
            return false;
        }
    }
    if (el) el.textContent = "";
    return true;
}

// ===== PASSWORD VISIBILITY TOGGLE (INDEPENDENT) =====
function togglePasswordField(inputEl, btnEl) {
    if (!inputEl) return;
    const isPass = inputEl.type === "password";
    inputEl.type = isPass ? "text" : "password";

    const icon = btnEl ? btnEl.querySelector("i") : null;
    if (icon) {
        if (isPass) {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    if (btnEl) {
        btnEl.setAttribute("aria-label", isPass ? "Hide password" : "Show password");
    }

    // Preserve cursor position & focus
    try {
        const len = inputEl.value.length;
        inputEl.focus({ preventScroll: true });
        inputEl.setSelectionRange(len, len);
    } catch (_) {}
}

// Expose globally to support HTML onclick attributes
window.togglePassword = function (fieldId, btnEl) {
    const input = document.getElementById(fieldId);
    togglePasswordField(input, btnEl);
};

// Also attach event listeners if inline onclick is not already defined
const togglePassBtn = document.getElementById("togglePasswordBtn");
if (togglePassBtn && !togglePassBtn.getAttribute("onclick")) {
    togglePassBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePasswordField(password, this);
    });
}

const toggleConfirmPassBtn = document.getElementById("toggleConfirmPasswordBtn");
if (toggleConfirmPassBtn && !toggleConfirmPassBtn.getAttribute("onclick")) {
    toggleConfirmPassBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePasswordField(confirmPassword, this);
    });
}

// ===== AUTOFILL / EMPTY FORM PRESERVATION =====
function clearSignupForm() {
    if (form) form.reset();
    if (firstName) { firstName.value = ""; firstName.defaultValue = ""; }
    if (phone) { phone.value = ""; phone.defaultValue = ""; }
    if (email) { email.value = ""; email.defaultValue = ""; }
    if (password) { password.value = ""; password.defaultValue = ""; }
    if (confirmPassword) { confirmPassword.value = ""; confirmPassword.defaultValue = ""; }
    if (signupTerms) signupTerms.checked = false;
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("input").forEach((el) => el.classList.remove("invalid", "error-input", "success-input"));
}

clearSignupForm();
window.addEventListener("pageshow", clearSignupForm);

// ===== LIVE VALIDATION =====
firstName.addEventListener("input", validateFirstName);
phone.addEventListener("input", () => {
    phone.value = phone.value.replace(/\D/g, "").slice(0, 10);
    validatePhone();
});
email.addEventListener("input", validateEmail);
password.addEventListener("input", () => {
    validatePassword();
    if (confirmPassword.value) validateConfirmPassword();
});
confirmPassword.addEventListener("input", validateConfirmPassword);
if (signupTerms) {
    signupTerms.addEventListener("change", () => validateTerms(false));
}

// ===== SUBMIT =====
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validations = [
        validateFirstName(),
        validatePhone(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validateTerms(true)
    ];

    const isValid = validations.every(Boolean);
    if (!isValid) {
        return;
    }

    const userData = {
        firstName: firstName.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim().toLowerCase(),
        password: password.value
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "Create Account";
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Creating Account...";
    }

    const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

    fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(data.detail || "Unable to create your account. Please try again.");
        }
        // Save safe display info only (NEVER store password)
        localStorage.setItem("fatcatUser", JSON.stringify({
            firstName: userData.firstName,
            phone: userData.phone,
            email: userData.email
        }));
        if (typeof showNotification === "function") {
            showNotification("Account created successfully! You can now log in.", "success");
        }
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1200);
    })
    .catch(err => {
        if (typeof showNotification === "function") {
            showNotification(err.message || "Unable to create your account. Please try again.", "error");
        }
        const emailErrEl = document.getElementById("emailError");
        if (emailErrEl) {
            emailErrEl.textContent = err.message || "Unable to create your account. Please try again.";
            email.classList.add("invalid");
        }
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});

// ===== CANCEL =====
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
        clearSignupForm();
    });
}