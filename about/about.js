/* NAVBAR TOGGLE */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", (e) => {
  if (window.innerWidth <= 900) {
    e.preventDefault();
    dropdown.classList.toggle("open");
  }
});


/* SCROLL REVEAL — replaces the old scroll-listener approach with
   an IntersectionObserver so animations only fire once per element
   and don't run on every scroll tick. */

const revealTargets = document.querySelectorAll(
  ".reveal, .reveal-up, .reveal-left, .reveal-right"
);

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px"
  });

  revealTargets.forEach((el) => revealObserver.observe(el));

} else {
  // fallback for older browsers
  revealTargets.forEach((el) => el.classList.add("active"));
}


/* STAT COUNT-UP — animates the numbers in the stats strip once
   it scrolls into view. Reads the target value straight from the
   markup so copy stays editable in the HTML. */

const statNumbers = document.querySelectorAll(".stat-num");

function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/(\d+)/);
  if (!match) return; // nothing numeric to animate (e.g. plain text)

  const target = parseInt(match[1], 10);
  const suffix = raw.replace(match[1], "");
  const duration = 1000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window && statNumbers.length) {

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => statObserver.observe(el));
}


/* SCROLL PROGRESS BAR */

const progressBar = document.querySelector(".scroll-progress");

function updateProgress() {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();


/* HERO CURSOR SPOTLIGHT */

const heroSection = document.getElementById("hero");
const heroSpotlight = document.querySelector(".hero-spotlight");

if (heroSection && heroSpotlight && window.matchMedia("(pointer: fine)").matches) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroSection.style.setProperty("--mx", x + "%");
    heroSection.style.setProperty("--my", y + "%");
  });
}


/* MAGNETIC BUTTONS — nudge toward the cursor within a small range */

const magneticEls = document.querySelectorAll(".magnetic");

if (window.matchMedia("(pointer: fine)").matches) {
  magneticEls.forEach((el) => {
    const strength = 14;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });
}


/* 3D TILT — subtle perspective tilt on feature cards + who-image */

const tiltEls = document.querySelectorAll(".tilt-target");

if (window.matchMedia("(pointer: fine)").matches) {
  tiltEls.forEach((el) => {
    const maxTilt = 6;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * maxTilt}deg) rotateX(${-py * maxTilt}deg) translateY(-6px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}


/* STAGGERED REVEAL — give each card/item in a group an increasing
   CSS delay so they cascade in one after another rather than all
   fading in at once. */

function applyStagger(selector) {
  document.querySelectorAll(selector).forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty("--stagger", i);
    });
  });
}

applyStagger(".features-container");
applyStagger(".why-content");