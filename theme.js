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
    html { margin: 0; padding: 0; overscroll-behavior-y: none; scrollbar-width: thin; scrollbar-color: #64748b #f1f5f9; }
    html::-webkit-scrollbar { width: 8px; }
    html::-webkit-scrollbar-track { background: #f1f5f9; }
    html::-webkit-scrollbar-thumb { background: #64748b; border: 2px solid #f1f5f9; border-radius: 8px; }
    html::-webkit-scrollbar-thumb:hover { background: #475569; }
    html.dark-mode { scrollbar-color: #94a3b8 #111827; }
    html.dark-mode::-webkit-scrollbar-track { background: #111827; }
    html.dark-mode::-webkit-scrollbar-thumb { background: #64748b; border-color: #111827; }
    html.dark-mode::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    body { margin: 0; padding: 0 !important; overscroll-behavior-y: none; }
    footer:last-of-type { margin-bottom: 0 !important; }
    .nav-account-controls { display: inline-flex; align-items: center; gap: 8px; }
    .theme-toggle { position: relative; width: 58px; height: 30px; flex: 0 0 58px; padding: 0; border: 1px solid rgba(255,255,255,.7); border-radius: 999px; background: #0f172a; color: #fff; cursor: pointer; overflow: hidden; }
    .theme-toggle:hover { outline: 2px solid #fbbf24; outline-offset: 2px; }
    .theme-toggle:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }
    .theme-toggle__sun, .theme-toggle__moon { position: absolute; top: 50%; transform: translateY(-50%); z-index: 1; font-size: 13px; line-height: 1; }
    .theme-toggle { position: relative; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; border: 1px solid rgba(255,255,255,.7); border-radius: 50%; background: #0f172a; color: #facc15; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; transition: background .2s ease, color .2s ease; }
    .theme-toggle:hover { outline: 2px solid #fbbf24; outline-offset: 2px; }
    .theme-toggle:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }
    .theme-toggle__icon { pointer-events: none; }
    body.dark-mode { background: #000 !important; }
    body.dark-mode .hero-video,
    body.dark-mode .cta-video { filter: brightness(0.7) contrast(1.05) !important; }
    body.dark-mode .hero-overlay { background-color: rgba(0, 0, 0, 0.5) !important; }
    body.dark-mode .navbar { background: #050505 !important; box-shadow: 0 2px 12px rgba(0,0,0,.35); }
    body.dark-mode .nav-menu, body.dark-mode .nav-menu a, body.dark-mode .dropbtn { color: #fff !important; }
    body.dark-mode .nav-menu a:hover, body.dark-mode .dropbtn:hover { color: #facc15 !important; }
    body.dark-mode .nav-menu .contact-btn { color: #fff !important; }
    body.dark-mode .nav-menu .contact-btn:hover { color: #facc15 !important; }
    body.dark-mode .nav-menu .login-btn { background: #2563eb !important; color: #fff !important; }
    body.dark-mode .nav-menu .login-btn:hover { background: #1d4ed8 !important; }

    body.dark-mode .dropdown-content, body.dark-mode .submenu-content { background: #111827 !important; border: 1px solid #475569; }
    body.dark-mode .dropdown-content a, body.dark-mode .submenu-content a { color: #f8fafc !important; }
    body.dark-mode .dropdown-content a:hover, body.dark-mode .submenu-content a:hover { background: #1e293b !important; color: #facc15 !important; }
    body.dark-mode .theme-toggle { background: #1e293b; color: #e2e8f0; border-color: #475569; }
    @media (max-width: 900px) { body.dark-mode .nav-menu { background: #050505 !important; } }

    /* Page surfaces and content: keep readable contrast across every page type. */
    body.dark-mode main, body.dark-mode section { background-color: #000 !important; }
    body.dark-mode .hero-section,
    body.dark-mode .hero,
    body.dark-mode .cta-section { background-color: transparent !important; }
    body.dark-mode :is(main, section, .container) :is(h1, h2, h3, h4, h5, h6, p, li, label, span, small, strong, em, a) { color: #f8fafc !important; }
    body.dark-mode :is(main, section, .container) :is(form, [class*="card"], [class*="Card"], [class*="box"], [class*="Box"], [class*="tile"], [class*="Tile"], [class*="panel"], [class*="Panel"]) { background-color: #111827 !important; border-color: #334155 !important; }
    body.dark-mode :is(main, section, .container) :is(form, [class*="card"], [class*="Card"], [class*="box"], [class*="Box"], [class*="tile"], [class*="Tile"], [class*="panel"], [class*="Panel"]) :is(h1, h2, h3, h4, h5, h6, p, li, label, span, small, strong, em, a) { color: #f8fafc !important; }
    body.dark-mode :is(main, section, .container) :is(input, textarea, select) { background: #f8fafc !important; color: #111827 !important; border-color: #64748b !important; }
    body.dark-mode :is(main, section, .container) :is(input, textarea)::placeholder { color: #475569 !important; }
    body.dark-mode select option,
    body.dark-mode select optgroup { background: #111827; color: #f8fafc; }
    body.dark-mode :is(.badge, .tag, .chip) { color: #fff !important; }

    /* About and Careers include light panels whose class names are not generic cards. */
    body.dark-mode .marquee,
    body.dark-mode .about-intro-inner,
    body.dark-mode .feature-item,
    body.dark-mode .why-item,
    body.dark-mode .job-filter-container,
    body.dark-mode .job-details,
    body.dark-mode .job-list { background-color: #111827 !important; border-color: #334155 !important; }
    body.dark-mode .marquee :is(span, a),
    body.dark-mode .about-intro-inner :is(h1, h2, h3, h4, p, span, a),
    body.dark-mode .feature-item :is(h1, h2, h3, h4, p, span, a),
    body.dark-mode .why-item :is(h1, h2, h3, h4, p, span, a),
    body.dark-mode .job-filter-container :is(h1, h2, h3, h4, p, span, label, a),
    body.dark-mode .job-details :is(h1, h2, h3, h4, p, li, span, small, strong, a),
    body.dark-mode .job-list :is(h1, h2, h3, h4, p, li, span, small, strong, a) { color: #f8fafc !important; }

    /* Service cards and navigation submenus remain legible on the dark surface. */
    body.dark-mode .service-card,
    body.dark-mode .stat-card,
    body.dark-mode .why-item { background-color: #111827 !important; border-color: #334155 !important; }
    body.dark-mode .service-card :is(h1, h2, h3, h4, p, li, span, a),
    body.dark-mode .stat-card :is(h1, h2, h3, h4, p, li, span, a),
    body.dark-mode .consult-text :is(h1, h2, h3, h4, p, li, span, a),
    body.dark-mode .why-item :is(h1, h2, h3, h4, p, li, span, a) { color: #f8fafc !important; }
    body.dark-mode .dropdown-content,
    body.dark-mode .submenu-content { background: #111827 !important; }
    body.dark-mode .dropdown-content a,
    body.dark-mode .submenu-content a { color: #f8fafc !important; opacity: 1; }

    /* to the social media icons */
    .nav-social-icons { display: inline-flex; align-items: center; gap: 10px; margin-left: 4px; }
    .nav-social-icons a { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 8px; color: #fff; text-decoration: none; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); transition: transform .2s ease, background .2s ease; }
    .nav-social-icons a:hover { transform: translateY(-2px); background: rgba(255,255,255,0.18); }
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





