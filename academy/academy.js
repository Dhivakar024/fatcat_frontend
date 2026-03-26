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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  observer.observe(el);
});


function scrollToCourses() {
  const section = document.querySelector(".courses");

  section.scrollIntoView({
    behavior: "smooth"
  });
}

// const nismGrid = document.querySelector(".nism-course-grid");

// const totalCards = 21;

// const courseData = [
//   "SEBI Investor Certification",
//   "NISM Series I: Currency Derivatives Certification Examination",
//   "NISM Series-III-A: Securities Intermediaries Compliance (Non-Fund) Certification Examination",
//   "NISM Series V A: Mutual Fund Distributors Certification Examination",
//   "NISM-Series-V-B: Mutual Fund Foundation Certification Examination",
//   "NISM Series VI: Depository Operations Certification Examination",
//   "NISM Series VII: Securities Operations and Risk Management Certification Examination",
//   "NISM-Series-VIII: Equity Derivatives Certification Examination",
//   "NISM-Series-X-A: Investment Adviser (Level 1) Certification Examination",
//   "NISM-Series-X-B: Investment Adviser (Level 2) Certification Examination",
//   "NISM-Series-X-C: Investment Adviser Certification (Renewal) Examination",
//   "NISM-Series-XII: Securities Markets Foundation Certification Examination",
//   "NISM-Series-XIII: Common Derivatives Certification Examination",
//   "NISM-Series-XV: Research Analyst Certification Examination",
//   "NISM Series XV-B: Research Analyst Certification (Renewal) Examination",
//   "NISM-Series-XVI: Commodity Derivatives Certification Examination",
//   "NISM-Series-XVII: Retirement Adviser Certification Examination",
//   "NISM Series XIX-A: Alternative Investment Funds (Category I and II) Distributors Certification Examination",
//   "NISM-Series-XIX-B: Alternative Investment Funds (Category III) Distributors Certification Examination",
//   "NISM-Series-XIX-C: Alternative Investment Fund Managers Certification Examination",
//   "NISM Series XXI-A: Portfolio Management Services (PMS) Distributors Certification Examination"
// ];

// for (let i = 0; i < totalCards; i++) {
//   const title = courseData[i] || `Certification Course ${i + 1}`;

//   nismGrid.innerHTML += `
//     <div class="course-card">
//       <div class="card-image">
//         <img src="https://picsum.photos/400/300?random=${i + 100}" />
//         <div class="badge"><span>🎓 Professional Course</span></div>
//       </div>

//       <div class="card-body">
//         <h3>${title}</h3>
//         <p>Comprehensive certification program covering financial markets and regulations.</p>

//         <h4>Software & Tools:</h4>
//         <p class="tools">Finance & Compliance</p>

//         <div class="card-footer">
//           <span class="duration">⏱ Self-paced</span>
//           <a href="course-details.html" class="learn-btn">Learn More →</a>
//         </div>
//       </div>
//     </div>
//   `;
// }


const animatedElements = document.querySelectorAll(".scroll-animate");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    animatedElements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll); // VERY IMPORTANT