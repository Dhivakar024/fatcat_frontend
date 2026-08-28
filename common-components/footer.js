document.addEventListener("DOMContentLoaded", function () {

    const footer = document.getElementById("footer");

    if (!footer) return;

    fetch("/common-components/footer.html")
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
            initFooterAccordion();
        })
        .catch(error => {
            console.error("Footer loading failed:", error);
        });

    function initFooterAccordion() {
        // Use event delegation so it works reliably after innerHTML inject
        document.addEventListener('click', function (e) {
            // Only act on mobile widths
            if (window.innerWidth > 600) return;

            const heading = e.target.closest('.footer-accordion-heading');
            if (!heading) return;

            const col = heading.closest('.footer-accordion');
            if (!col) return;

            col.classList.toggle('is-open');
        });
    }

});