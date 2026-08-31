(() => {
  const storageKey = "fatcat-theme";
  const body = document.body;

  /*
   * Keep the navigation identical on every page.  Pages in this site live at
   * different directory depths, so the existing links and logo path are read
   * first and then placed into the common home-page structure.  This avoids
   * hard-coding paths that would work on one page but fail on another.
   */
  const standardizeHeader = () => {
    const header = document.querySelector("header.navbar");
    const menu = header?.querySelector(".nav-menu");
    const logo = header?.querySelector(".logo img");
    const hamburger = header?.querySelector(".hamburger");

    // A page without the site header should continue to work normally.
    if (!header || !menu || !logo || !hamburger) return;

    const links = Array.from(menu.querySelectorAll("a"));
    const findLink = (label) => links.find((link) => link.textContent.trim().toLowerCase().startsWith(label.toLowerCase()));
    const href = (label, fallback = "#") => findLink(label)?.getAttribute("href") || fallback;
    const currentUrl = new URL(window.location.href);
    const isCurrent = (url) => {
      try {
        return new URL(url, currentUrl).pathname === currentUrl.pathname;
      } catch {
        return false;
      }
    };
    const active = (url) => isCurrent(url) ? " active" : "";

    const homeHref = href("Home");
    const aboutHref = href("About Us");
    const servicesHref = href("Services");
    const mutualFundHref = href("Mutual Fund");
    const stockBrokingHref = href("Stock Broking");
    const insuranceHref = href("Insurance");
    const loansHref = href("Loans");
    const academyHref = href("Academy");
    const businessHref = href("Business");
    const careerHref = href("Career");
    const contactHref = href("Contact Us");
    const loginHref = href("Login");
    const logoSrc = logo.getAttribute("src");
    const logoAlt = logo.getAttribute("alt") || "Fatcat Wealthy";

    header.innerHTML = `
      <div class="nav-container">
        <div class="logo"><img src="${logoSrc}" alt="${logoAlt}"></div>
        <nav class="nav-menu" id="navMenu" aria-label="Primary navigation">
          <a href="${homeHref}" class="${active(homeHref).trim()}">Home</a>
          <a href="${aboutHref}" class="${active(aboutHref).trim()}">About Us</a>
          <div class="dropdown">
            <a href="${servicesHref}" class="dropbtn${active(servicesHref)}" id="servicesLink">Services <span class="arrow" aria-hidden="true">▾</span></a>
            <div class="dropdown-content">
              <div class="submenu">
                <a href="#">Investment Broking <span aria-hidden="true">▸</span></a>
                <div class="submenu-content">
                  <a href="${mutualFundHref}">Mutual Fund</a>
                  <a href="${stockBrokingHref}">Stock Broking</a>
                </div>
              </div>
              <a href="${insuranceHref}">Insurance</a>
              <a href="${loansHref}">Loans</a>
            </div>
          </div>
          <a href="${academyHref}" class="${active(academyHref).trim()}">Academy</a>
          <a href="${businessHref}" class="${active(businessHref).trim()}">Business</a>
          <a href="${careerHref}" class="${active(careerHref).trim()}">Career</a>
          <a href="${contactHref}" class="contact-btn${active(contactHref)}">Contact Us</a>
          <a href="${loginHref}" class="login-btn${active(loginHref)}">Login</a>
        </nav>
        <button class="hamburger" id="hamburger" type="button" aria-label="Open navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  };

  const setupHeaderNavigation = () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const dropdown = navMenu?.querySelector(".dropdown");
    const servicesLink = navMenu?.querySelector("#servicesLink");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
      });
    }

    if (dropdown && servicesLink) {
      servicesLink.addEventListener("click", (event) => {
        if (window.innerWidth <= 900) {
          event.preventDefault();
          dropdown.classList.toggle("open");
        }
      });
    }
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    body.classList.toggle("dark-mode", isDark);
    document.documentElement.classList.toggle("dark-mode", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem(storageKey, isDark ? "dark" : "light");
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
      const icon = toggle.querySelector(".theme-toggle__icon");
      if (icon) {
        icon.classList.toggle("fa-sun", !isDark);
        icon.classList.toggle("fa-moon", isDark);
      }
    }
  };

  const addThemeToggle = () => {
    
    const menu = document.querySelector(".nav-menu");
    if (!menu || menu.querySelector(".theme-toggle")) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.innerHTML = '<i class="fa-solid fa-sun theme-toggle__icon" aria-hidden="true"></i>';
    toggle.addEventListener("click", () => applyTheme(body.classList.contains("dark-mode") ? "light" : "dark"));

    const login = Array.from(menu.querySelectorAll("a")).find((link) => /login/i.test(link.textContent));
    if (login) {
      const accountControls = document.createElement("div");
      accountControls.className = "nav-account-controls";
      login.insertAdjacentElement("beforebegin", accountControls);
      accountControls.append(login, toggle);
    } else {
      menu.appendChild(toggle);
    }

    if (!menu.querySelector(".nav-social-icons")) {
      const socialIcons = document.createElement("div");
      socialIcons.className = "nav-social-icons";
      socialIcons.innerHTML = `
        <a href="https://www.instagram.com/fatcatwealthy?igsh=bHYxa3h4ZG9qYTly" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://facebook.com/fatcatwealthy" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://wa.me/919566679958" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="https://www.facebook.com/people/Fatcatwealthy/61578165222375/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
      `;
      toggle.insertAdjacentElement("afterend", socialIcons);
    }
  };
  const standardizeFooter = () => {
    const footer = document.querySelector("footer.footer");
    if (!footer || footer.classList.contains("academy-footer")) return;

    footer.classList.add("standard-footer");
    footer.querySelectorAll(".footer-col h4").forEach((heading) => {
      const label = heading.textContent.trim();
      if (label === "What We Do") heading.textContent = "Our Services";
      if (label === "Company") heading.textContent = "Useful Links";
    });

    const bottom = footer.querySelector(".footer-bottom");
    if (bottom && !bottom.querySelector(".footer-legal")) {
      bottom.insertAdjacentHTML("beforeend", `
        <nav class="footer-legal" aria-label="Legal links">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-use">Terms of Use</a>
          <a href="#disclaimer">Disclaimer</a>
        </nav>
      `);
    }
  };

  const formatFooterContactDetails = () => {
    const address = "1st Floor, CPS Tower, Advaitha Ashram Rd, Fairlands - Salem, Chennai";

    document.querySelectorAll("footer.footer .contact-item span").forEach((detail) => {
      const text = detail.textContent.replace(/\s+/g, " ").trim();

      if (text === "support@fatcatwealthy.com") {
        detail.classList.add("contact-email");
      }

      if (text === address) {
        detail.classList.add("contact-address");
        detail.innerHTML = '<span class="address-line">1st Floor, CPS Tower, Advaitha Ashram Rd,</span><span class="address-line">Fairlands - Salem, Chennai</span>';
      }
    });
  };
  const style = document.createElement("style");
  style.textContent = `
    html { margin: 0; padding: 0; overscroll-behavior-y: none; scrollbar-width: thin; scrollbar-color: #94a3b8 transparent; }
    html::-webkit-scrollbar { width: 5px; height: 5px; }
    html::-webkit-scrollbar-track { background: transparent; }
    html::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
    html::-webkit-scrollbar-thumb:hover { background: #64748b; }
    html.dark-mode { scrollbar-color: #475569 transparent; }
    html.dark-mode::-webkit-scrollbar-track { background: transparent; }
    html.dark-mode::-webkit-scrollbar-thumb { background: #475569; }
    html.dark-mode::-webkit-scrollbar-thumb:hover { background: #64748b; }
    body { margin: 0; padding: 0 !important; overscroll-behavior-y: none; }
    footer:last-of-type { margin-bottom: 0 !important; }
    .nav-account-controls { display: inline-flex; align-items: center; gap: 8px; }
    .theme-toggle { position: relative; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; border: 1px solid rgba(255,255,255,.7); border-radius: 50%; background: #0f172a; color: #facc15; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; transition: background .2s ease, color .2s ease; }
    .theme-toggle:hover { outline: 2px solid #fbbf24; outline-offset: 2px; }
    .theme-toggle:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }
    .theme-toggle__icon { pointer-events: none; }

    /* =========================================================
       DARK MODE COMPREHENSIVE HIGH-CONTRAST STYLES
       ========================================================= */
    body.dark-mode { background: #080c14 !important; color: #e2e8f0 !important; }
    body.dark-mode main,
    body.dark-mode section:not(.hero):not(.hero-section):not(.cta-section) { background-color: #080c14 !important; }

    body.dark-mode .hero-video,
    body.dark-mode .cta-video { filter: brightness(0.7) contrast(1.05) !important; }
    body.dark-mode .hero-overlay { background-color: rgba(0, 0, 0, 0.55) !important; }
    body.dark-mode .hero-section,
    body.dark-mode .hero,
    body.dark-mode .cta-section,
    body.dark-mode main.login-main,
    body.dark-mode main.signup-main { background-color: transparent !important; }

    body.dark-mode :is(.login-box, .signup-box) {
      background: rgba(17, 24, 39, 0.95) !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
      backdrop-filter: blur(15px);
    }
    body.dark-mode :is(.login-box, .signup-box) :is(h2, h3) { color: #ffffff !important; }
    body.dark-mode :is(.login-box, .signup-box) p { color: #94a3b8 !important; }
    body.dark-mode :is(.login-box, .signup-box) label { color: #e2e8f0 !important; }

    /* --- Navbar & Navigation --- */
    body.dark-mode .navbar { background: #070b14 !important; border-bottom: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 20px rgba(0,0,0,.5); }
    body.dark-mode .nav-menu > a,
    body.dark-mode .dropbtn { color: #f1f5f9 !important; font-weight: 500; }
    body.dark-mode .nav-menu > a:hover,
    body.dark-mode .nav-menu > a.active,
    body.dark-mode .dropbtn:hover { color: #38bdf8 !important; }

    body.dark-mode .contact-btn,
    body.dark-mode .nav-menu .contact-btn {
      background: rgba(39, 174, 185, 0.15) !important;
      border: 1.5px solid #27aeb9 !important;
      color: #ffffff !important;
      font-weight: 600 !important;
    }
    body.dark-mode .contact-btn:hover,
    body.dark-mode .nav-menu .contact-btn:hover {
      background: #27aeb9 !important;
      color: #ffffff !important;
    }

    body.dark-mode .login-btn,
    body.dark-mode .nav-menu .login-btn,
    body.dark-mode .mobile-login-btn,
    body.dark-mode .drawer-login-btn {
      background: #2563eb !important;
      color: #ffffff !important;
      font-weight: 600 !important;
      border: 1.5px solid #3b82f6 !important;
    }
    body.dark-mode .login-btn:hover,
    body.dark-mode .nav-menu .login-btn:hover,
    body.dark-mode .mobile-login-btn:hover,
    body.dark-mode .drawer-login-btn:hover {
      background: #1d4ed8 !important;
      color: #ffffff !important;
    }

    body.dark-mode .dropdown-content,
    body.dark-mode .submenu-content { background: #111827 !important; border: 1px solid #334155 !important; box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important; }
    body.dark-mode .dropdown-view-all { background: #0f172a !important; color: #38bdf8 !important; border-bottom: 1px solid #1e293b !important; }
    body.dark-mode .dropdown-view-all:hover { background: #1e293b !important; color: #60a5fa !important; }
    body.dark-mode .dropdown-content a,
    body.dark-mode .submenu-content a { color: #e2e8f0 !important; }
    body.dark-mode .dropdown-content a:hover,
    body.dark-mode .submenu-content a:hover { background: #1e293b !important; color: #38bdf8 !important; }
    body.dark-mode .theme-toggle { background: #1e293b; color: #e2e8f0; border-color: #475569; }

    @media (max-width: 900px) { body.dark-mode .nav-menu { background: #070b14 !important; } }

    /* --- Mobile Drawer --- */
    body.dark-mode .mobile-drawer { background: #0b0f19 !important; color: #f8fafc !important; border-left: 1px solid #1e293b !important; }
    body.dark-mode .drawer-header { border-bottom: 1px solid #1e293b !important; }
    body.dark-mode .drawer-close { color: #ffffff !important; }
    body.dark-mode .drawer-link,
    body.dark-mode .drawer-sub-link,
    body.dark-mode .drawer-sub2-link { color: #e2e8f0 !important; }
    body.dark-mode .drawer-link:hover,
    body.dark-mode .drawer-sub-link:hover,
    body.dark-mode .drawer-sub2-link:hover { color: #38bdf8 !important; background: rgba(56, 189, 248, 0.1) !important; }
    body.dark-mode .drawer-sub-panel,
    body.dark-mode .drawer-sub2-panel { background: #070a10 !important; border-left: 2px solid #334155 !important; }
    body.dark-mode .drawer-footer { border-top: 1px solid #1e293b !important; background: #070a10 !important; }
    body.dark-mode .drawer-theme-label { color: #e2e8f0 !important; }

    /* --- Typography: High Contrast & Crystal Clear --- */
    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode h5,
    body.dark-mode h6,
    body.dark-mode strong,
    body.dark-mode b,
    body.dark-mode .hero-content h1,
    body.dark-mode .section-title,
    body.dark-mode .title { color: #ffffff !important; font-weight: 700 !important; }

    body.dark-mode p,
    body.dark-mode li,
    body.dark-mode dt,
    body.dark-mode dd,
    body.dark-mode label,
    body.dark-mode .hero-content p { color: #cbd5e1 !important; }

    body.dark-mode small,
    body.dark-mode .meta,
    body.dark-mode .date,
    body.dark-mode .sub-title { color: #94a3b8 !important; }

    /* --- Cards, Boxes, Panels & Sections --- */
    body.dark-mode :is(form, [class*="card"], [class*="Card"], [class*="box"], [class*="Box"], [class*="tile"], [class*="Tile"], [class*="panel"], [class*="Panel"], .feature-item, .why-item, .job-details, .job-list, .stat-card, .service-card, .about-intro-inner, .job-filter-container, .brand-section, .about-section, .contact-section) {
      background-color: #111827 !important;
      border-color: #1e293b !important;
      color: #cbd5e1 !important;
    }
    body.dark-mode .contact-section { background: #070a12 !important; }
    body.dark-mode .learn-section { background: #0c1524 !important; }
    body.dark-mode .brand-section { background: #070a12 !important; }
    body.dark-mode .marquee { background-color: #111827 !important; border-color: #1e293b !important; }

    /* --- Buttons --- */
    body.dark-mode .hero-btn,
    body.dark-mode .btn-send,
    body.dark-mode button[type="submit"],
    body.dark-mode .cta-btn,
    body.dark-mode .work-btn,
    body.dark-mode .apply-btn,
    body.dark-mode .calculate-btn,
    body.dark-mode .learn-btn.active {
      background: #2563eb !important;
      color: #ffffff !important;
      border: 1px solid #3b82f6 !important;
      font-weight: 600 !important;
    }
    body.dark-mode .hero-btn:hover,
    body.dark-mode .btn-send:hover,
    body.dark-mode button[type="submit"]:hover,
    body.dark-mode .cta-btn:hover,
    body.dark-mode .work-btn:hover,
    body.dark-mode .apply-btn:hover {
      background: #1d4ed8 !important;
      color: #ffffff !important;
    }

    body.dark-mode .btn-cancel,
    body.dark-mode .form-cancel-btn,
    body.dark-mode button[type="reset"] {
      background: #334155 !important;
      color: #f8fafc !important;
      border: 1px solid #475569 !important;
      font-weight: 500 !important;
    }

    body.dark-mode .back-btn {
      background: #1e293b !important;
      border: 1px solid #334155 !important;
      color: #f1f5f9 !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
    }
    body.dark-mode .back-btn:hover {
      background: #2563eb !important;
      border-color: #3b82f6 !important;
      color: #ffffff !important;
    }
    body.dark-mode .btn-cancel:hover,
    body.dark-mode .form-cancel-btn:hover,
    body.dark-mode button[type="reset"]:hover {
      background: #475569 !important;
      color: #ffffff !important;
    }

    /* --- Form Inputs --- */
    body.dark-mode input,
    body.dark-mode textarea,
    body.dark-mode select {
      background: #1e293b !important;
      color: #ffffff !important;
      border: 1px solid #334155 !important;
    }
    body.dark-mode input::placeholder,
    body.dark-mode textarea::placeholder {
      color: #64748b !important;
    }
    body.dark-mode input:focus,
    body.dark-mode textarea:focus,
    body.dark-mode select:focus {
      border-color: #38bdf8 !important;
      outline: none !important;
    }
    body.dark-mode select option,
    body.dark-mode select optgroup {
      background: #111827;
      color: #f8fafc;
    }

    /* --- Enquiry Modal --- */
    body.dark-mode .modal-content {
      background: #111827 !important;
      border: 1px solid #334155 !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7) !important;
      color: #ffffff !important;
    }
    body.dark-mode .modal-content h2 { color: #ffffff !important; font-weight: 700 !important; }
    body.dark-mode .modal-content label { color: #cbd5e1 !important; font-weight: 500 !important; }
    body.dark-mode .modal-content .close-btn {
      background: #334155 !important;
      color: #ffffff !important;
    }
    body.dark-mode .modal-content .close-btn:hover {
      background: #ef4444 !important;
    }

    /* --- Footer --- */
    body.dark-mode footer.footer {
      background: #070b14 !important;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    body.dark-mode footer.footer h4,
    body.dark-mode footer.footer h3 {
      color: #ffffff !important;
      font-weight: 600 !important;
    }
    body.dark-mode footer.footer a,
    body.dark-mode footer.footer span,
    body.dark-mode footer.footer p,
    body.dark-mode footer.footer li {
      color: #cbd5e1 !important;
    }
    body.dark-mode footer.footer a:hover {
      color: #38bdf8 !important;
    }
    body.dark-mode .footer-social-icons a {
      background: #111827 !important;
      border: 1px solid #1e293b !important;
      color: #38bdf8 !important;
    }
    body.dark-mode .footer-social-icons a:hover {
      background: #2563eb !important;
      color: #ffffff !important;
      border-color: #3b82f6 !important;
    }
    body.dark-mode .footer-bottom {
      border-top: 1px solid #1e293b !important;
      color: #94a3b8 !important;
    }

    /* --- Social Icons --- */
    .nav-social-icons { display: inline-flex; align-items: center; gap: 10px; margin-left: 4px; }
    .nav-social-icons a { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; color: #0b1b66; text-decoration: none; background: #ffffff; transition: transform .2s ease, background-color .2s ease, color .2s ease; }
    .nav-social-icons a:hover { transform: translateY(-2px); background-color: #087f9b; color: #ffffff; }
    @media (max-width: 900px) { .nav-social-icons { margin-top: 10px; } }
  `;
  document.head.appendChild(style);

  standardizeHeader();
  setupHeaderNavigation();

  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  addThemeToggle();
  formatFooterContactDetails();
  standardizeFooter();
  applyTheme(preferredTheme);
  document.documentElement.classList.add("site-chrome-ready");
})();





