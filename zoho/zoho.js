function openFinanceModal() {

    const modal = document.getElementById("financeModal");

    if (!modal) {
        console.error("financeModal not found");
        return;
    }

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeFinanceModal() {

    const modal = document.getElementById("financeModal");

    if (!modal) {
        console.error("financeModal not found");
        return;
    }

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeFinanceModal();
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const videoWrapper = document.querySelector(".video-wrapper");
    if (videoWrapper) {
        const video = videoWrapper.querySelector("video");
        const overlay = videoWrapper.querySelector(".video-overlay-text");

        if (video && overlay) {
            function togglePlay() {
                if (video.paused) {
                    video.play().catch(function (err) {
                        console.log("Video play error:", err);
                    });
                } else {
                    video.pause();
                }
            }

            overlay.addEventListener("click", togglePlay);

            video.addEventListener("play", function () {
                overlay.style.opacity = "0";
                overlay.style.pointerEvents = "none";
            });

            video.addEventListener("pause", function () {
                overlay.style.opacity = "1";
                overlay.style.pointerEvents = "auto";
            });

            video.addEventListener("ended", function () {
                overlay.style.opacity = "1";
                overlay.style.pointerEvents = "auto";
            });
        }
    }
});