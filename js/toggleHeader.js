const toggleButton = document.getElementById("toggle-header");
const header = document.getElementById("global-header");
toggleButton.addEventListener("click", function() {
    if (header.style.marginTop === "-50px") {
        header.style.marginTop = "5px";
    } else {
        header.style.marginTop = "-50px";
    }
    header.classList.toggle("hide");
});

header.addEventListener("mouseover", function() {
    if (this.classList.contains("hide")) {
        this.style.transform = "translateY(55px)";
    }
});

header.addEventListener("mouseleave", function() {
    if (this.classList.contains("hide")) {
        this.style.transform = null;
    }
});