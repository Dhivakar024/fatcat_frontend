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
    // Disabled to preserve shared header.html & mobile drawer structure
    return;
  };

  const setupHeaderNavigation = () => {
    // Disabled to preserve shared header.js navigation
    return;
  };

  const applyTheme = (theme, persist = false) => {
    const isDark = theme === "dark";
    const currentBody = document.body || body;
    if (currentBody) {
      currentBody.classList.toggle("dark-mode", isDark);
    }
    document.documentElement.classList.toggle("dark-mode", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    if (persist) {
      localStorage.setItem(storageKey, isDark ? "dark" : "light");
    }

    const toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(toggle => {
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
      const icon = toggle.querySelector(".theme-toggle__icon");
      if (icon) {
        icon.classList.toggle("fa-sun", !isDark);
        icon.classList.toggle("fa-moon", isDark);
      }
    });

    const drawerToggle = document.getElementById("drawerThemeToggle");
    if (drawerToggle) {
      drawerToggle.checked = isDark;
    }
    const drawerHeaderBtn = document.getElementById("drawerHeaderThemeBtn");
    if (drawerHeaderBtn) {
      drawerHeaderBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
    const drawerLabel = document.querySelector(".drawer-theme-label");
    if (drawerLabel) {
      drawerLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
    }
    const drawerIcon = document.querySelector(".drawer-theme-icon");
    if (drawerIcon) {
      drawerIcon.className = `fa-solid ${isDark ? "fa-moon" : "fa-sun"} drawer-theme-icon`;
      drawerIcon.style.color = isDark ? "#ffd700" : "#f5a623";
    }
  };

  window.applyTheme = applyTheme;

  const addThemeToggle = () => {
    
    const menu = document.querySelector(".nav-menu");
    if (!menu || menu.querySelector(".theme-toggle")) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "theme-toggle";
    toggle.innerHTML = '<i class="fa-solid fa-sun theme-toggle__icon" aria-hidden="true"></i>';
    toggle.addEventListener("click", () => {
      const currentBody = document.body || body;
      const isDarkNow = currentBody ? currentBody.classList.contains("dark-mode") : false;
      applyTheme(isDarkNow ? "light" : "dark", true);
    });

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
      const isCalc = window.location.pathname.replace(/\\/g, "/").includes("/calculators/");
      const privPath = isCalc ? "../../privacy-center/index.html" : "../privacy-center/index.html";
      bottom.insertAdjacentHTML("beforeend", `
        <nav class="footer-legal" aria-label="Legal links">
          <a href="${privPath}">Privacy Centre</a>
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-use">Terms of Use</a>
          <a href="#disclaimer">Disclaimer</a>
        </nav>
      `);
    }
  };

  const formatFooterContactDetails = () => {
    const address = "1st Floor, CPS Tower, Advaitha Ashram Rd, Fairlands - Salem, Chennai";

    document.querySelectorAll("footer.footer .contact-item span, footer.footer .contact-item a").forEach((detail) => {
      const text = detail.textContent.replace(/\s+/g, " ").trim();

      if (text === "fatcatwealthy@gmail.com") {
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
    :root { color-scheme: light; }
    html.dark-mode, body.dark-mode { color-scheme: dark; }
    html { margin: 0; padding: 0; scrollbar-width: thin; scrollbar-color: #94a3b8 transparent; }
    html::-webkit-scrollbar { width: 5px; height: 5px; }
    html::-webkit-scrollbar-track { background: transparent; }
    html::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
    html::-webkit-scrollbar-thumb:hover { background: #64748b; }
    html.dark-mode { scrollbar-color: #475569 transparent; }
    html.dark-mode::-webkit-scrollbar-track { background: transparent; }
    html.dark-mode::-webkit-scrollbar-thumb { background: #475569; }
    html.dark-mode::-webkit-scrollbar-thumb:hover { background: #64748b; }
    body { margin: 0; padding: 0 !important; }
    footer:last-of-type { margin-bottom: 0 !important; }
    .nav-account-controls { display: inline-flex; align-items: center; gap: 8px; }
    .theme-toggle { position: relative; width: 38px; height: 38px; flex: 0 0 38px; padding: 0; border: 1px solid rgba(255,255,255,.7); border-radius: 50%; background: #0f172a; color: #facc15; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; transition: background .2s ease, color .2s ease; }
    .theme-toggle:hover { outline: 2px solid #fbbf24; outline-offset: 2px; }
    .theme-toggle:focus-visible { outline: 3px solid #fbbf24; outline-offset: 3px; }
    .theme-toggle__icon { pointer-events: none; }

    /* Universal Background Video Alignment Fix across all Screen Sizes */
    .hero-video,
    .bg-video,
    .business-video,
    .hero-bg-video,
    .insurance-hero-video,
    .mf-hero-video,
    video[class*="video"] {
      object-fit: cover !important;
      object-position: center center !important;
      min-width: 100% !important;
      min-height: 100% !important;
      transform: translateZ(0);
    }

    /* =========================================================
       DARK MODE COMPREHENSIVE HIGH-CONTRAST & ULTRA-READABLE TYPOGRAPHY
       ========================================================= */
    body.dark-mode { background: #080c14 !important; color: #f8fafc !important; }
    body.dark-mode main:not(.login-main):not(.signup-main) { background-color: #080c14 !important; }
    body.dark-mode section:not(.hero):not(.hero-section):not(.cta-section):not(.stock-hero):not(.mf-hero):not(.insurance-hero):not(.career-hero):not(.services-hero):not(.consultancy):not(.business-hero) { background-color: #080c14 !important; }

    /* Preserve Full Background Video & Image Clarity in Dark Mode */
    body.dark-mode video,
    body.dark-mode .hero-video,
    body.dark-mode .cta-video,
    body.dark-mode .bg-video,
    body.dark-mode .business-video,
    body.dark-mode .insurance-hero-video,
    body.dark-mode .mf-hero-video,
    body.dark-mode .hero-bg-video,
    body.dark-mode .admin-login-bg-video {
      filter: none !important;
      opacity: 1 !important;
    }
    body.dark-mode .hero-overlay { background-color: rgba(8, 12, 20, 0.40) !important; }
    body.dark-mode :is(.stock-hero, .career-hero, .services-hero, .consultancy, .business-hero, .hero, .hero-section, .cta-section, .mf-hero, .insurance-hero, .loans-hero, .bg-video-container, main.login-main, main.signup-main) {
      background-color: transparent !important;
    }

    body.dark-mode :is(.login-box, .signup-box) {
      background: rgba(17, 24, 39, 0.95) !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6) !important;
      backdrop-filter: blur(15px);
    }
    body.dark-mode :is(.login-box, .signup-box) :is(h2, h3) { color: #ffffff !important; }
    body.dark-mode :is(.login-box, .signup-box) p { color: #e2e8f0 !important; }
    body.dark-mode :is(.login-box, .signup-box) label { color: #ffffff !important; }

    /* --- Navbar & Navigation --- */
    body.dark-mode .navbar { background: #070b14 !important; border-bottom: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 20px rgba(0,0,0,.5); }
    body.dark-mode .nav-menu > a,
    body.dark-mode .dropbtn { color: #ffffff !important; font-weight: 500; }
    body.dark-mode .nav-menu > a:hover,
    body.dark-mode .nav-menu > a.active,
    body.dark-mode .dropbtn:hover { color: #38bdf8 !important; }

    body.dark-mode .contact-btn,
    body.dark-mode .nav-menu .contact-btn {
      background: rgba(39, 174, 185, 0.25) !important;
      border: 1.5px solid #38bdf8 !important;
      color: #ffffff !important;
      font-weight: 600 !important;
    }
    body.dark-mode .contact-btn:hover,
    body.dark-mode .nav-menu .contact-btn:hover {
      background: #087f9b !important;
      border-color: #087f9b !important;
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
    body.dark-mode .submenu-content a { color: #f8fafc !important; }
    body.dark-mode .dropdown-content a:hover,
    body.dark-mode .submenu-content a:hover { background: #1e293b !important; color: #38bdf8 !important; }
    body.dark-mode .theme-toggle { background: #1e293b; color: #ffd700; border-color: #475569; }

    @media (max-width: 900px) { body.dark-mode .nav-menu { background: #070b14 !important; } }

    /* --- Mobile Drawer --- */
    body.dark-mode .mobile-drawer { background: #0b0f19 !important; color: #ffffff !important; border-left: 1px solid #1e293b !important; }
    body.dark-mode .drawer-header { border-bottom: 1px solid #1e293b !important; }
    body.dark-mode .drawer-logo { background: #ffffff !important; padding: 5px 12px !important; border-radius: 10px !important; display: inline-flex !important; align-items: center !important; }
    body.dark-mode .drawer-logo img { width: 110px !important; height: auto !important; display: block !important; }
    body.dark-mode .drawer-close { color: #ffffff !important; }
    body.dark-mode .drawer-close:hover { background: #1e293b !important; }
    body.dark-mode .drawer-link,
    body.dark-mode .drawer-toggle-row,
    body.dark-mode .drawer-toggle-row2,
    body.dark-mode .drawer-sub-link,
    body.dark-mode .drawer-sub2-link { color: #f8fafc !important; border-bottom: 1px solid #1e293b !important; }
    body.dark-mode .drawer-link:hover,
    body.dark-mode .drawer-toggle-row:hover,
    body.dark-mode .drawer-toggle-row2:hover,
    body.dark-mode .drawer-sub-link:hover,
    body.dark-mode .drawer-sub2-link:hover { color: #38bdf8 !important; background: rgba(56, 189, 248, 0.12) !important; }
    body.dark-mode .drawer-icon { background: #1e293b !important; color: #38bdf8 !important; }
    body.dark-mode .drawer-icon i,
    body.dark-mode .drawer-icon .fa-solid { color: #38bdf8 !important; }
    body.dark-mode .drawer-link:hover .drawer-icon,
    body.dark-mode .drawer-toggle-row:hover .drawer-icon { background: #2563eb !important; color: #ffffff !important; }
    body.dark-mode .drawer-link:hover .drawer-icon i,
    body.dark-mode .drawer-toggle-row:hover .drawer-icon i { color: #ffffff !important; }
    body.dark-mode .drawer-chevron,
    body.dark-mode .drawer-sub-chevron,
    body.dark-mode .drawer-sub2-chevron { color: #94a3b8 !important; }
    body.dark-mode .drawer-sub-panel { background: #0e1424 !important; border-left: 2px solid #334155 !important; }
    body.dark-mode .drawer-sub2-panel { background: #172033 !important; }
    body.dark-mode .drawer-sub-dot { background: #38bdf8 !important; }
    body.dark-mode .drawer-sub2-dot { background: #60a5fa !important; }
    body.dark-mode .drawer-view-all { color: #38bdf8 !important; }
    body.dark-mode .drawer-footer { border-top: 1px solid #1e293b !important; background: #070a10 !important; }
    body.dark-mode .drawer-theme-row { color: #ffffff !important; }
    body.dark-mode .drawer-theme-label { color: #ffffff !important; font-weight: 500; }
    body.dark-mode .drawer-theme-icon { color: #ffd700 !important; }
    body.dark-mode .drawer-slider { background: #2563eb !important; }
    body.dark-mode .drawer-slider::before { background: #ffffff !important; }

    /* --- Calculators (Lumpsum, SIP, ELSS, MF Returns, Step-up, SWP) --- */
    body.dark-mode .calc-hero,
    body.dark-mode .sip-info,
    body.dark-mode .lumpsum-section,
    body.dark-mode .sip-section,
    body.dark-mode .elss-section,
    body.dark-mode .swp-section,
    body.dark-mode .returns-section { background-color: #080c14 !important; color: #f8fafc !important; }
    body.dark-mode .calc-container h1,
    body.dark-mode .sip-info h2,
    body.dark-mode .sip-info h3,
    body.dark-mode .lumpsum-title,
    body.dark-mode .sip-title,
    body.dark-mode .elss-title,
    body.dark-mode .estimator-title { color: #ffffff !important; }
    body.dark-mode .calc-container p,
    body.dark-mode .sip-info p,
    body.dark-mode .sip-info li,
    body.dark-mode .estimator-sub,
    body.dark-mode .slider-group label,
    body.dark-mode .amount-box label,
    body.dark-mode .legend p { color: #e2e8f0 !important; }
    body.dark-mode :is(.lumpsum-box, .sip-box, .elss-box, .swp-box, .returns-box, .stepup-box) {
      background: #111827 !important;
      border: 1px solid #1e293b !important;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
    }
    body.dark-mode .result-value { color: #38bdf8 !important; }

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
    body.dark-mode .academy-title,
    body.dark-mode .learn-title,
    body.dark-mode .testimonial-title,
    body.dark-mode .brand-title,
    body.dark-mode .title,
    body.dark-mode .about-content h2,
    body.dark-mode .service-content h3,
    body.dark-mode .academy-card h3,
    body.dark-mode .learn-card h3,
    body.dark-mode .testimonial-card h4,
    body.dark-mode .form-box h3,
    body.dark-mode .stat-card h3 { color: #ffffff !important; }

    body.dark-mode p,
    body.dark-mode li,
    body.dark-mode dt,
    body.dark-mode dd,
    body.dark-mode label,
    body.dark-mode td,
    body.dark-mode th,
    body.dark-mode div:not(.hero-btn):not(.btn),
    body.dark-mode .hero-content p,
    body.dark-mode .section-subtitle,
    body.dark-mode .academy-subtitle,
    body.dark-mode .brand-desc,
    body.dark-mode .learn-sub,
    body.dark-mode .about-content p,
    body.dark-mode .service-content p,
    body.dark-mode .learn-card p,
    body.dark-mode .testimonial-card p,
    body.dark-mode .stat-card p,
    body.dark-mode .academy-card p { color: #f8fafc !important; }

    body.dark-mode span:not(.hero-btn):not(.about-btn):not(.brand-btn):not(.btn) { color: #e2e8f0 !important; }
    body.dark-mode .about-tag { color: #38bdf8 !important; }
    body.dark-mode .testimonial-card span { color: #38bdf8 !important; }

    body.dark-mode small,
    body.dark-mode .meta,
    body.dark-mode .date,
    body.dark-mode .sub-title { color: #e2e8f0 !important; }

    /* --- Cards, Boxes, Panels & Sections --- */
    body.dark-mode :is([class*="card"], [class*="Card"], [class*="box"], [class*="Box"], [class*="tile"], [class*="Tile"], [class*="panel"], [class*="Panel"], .feature-item, .why-item, .job-details, .job-list, .stat-card, .service-card, .about-intro-inner, .job-filter-container, .brand-section, .about-section, .contact-section, .learn-section, .academy-section, .services-section, .testimonial-section) {
      background-color: #111827 !important;
      border-color: #1e293b !important;
      color: #f8fafc !important;
    }
    body.dark-mode .contact-section { background: #070a12 !important; }
    body.dark-mode .learn-section { background: #090e1a !important; }
    body.dark-mode .brand-section { background: #070a12 !important; }
    body.dark-mode .about-section { background: #0d1527 !important; }
    body.dark-mode .testimonial-section { background: #070b14 !important; }
    body.dark-mode .academy-section { background: #090e1a !important; }
    body.dark-mode .services-section { background: #070b14 !important; }
    body.dark-mode .marquee { background-color: #111827 !important; border-color: #1e293b !important; }

    /* --- Learn Tabs Section --- */
    body.dark-mode .learn-btn {
      background: #111b33 !important;
      color: #f8fafc !important;
      border: 1px solid #1e293b !important;
    }
    body.dark-mode .learn-btn:hover {
      background: #1e293b !important;
      color: #38bdf8 !important;
    }
    body.dark-mode .learn-btn.active {
      background: #2563eb !important;
      color: #ffffff !important;
      border-color: #3b82f6 !important;
    }
    body.dark-mode .learn-card {
      background: #111b33 !important;
      border: 1px solid #1e293b !important;
      color: #f8fafc !important;
    }

    /* --- Testimonial Cards --- */
    body.dark-mode .testimonial-card {
      background: #111b33 !important;
      border: 1px solid #1e293b !important;
      color: #f8fafc !important;
    }

    /* --- Buttons --- */
    body.dark-mode .hero-btn,
    body.dark-mode .btn-send,
    body.dark-mode button[type="submit"],
    body.dark-mode .cta-btn,
    body.dark-mode .work-btn,
    body.dark-mode .apply-btn,
    body.dark-mode .calculate-btn,
    body.dark-mode .brand-btn {
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
    body.dark-mode .apply-btn:hover,
    body.dark-mode .brand-btn:hover {
      background: #1d4ed8 !important;
      color: #ffffff !important;
    }

    body.dark-mode .btn-cancel,
    body.dark-mode .form-cancel-btn,
    body.dark-mode button[type="reset"] {
      background: #1e293b !important;
      color: #f8fafc !important;
      border: 1px solid #334155 !important;
      font-weight: 500 !important;
    }

    body.dark-mode .about-btn {
      border: 1px solid #ffd700 !important;
      background: #1e293b !important;
      color: #ffd700 !important;
    }
    body.dark-mode .about-btn:hover {
      background: #ffd700 !important;
      color: #070b14 !important;
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
      background: #334155 !important;
      color: #ffffff !important;
    }



    /* --- Enquiry Modal --- */
    body.dark-mode .modal-content {
      background: #111827 !important;
      border: 1px solid #334155 !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7) !important;
      color: #ffffff !important;
    }
    body.dark-mode .modal-content h2 { color: #ffffff !important; font-weight: 700 !important; }
    body.dark-mode .modal-content label { color: #ffffff !important; font-weight: 600 !important; }
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
      color: #f8fafc !important;
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
      color: #e2e8f0 !important;
    }

    /* --- Real-Time Mandatory Email & Phone Form Validation Styles --- */
    input.input-invalid,
    select.input-invalid,
    textarea.input-invalid {
      border: 1.5px solid #ef4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
      outline: none !important;
    }

    input.input-valid,
    select.input-valid,
    textarea.input-valid {
      border-color: #10b981 !important;
    }

    button:disabled,
    button.btn-disabled,
    input[type="submit"]:disabled,
    .btn-disabled {
      opacity: 0.65 !important;
      cursor: not-allowed !important;
      box-shadow: none !important;
      transform: none !important;
    }

    /* --- Social Icons --- */
    .nav-social-icons { display: inline-flex; align-items: center; gap: 10px; margin-left: 4px; }
    .nav-social-icons a { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; color: #0b1b66; text-decoration: none; background: #ffffff; transition: transform .2s ease, background-color .2s ease, color .2s ease; }
    .nav-social-icons a:hover { transform: translateY(-2px); background-color: #087f9b; color: #ffffff; }
    @media (max-width: 900px) { .nav-social-icons { margin-top: 10px; } }
  `;
  document.head.appendChild(style);

  // Global Real-Time Form Validation Engine (Mandatory Email & Phone + Red Border + Button Enable/Disable)
  function initGlobalFormValidation() {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
    const isValidPhone = (phone) => {
      const clean = (phone || "").trim();
      const digits = clean.replace(/\D/g, "");
      return /^[\d+\s()-]{10,15}$/.test(clean) && digits.length >= 10;
    };

    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      if (form.dataset.validationBound === "true") return;
      form.dataset.validationBound = "true";

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"], .submit-btn, .btn-login-submit, .btn-job-publish, .contact-btn, .btn-dpdp-submit, .login-btn, .signup-btn');
      if (!submitBtn) return;

      const emailInput = form.querySelector('input[type="email"], input[name*="email"], input[id*="email"], input[placeholder*="email" i]');
      const phoneInput = form.querySelector('input[type="tel"], input[name*="phone"], input[id*="phone"], input[name*="mobile"], input[id*="mobile"], input[placeholder*="phone" i], input[placeholder*="mobile" i]');
      const requiredInputs = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));

      if (emailInput && !requiredInputs.includes(emailInput)) requiredInputs.push(emailInput);
      if (phoneInput && !requiredInputs.includes(phoneInput)) requiredInputs.push(phoneInput);

      function validateForm() {
        let isFormValid = true;

        requiredInputs.forEach(input => {
          const val = input.value ? input.value.trim() : "";
          const isTouched = input.dataset.touched === "true" || val.length > 0;

          if (input === emailInput || (input.type === "email") || (input.id && input.id.includes("email"))) {
            if (!isValidEmail(val)) {
              isFormValid = false;
              if (isTouched) {
                input.classList.add("input-invalid");
                input.classList.remove("input-valid");
              } else {
                input.classList.remove("input-invalid", "input-valid");
              }
            } else {
              input.classList.remove("input-invalid");
              input.classList.add("input-valid");
            }
          } else if (input === phoneInput || (input.type === "tel") || (input.id && input.id.includes("phone"))) {
            if (!isValidPhone(val)) {
              isFormValid = false;
              if (isTouched) {
                input.classList.add("input-invalid");
                input.classList.remove("input-valid");
              } else {
                input.classList.remove("input-invalid", "input-valid");
              }
            } else {
              input.classList.remove("input-invalid");
              input.classList.add("input-valid");
            }
          } else if (input.type === "checkbox") {
            // Terms checkboxes are validated at submission to display friendly toast notifications
          } else if (!val) {
            isFormValid = false;
            if (isTouched) {
              input.classList.add("input-invalid");
              input.classList.remove("input-valid");
            } else {
              input.classList.remove("input-invalid", "input-valid");
            }
          } else {
            input.classList.remove("input-invalid");
            input.classList.add("input-valid");
          }
        });

        // Keep submit button clickable so submission attempt triggers validation toasts
        submitBtn.disabled = false;
        submitBtn.classList.remove("btn-disabled");
        submitBtn.removeAttribute("aria-disabled");
      }

      // Terms & Conditions validation is handled by TermsManager in common-components/footer.js
      // Fallback only if TermsManager is not present on the page
      form.addEventListener("submit", (e) => {
        if (window.TermsManager) return;
        const termsCb = form.querySelector('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms');
        if (termsCb && !termsCb.checked) {
          e.preventDefault();
          termsCb.focus();
          termsCb.classList.add("input-invalid");
          if (typeof window.showNotification === "function") {
            window.showNotification("Please review and accept the Terms & Conditions to proceed.", "warning");
          }
          return false;
        }
      });

      const allInputs = form.querySelectorAll("input, select, textarea");
      allInputs.forEach(input => {
        input.addEventListener("input", () => {
          input.dataset.touched = "true";
          validateForm();
        });
        input.addEventListener("blur", () => {
          input.dataset.touched = "true";
          validateForm();
        });
        input.addEventListener("change", () => {
          input.dataset.touched = "true";
          validateForm();
        });
      });

      validateForm();
    });
  }

  const formObserver = new MutationObserver(() => initGlobalFormValidation());
  formObserver.observe(document.body, { childList: true, subtree: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobalFormValidation);
  } else {
    initGlobalFormValidation();
  }

  standardizeHeader();
  setupHeaderNavigation();

  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme === "dark" ? "dark" : "light";
  addThemeToggle();
  formatFooterContactDetails();
  standardizeFooter();
  applyTheme(preferredTheme, false);
  document.documentElement.classList.add("site-chrome-ready");

  // Ensure global notifications system is loaded across all pages
  if (typeof window !== "undefined" && !window.showNotification) {
    const isCalc = window.location.pathname.replace(/\\/g, "/").includes("/calculators/");
    const notifScript = document.createElement("script");
    notifScript.src = isCalc ? "../../common-components/notifications.js" : "../common-components/notifications.js";
    notifScript.defer = true;
    document.head.appendChild(notifScript);
  }
})();





