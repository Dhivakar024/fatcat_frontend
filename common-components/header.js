document.addEventListener("DOMContentLoaded", function(){
    const header = document.getElementById("header");

    if(!header){
        return;
    }

    fetch("../common-components/header.html")
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
        })
        .catch(error => {
            console.error("Header loading failed:", error);
        });
});