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

/* =========================================================
   ACADEMY STUDENT REGISTRATION FORM
   ========================================================= */
(function initAcademyRegistration() {
    const form = document.getElementById("academySignupForm");
    if (!form) return;

    const passwordInput = document.getElementById("academyPassword");
    const confirmInput = document.getElementById("academyConfirmPassword");
    const matchIndicator = document.getElementById("academyPasswordMatchIndicator");
    const requirementsBox = document.getElementById("academyPasswordRequirements");
    const reqLetter = document.getElementById("academyReqLetter");
    const reqNumber = document.getElementById("academyReqNumber");
    const reqSymbol = document.getElementById("academyReqSymbol");
    const errorMsg = document.getElementById("academyErrorMessage");
    const submitBtn = document.getElementById("academySubmitBtn");
    const googleBtn = document.getElementById("academyGoogleSignIn");
    const phoneInput = document.getElementById("academyPhone");

    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
        });
    }

    const passwordPatterns = {
        letter: /[a-zA-Z]/,
        number: /\d/,
        symbol: /[!@#$%^&*(),.?":{}|<>]/
    };

    function updateRequirement(el, isMet) {
        if (!el) return;
        const ind = el.querySelector(".indicator");
        if (isMet) {
            if (ind) ind.style.backgroundColor = "#22c55e";
            el.style.color = "#16a34a";
        } else {
            if (ind) ind.style.backgroundColor = "#ef4444";
            el.style.color = "#dc2626";
        }
    }

    function checkPasswordRules() {
        const val = passwordInput ? passwordInput.value : "";
        if (val.length > 0) {
            if (requirementsBox) requirementsBox.style.display = "flex";
        } else {
            if (requirementsBox) requirementsBox.style.display = "none";
        }

        updateRequirement(reqLetter, passwordPatterns.letter.test(val));
        updateRequirement(reqNumber, passwordPatterns.number.test(val));
        updateRequirement(reqSymbol, passwordPatterns.symbol.test(val));
        checkMatch();
    }

    function checkMatch() {
        if (!confirmInput || !matchIndicator) return;
        const pass = passwordInput ? passwordInput.value : "";
        const conf = confirmInput.value;

        if (conf.length > 0) {
            matchIndicator.style.display = "inline-block";
            if (pass === conf && pass.length > 0) {
                matchIndicator.style.backgroundColor = "#22c55e";
                matchIndicator.title = "Passwords match";
            } else {
                matchIndicator.style.backgroundColor = "#ef4444";
                matchIndicator.title = "Passwords do not match";
            }
        } else {
            matchIndicator.style.display = "none";
        }
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", checkPasswordRules);
        passwordInput.addEventListener("focus", () => {
            if (passwordInput.value.length > 0 && requirementsBox) {
                requirementsBox.style.display = "flex";
            }
        });
    }

    if (confirmInput) {
        confirmInput.addEventListener("input", checkMatch);
    }

    // Firebase InPAT integration
    const branchId = "FCTSLM";
    const firebaseConfig = {
        apiKey: "AIzaSyCOQil7s7ZnxGEg7oI0Hn-SlfEX0ZGAxqI",
        authDomain: "ipatindia.firebaseapp.com",
        databaseURL: "https://ipatindia.firebaseio.com",
        projectId: "ipatindia",
        storageBucket: "ipatindia.appspot.com",
        messagingSenderId: "373161772873",
        appId: "1:373161772873:web:d9ad99461445d12998fc98",
        measurementId: "G-N3ENYCJBMW"
    };

    let firebaseAppPromise = null;
    function getFirebaseModules() {
        if (!firebaseAppPromise) {
            firebaseAppPromise = Promise.all([
                import("https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js"),
                import("https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js"),
                import("https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js")
            ]).then(([appMod, authMod, fsMod]) => {
                const app = appMod.initializeApp(firebaseConfig);
                const auth = authMod.getAuth(app);
                const db = fsMod.getFirestore(app);
                return { app, auth, db, authMod, fsMod };
            });
        }
        return firebaseAppPromise;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (errorMsg) errorMsg.textContent = "";

        // Check terms first via global TermsManager if available
        if (window.TermsManager && typeof window.TermsManager.validate === "function") {
            const termsValid = window.TermsManager.validate(form);
            if (!termsValid) return;
        }

        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim().toLowerCase();
        const password = form.password.value;
        const confirmPass = form.confirmPassword.value;

        if (!name || !phone || !email || !password) {
            if (errorMsg) errorMsg.textContent = "Please fill in all required fields.";
            return;
        }

        if (password !== confirmPass) {
            if (errorMsg) errorMsg.textContent = "Passwords do not match.";
            return;
        }

        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
        if (!passRegex.test(password)) {
            if (errorMsg) errorMsg.textContent = "Password must contain at least one letter, one number, and one symbol.";
            return;
        }

        const originalBtnText = submitBtn ? submitBtn.textContent : "Sign Up";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Creating Account...";
        }

        try {
            const { auth, db, authMod, fsMod } = await getFirebaseModules();
            const userCredential = await authMod.createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user profile in Firestore
            try {
                const userRef = fsMod.doc(db, "Users", email);
                await fsMod.setDoc(userRef, {
                    uid: user.uid,
                    displayName: name,
                    email: email,
                    phone: phone,
                    Name: name,
                    branch_id: branchId,
                    createdAt: fsMod.serverTimestamp()
                }, { merge: true });

                const branchRef = fsMod.doc(db, "Branches", branchId, "Users", email);
                await fsMod.setDoc(branchRef, {
                    email: email,
                    name: name,
                    phone: phone,
                    fees: 0,
                    status: "new",
                    userId: user.uid,
                    addedAt: fsMod.serverTimestamp()
                }, { merge: true });
            } catch (fsErr) {
                console.warn("[Academy] Firestore profile write:", fsErr);
            }

            if (typeof window.showNotification === "function") {
                window.showNotification("Student account created successfully! Redirecting...", "success");
            }

            setTimeout(() => {
                window.location.href = `https://inpatpro.com/student/login.html?branch=${branchId}`;
            }, 1200);

        } catch (err) {
            console.error("[Academy] Signup error:", err);
            let message = "An error occurred during registration. Please try again.";
            if (err && err.code === "auth/email-already-in-use") {
                message = "This email is already registered. Please login instead.";
            } else if (err && err.code === "auth/weak-password") {
                message = "Password is too weak. Please use a stronger password.";
            } else if (err && err.code === "auth/invalid-email") {
                message = "Invalid email address. Please check and try again.";
            } else if (err && err.message) {
                message = err.message;
            }
            if (errorMsg) errorMsg.textContent = message;
            if (typeof window.showNotification === "function") {
                window.showNotification(message, "error");
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    });

    if (googleBtn) {
        googleBtn.addEventListener("click", async () => {
            if (errorMsg) errorMsg.textContent = "";

            if (window.TermsManager && typeof window.TermsManager.validate === "function") {
                const termsValid = window.TermsManager.validate(form, true);
                if (!termsValid) return;
            }

            try {
                const { auth, db, authMod, fsMod } = await getFirebaseModules();
                const provider = new authMod.GoogleAuthProvider();
                const result = await authMod.signInWithPopup(auth, provider);
                const user = result.user;

                // Save user profile
                try {
                    const userRef = fsMod.doc(db, "Users", user.email);
                    await fsMod.setDoc(userRef, {
                        uid: user.uid,
                        displayName: user.displayName || "Student",
                        email: user.email,
                        phone: user.phoneNumber || "",
                        Name: user.displayName || "Student",
                        branch_id: branchId,
                        createdAt: fsMod.serverTimestamp()
                    }, { merge: true });
                } catch (_) {}

                if (typeof window.showNotification === "function") {
                    window.showNotification("Signed in successfully with Google! Redirecting...", "success");
                }

                setTimeout(() => {
                    window.location.href = `https://inpatpro.com/student/login.html?branch=${branchId}`;
                }, 1000);

            } catch (err) {
                console.error("[Academy] Google sign-in error:", err);
                if (err && err.code !== "auth/popup-closed-by-user") {
                    const msg = err.message || "Google sign-in was unsuccessful. Please try again.";
                    if (errorMsg) errorMsg.textContent = msg;
                }
            }
        });
    }
})();