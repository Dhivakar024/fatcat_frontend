const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");

});

const serviceDropdownLink = document.getElementById("servicesLink");

if(serviceDropdownLink){

    const serviceDropdown = serviceDropdownLink.closest(".dropdown");

    serviceDropdownLink.addEventListener("click", function(e){

        if(window.innerWidth <= 900){
            e.preventDefault(); // stop routing
            serviceDropdown.classList.toggle("active");
        }

    });

}

/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", () => {

dropdown.classList.toggle("open");

});


const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

function revealOnScroll(){

const trigger = window.innerHeight * 0.85;

reveals.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < trigger){

el.classList.add("reveal-active");

}

});

}

const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("password")
            .value;

        const emailError =
            document.getElementById("emailError");

        const passwordError =
            document.getElementById("passwordError");


        // Clear previous errors

        emailError.textContent = "";
        passwordError.textContent = "";

        document
            .getElementById("email")
            .classList.remove("invalid");

        document
            .getElementById("password")
            .classList.remove("invalid");


        let valid = true;


        // =========================
        // EMAIL VALIDATION
        // =========================

        const EMAIL_REGEX =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


        if (email === "") {

            emailError.textContent =
                "Email is required.";

            document
                .getElementById("email")
                .classList.add("invalid");

            valid = false;

        } else if (!EMAIL_REGEX.test(email)) {

            emailError.textContent =
                "Enter a valid email address.";

            document
                .getElementById("email")
                .classList.add("invalid");

            valid = false;
        }


        // =========================
        // PASSWORD VALIDATION
        // =========================

        if (password === "") {

            passwordError.textContent =
                "Password is required.";

            document
                .getElementById("password")
                .classList.add("invalid");

            valid = false;

        } else if (password.length < 8) {

            passwordError.textContent =
                "Password must be at least 8 characters.";

            document
                .getElementById("password")
                .classList.add("invalid");

            valid = false;
        }


        // Stop here if basic validation failed

        if (!valid) {
            return;
        }


        // =========================
        // GET SIGNUP USER
        // =========================

        const savedUser =
            localStorage.getItem("fatcatUser");


        if (!savedUser) {

            emailError.textContent =
                "No account found. Please sign up first.";

            document
                .getElementById("email")
                .classList.add("invalid");

            return;
        }


        // Convert saved JSON to object

        const user = JSON.parse(savedUser);


        // =========================
        // CHECK EMAIL
        // =========================

        if (email !== user.email) {

            emailError.textContent =
                "Email address is incorrect.";

            document
                .getElementById("email")
                .classList.add("invalid");

            return;
        }


        // =========================
        // CHECK PASSWORD
        // =========================

        if (password !== user.password) {

            passwordError.textContent =
                "Incorrect password.";

            document
                .getElementById("password")
                .classList.add("invalid");

            return;
        }


        // =========================
        // LOGIN SUCCESS
        // =========================

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
                firstName: user.firstName,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            })
        );


        alert("Login Successful!");


        // Go to home page

        window.location.href =
            "../home/index.html";

    });

}