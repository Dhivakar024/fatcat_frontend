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

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value.trim();

      let emailError = document.getElementById("emailError");
      let passwordError = document.getElementById("passwordError");

      emailError.textContent = "";
      passwordError.textContent = "";

      let valid = true;

      // Email validation
      if (email === "") {
        emailError.textContent = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError.textContent = "Invalid email format";
        valid = false;
      }

      // Password validation
      if (password === "") {
        passwordError.textContent = "Password is required";
        valid = false;
      } else if (password.length < 6) {
        passwordError.textContent = "Minimum 6 characters required";
        valid = false;
      }

      if (valid) {
        alert("Login Successful!");
        // You can connect backend here
      }
    });