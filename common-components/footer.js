document.addEventListener("DOMContentLoaded",function(){

    const footer=document.getElementById("footer");

    if(!footer){
        return;
    }

    fetch("/common-components/footer.html")
        .then(response=>response.text())
        .then(data=>{
            footer.innerHTML=data;
        })
        .catch(error=>{
            console.error("Footer loading failed:",error);
        });

});