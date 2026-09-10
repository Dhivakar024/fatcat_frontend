document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    if (!header) return;

    function getSiteBase() {
        if (window.location.protocol === "file:") {
            const p = window.location.pathname.replace(/\\/g, "/");
            return p.includes("/calculators/") ? "../../" : "../";
        }
        const known = ["home", "about", "services", "academy", "business", "career", "contact", "login", "signup", "zoho", "calculators", "privacy-center", "dashboard", "admin", "legal", "common-components"];
        const match = window.location.pathname.match(new RegExp(`^(.*?)\\/(?:${known.join("|")})(?:\\/|$)`, "i"));
        return (match && match[1]) ? match[1] : "";
    }

    function adjustComponentHtml(html) {
        const base = getSiteBase();
        if (!base) return html;

        if (base.endsWith("/")) {
            return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}`);
        }
        return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
    }

    function loadHeaderHtml() {
        const paths = [
            "../common-components/header.html",
            "../../common-components/header.html",
            "./common-components/header.html",
            "/common-components/header.html",
            "common-components/header.html"
        ];

        let promise = Promise.reject();
        paths.forEach(p => {
            promise = promise.catch(() => {
                return fetch(p).then(res => {
                    if (!res.ok) throw new Error("Path failed: " + p);
                    return res.text();
                });
            });
        });
        return promise;
    }

    loadHeaderHtml()
        .then(data => {
            header.innerHTML = adjustComponentHtml(data);
            initHeader();
        })
        .catch(error => {
            console.error("Header loading failed:", error);
        });

    function initHeader() {

        // ── Desktop: theme toggle ──
        const themeToggle = document.querySelector('#themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
                if (typeof window.applyTheme === 'function') {
                    window.applyTheme(nextTheme);
                } else {
                    document.body.classList.toggle('dark-mode');
                }
            });
        }

        // ── Desktop: Services dropdown & Submenu touch/click support ──
        const desktopDropdown = document.querySelector('#desktopServicesDropdown');
        const servicesDropBtn = document.querySelector('#servicesDropBtn');
        const brokingSubmenu = document.querySelector('#desktopBrokingSubmenu');
        const submenuToggle = document.querySelector('.submenu-toggle');

        if (servicesDropBtn && desktopDropdown) {
            servicesDropBtn.addEventListener('click', function (e) {
                // On touch screens or click, if dropdown is closed, open it instead of navigating immediately
                if (!desktopDropdown.classList.contains('is-open')) {
                    e.preventDefault();
                    e.stopPropagation();
                    desktopDropdown.classList.add('is-open');
                    servicesDropBtn.setAttribute('aria-expanded', 'true');
                }
            });
        }

        if (submenuToggle && brokingSubmenu) {
            submenuToggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                brokingSubmenu.classList.toggle('is-open');
            });
        }

        // Close desktop dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (desktopDropdown && !desktopDropdown.contains(e.target)) {
                desktopDropdown.classList.remove('is-open');
                if (servicesDropBtn) servicesDropBtn.setAttribute('aria-expanded', 'false');
                if (brokingSubmenu) brokingSubmenu.classList.remove('is-open');
            }
        });

        // ── Mobile Drawer ──
        const hamburger   = document.querySelector('.hamburger');
        const drawer      = document.querySelector('#mobileDrawer');
        const drawerClose = document.querySelector('#drawerClose');
        const overlay     = document.querySelector('#drawerOverlay');
        const drawerTheme = document.querySelector('#drawerThemeToggle');

        function openDrawer() {
            if (!drawer || !overlay) return;
            drawer.classList.add('drawer-open');
            overlay.classList.add('overlay-active');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            if (!drawer || !overlay) return;
            drawer.classList.remove('drawer-open');
            overlay.classList.remove('overlay-active');
            document.body.style.overflow = '';
        }

        // Use event delegation on document for robustness
        document.addEventListener('click', function (e) {

            // ── Hamburger: open drawer ──
            if (e.target.closest('.hamburger')) {
                openDrawer();
                return;
            }

            // ── Close button: close drawer ──
            if (e.target.closest('#drawerClose')) {
                closeDrawer();
                return;
            }

            // ── Overlay: close drawer ──
            if (e.target.id === 'drawerOverlay') {
                closeDrawer();
                return;
            }

            // ── Level-1 Services accordion toggle ──
            if (e.target.closest('.drawer-toggle-row') && !e.target.closest('.drawer-toggle-row2')) {
                const item = e.target.closest('.drawer-has-sub');
                if (item) {
                    item.classList.toggle('sub-open');
                }
                return;   // don't close drawer
            }

            // ── Level-2 Investment Broking accordion toggle ──
            if (e.target.closest('.drawer-toggle-row2')) {
                const item2 = e.target.closest('.drawer-has-sub2');
                if (item2) {
                    item2.classList.toggle('sub2-open');
                }
                return;   // don't close drawer
            }

            // ── Real nav links & login button: close drawer ──
            const isRealLink = e.target.closest('.drawer-link:not(.drawer-toggle-row)')
                            || e.target.closest('.drawer-sub-link:not(.drawer-toggle-row2)')
                            || e.target.closest('.drawer-sub2-link')
                            || e.target.closest('.drawer-login-btn');
            if (isRealLink) {
                closeDrawer();
                return;
            }
        });


        // Drawer light-mode toggle
        if (drawerTheme) {
            drawerTheme.checked = !document.body.classList.contains('dark-mode');
            drawerTheme.addEventListener('change', () => {
                const nextTheme = drawerTheme.checked ? 'light' : 'dark';
                if (typeof window.applyTheme === 'function') {
                    window.applyTheme(nextTheme);
                } else {
                    document.body.classList.toggle('dark-mode', !drawerTheme.checked);
                }
            });
        }

        // ── Active Page Navigation Highlighting ──
        highlightActiveNav();

        function highlightActiveNav() {
            const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, "/");

            function matchesPath(href) {
                if (!href || href === "#" || href.startsWith("javascript:")) return false;
                try {
                    const url = new URL(href, window.location.origin);
                    const linkPath = url.pathname.toLowerCase();

                    if (currentPath === linkPath) return true;

                    // Home matching
                    if ((currentPath === "/" || currentPath === "" || currentPath.endsWith("/home/index.html") || currentPath.endsWith("/home/") || currentPath.endsWith("/index.html") || currentPath.endsWith("/home")) &&
                        (linkPath.endsWith("/home/index.html") || linkPath.endsWith("/home/") || linkPath.endsWith("/index.html") || linkPath === "/")) {
                        return true;
                    }

                    // Calculators matching under Mutual Fund / Services
                    if (currentPath.includes("/calculators/")) {
                        if (linkPath.includes("mutual-fund.html")) return true;
                    }

                    // Career application matching Career
                    if (currentPath.includes("career-application.html") && linkPath.includes("career.html")) {
                        return true;
                    }

                    return false;
                } catch (e) {
                    return false;
                }
            }

            // Desktop Nav Links
            let isServicesActive = false;
            const desktopLinks = document.querySelectorAll(".nav-menu a:not(.contact-btn):not(.login-btn)");
            desktopLinks.forEach(link => {
                if (matchesPath(link.getAttribute("href"))) {
                    link.classList.add("active");
                    if (link.closest(".dropdown")) {
                        isServicesActive = true;
                    }
                }
            });

            if (isServicesActive || currentPath.includes("/services/") || currentPath.includes("/calculators/")) {
                const servicesDropBtn = document.querySelector("#servicesDropBtn");
                if (servicesDropBtn) servicesDropBtn.classList.add("active");
            }

            // Mobile Drawer Links
            const drawerLinks = document.querySelectorAll(".drawer-nav a");
            drawerLinks.forEach(link => {
                if (matchesPath(link.getAttribute("href"))) {
                    link.classList.add("active");

                    // Expand parent drawer panels if the active link is inside an accordion
                    const sub2 = link.closest(".drawer-has-sub2");
                    if (sub2) {
                        sub2.classList.add("sub2-open");
                    }
                    const sub1 = link.closest(".drawer-has-sub");
                    if (sub1) {
                        sub1.classList.add("sub-open");
                        const toggleRow = sub1.querySelector(".drawer-toggle-row");
                        if (toggleRow) toggleRow.classList.add("active");
                    }
                }
            });

            // 3. Set Tablet Center Page Title
            const tabletPageTitle = document.getElementById("tabletPageTitle");
            if (tabletPageTitle) {
                let pageName = "";

                if (currentPath.includes("sipcalculator") || currentPath.includes("sip.html")) {
                    pageName = "SIP Calculator";
                } else if (currentPath.includes("elss-calculator") || currentPath.includes("elss.html")) {
                    pageName = "ELSS Calculator";
                } else if (currentPath.includes("lumpsum-calculator") || currentPath.includes("lumpsum.html")) {
                    pageName = "Lumpsum Calculator";
                } else if (currentPath.includes("mf-returns-calci") || currentPath.includes("mf-returns.html")) {
                    pageName = "MF Returns Calculator";
                } else if (currentPath.includes("stepup-sip-calculator") || currentPath.includes("stepup-sip.html")) {
                    pageName = "StepUp SIP Calculator";
                } else if (currentPath.includes("swp-calculator") || currentPath.includes("swp.html")) {
                    pageName = "SWP Calculator";
                } else if (currentPath.includes("mutual-fund.html")) {
                    pageName = "Mutual Funds";
                } else if (currentPath.includes("stock-broking.html")) {
                    pageName = "Stock Broking";
                } else if (currentPath.includes("insurance.html")) {
                    pageName = "Insurance";
                } else if (currentPath.includes("loans.html")) {
                    pageName = "Loans";
                } else if (currentPath.includes("service.html")) {
                    pageName = "Our Services";
                } else if (currentPath.includes("about.html")) {
                    pageName = "About Us";
                } else if (currentPath.includes("academy.html")) {
                    pageName = "Academy";
                } else if (currentPath.includes("business.html")) {
                    pageName = "Business";
                } else if (currentPath.includes("career-application.html") || currentPath.includes("career.html")) {
                    pageName = "Career";
                } else if (currentPath.includes("zoho.html")) {
                    pageName = "Zoho Partner";
                } else if (currentPath.includes("contact.html")) {
                    pageName = "Contact Us";
                } else if (currentPath.includes("login.html")) {
                    pageName = "Login";
                } else if (currentPath.includes("signup.html")) {
                    pageName = "Sign Up";
                } else if (currentPath === "/" || currentPath.endsWith("/index.html") || currentPath.endsWith("/home/")) {
                    pageName = "Home";
                } else {
                    const activeLink = document.querySelector(".nav-menu a.active") || document.querySelector(".drawer-nav a.active");
                    if (activeLink) {
                        pageName = activeLink.textContent.trim();
                    } else {
                        pageName = document.title.split("|")[0].trim();
                    }
                }

                tabletPageTitle.textContent = pageName;
            }
        }
    }
});
