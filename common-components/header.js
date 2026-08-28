document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    if (!header) return;

    fetch("/common-components/header.html")
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
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
                document.body.classList.toggle('dark-mode');
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
            // Sync initial state: checked = light mode on
            drawerTheme.checked = !document.body.classList.contains('dark-mode');
            drawerTheme.addEventListener('change', () => {
                if (drawerTheme.checked) {
                    document.body.classList.remove('dark-mode');
                } else {
                    document.body.classList.add('dark-mode');
                }
            });
        }
    }
});
