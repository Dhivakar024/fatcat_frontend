(() => {
  const storageKey = "fatcat-theme";
  const body = document.body;

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

    /* Darken page surfaces only; media and the existing card designs remain unchanged. */
    body.dark-mode main, body.dark-mode section { background-color: #000 !important; }
    body.dark-mode .hero-section,
    body.dark-mode .hero,
    body.dark-mode .cta-section { background-color: transparent !important; }
    body.dark-mode :is(main, section) :is(h1, h2, h3, h4, h5, h6, p, li, label) { color: #f8fafc !important; }
    body.dark-mode :is([class*="card"], [class*="Card"], [class*="box"], [class*="Box"], [class*="tile"], [class*="Tile"], [class*="panel"], [class*="Panel"], [class*="item"], [class*="Item"]) :is(h1, h2, h3, h4, h5, h6, p, li, label) { color: #111827 !important; }
    body.dark-mode :is(.badge, .tag, .chip) { color: #fff !important; }

    /* to the social media icons */
    .nav-social-icons { display: inline-flex; align-items: center; gap: 10px; margin-left: 4px; }
    .nav-social-icons a { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 8px; color: #fff; text-decoration: none; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); transition: transform .2s ease, background .2s ease; }
    .nav-social-icons a:hover { transform: translateY(-2px); background: rgba(255,255,255,0.18); }
    @media (max-width: 900px) { .nav-social-icons { margin-top: 10px; } }

  `;
  document.head.appendChild(style);

  const savedTheme = localStorage.getItem(storageKey);
  const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  addThemeToggle();
  applyTheme(preferredTheme);
})();





