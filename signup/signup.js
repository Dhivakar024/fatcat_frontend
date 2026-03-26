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

    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();
      let confirmPassword = document.getElementById("confirmPassword").value.trim();

      let nameError = document.getElementById("nameError");
      let emailError = document.getElementById("emailError");
      let passwordError = document.getElementById("passwordError");
      let confirmError = document.getElementById("confirmError");

      nameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      confirmError.textContent = "";

      let valid = true;

      if (name === "") {
        nameError.textContent = "Name is required";
        valid = false;
      }

      if (email === "") {
        emailError.textContent = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = "Invalid email format";
        valid = false;
      }

      if (password === "") {
        passwordError.textContent = "Password is required";
        valid = false;
      } else if (password.length < 6) {
        passwordError.textContent = "Minimum 6 characters required";
        valid = false;
      }

      if (confirmPassword === "") {
        confirmError.textContent = "Please confirm password";
        valid = false;
      } else if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match";
        valid = false;
      }

      if (valid) {
        alert("Signup Successful!");
        // connect backend here
      }
    });