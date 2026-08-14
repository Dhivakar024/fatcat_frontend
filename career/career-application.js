document.addEventListener("DOMContentLoaded", function () {

    const selectedJob = localStorage.getItem("selectedJob");

    const jobElement = document.getElementById("selectedJob");

    if (selectedJob) {
        jobElement.textContent = selectedJob;
    } else {
        jobElement.textContent = "General Application";
    }

});


function cancelApplication() {

    localStorage.removeItem("selectedJob");

    window.location.href = "./career.html";

}