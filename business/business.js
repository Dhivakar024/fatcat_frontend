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

const scrollElements = document.querySelectorAll(".scroll-animate");

const elementInView = (el, offset = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= window.innerHeight - offset;
};

const displayScrollElement = (element) => {
  element.classList.add("active");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      displayScrollElement(el);
    }
  });
};

window.addEventListener("scroll", () => {
  handleScrollAnimation();
});

// -------- Advanced UI Enhancements --------

// Counters (animate when visible)
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target || 0;
        let start = 0;
        const duration = 1200;
        const stepTime = Math.max(8, Math.floor(duration / Math.max(target, 1)));
        const increment = Math.max(1, Math.floor(target / (duration / stepTime)));
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = start;
        }, stepTime);
        obs.unobserve(el);
      }
    });
  }, {threshold: 0.6});
  counters.forEach(c => counterObserver.observe(c));
}

// Tilt effect on brand images
document.querySelectorAll('.brand-image').forEach(container => {
  const img = container.querySelector('img');
  if (!img) return;
  img.classList.add('tilt');
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = (-y * 8).toFixed(2);
    const rotY = (x * 8).toFixed(2);
    img.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });
  container.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});

// Lazy load brand images for performance
document.querySelectorAll('.brand-image img').forEach(img => {
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
});

// Modal: open/close and populate
const modalBackdrop = document.getElementById('brandModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

const brandDetails = {
  lax360: {
    title: 'LAX 360 Pvt Ltd',
    body: 'LAX 360 delivers modern web & mobile applications, cloud solutions and multimedia services including end-to-end product engineering.'
  },
  cadpoint: {
    title: 'CadPoint',
    body: 'CadPoint focuses on advanced CAD & MEP solutions, AI-assisted design workflows, and project-based training for engineers and designers.'
  },
  inpat: {
    title: 'InPAT pro',
    body: 'InPAT Pro provides practical accounting and taxation training, certification programs, and partnered institute deployment support.'
  }
};

document.querySelectorAll('.open-details').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const key = btn.dataset.brand;
    const info = brandDetails[key] || {title: 'Details', body: 'More information coming soon.'};
    modalTitle.textContent = info.title;
    modalBody.textContent = info.body;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
  });
});

function closeModal(){
  if(!modalBackdrop) return;
  modalBackdrop.classList.remove('open');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

if(modalClose) modalClose.addEventListener('click', closeModal);
if(modalBackdrop) modalBackdrop.addEventListener('click', (e) => { if(e.target === modalBackdrop) closeModal(); });

// Hero parallax on mouse move
const hero = document.querySelector('.business-hero');
const heroContent = document.querySelector('.business-hero .hero-content');
if(hero && heroContent){
  hero.setAttribute('data-parallax','true');
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    heroContent.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
  });
  hero.addEventListener('mouseleave', () => { heroContent.style.transform = ''; });
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label','Back to top');
document.body.appendChild(backToTop);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToTop(){
  if(prefersReduced){ window.scrollTo(0,0); return; }
  if('scrollBehavior' in document.documentElement.style){
    window.scrollTo({top:0,behavior:'smooth'});
  } else {
    let pos = window.scrollY; const step = () => { pos = Math.max(0, pos - 80); window.scrollTo(0,pos); if(pos>0) requestAnimationFrame(step);}; step();
  }
}

backToTop.addEventListener('click', scrollToTop);

window.addEventListener('scroll', () => {
  if(window.scrollY > 400) backToTop.classList.add('visible'); else backToTop.classList.remove('visible');
});

// Improve keyboard accessibility: allow Esc to close modal and focus trap basics
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});
