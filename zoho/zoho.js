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