const toggleButton = document.getElementById("toggle-header");
const header = document.getElementById("global-header");
toggleButton.addEventListener("click", toggleHeader);
let mouseOver = false;
document.addEventListener("keydown", (event) => {
    if (event.key === " " && (!mouseOver || !header.classList.contains("hide"))) {
        event.preventDefault();
        toggleHeader();
        event.stopPropagation();
    }
});
header.addEventListener("mouseover", function() {
    mouseOver = true;
    console.log(mouseOver);
    if (this.classList.contains("hide")) {
        this.style.transform = "translateY(55px)";
    }
});

header.addEventListener("mouseleave", function() {
    mouseOver = false;
    console.log(mouseOver);
    if (this.classList.contains("hide")) {
        this.style.transform = null;
    }
});

function toggleHeader() {
    if (header.style.marginTop === "-50px") {
        header.style.marginTop = "5px";
        toggleButton.innerHTML = "&uarr;";
    } else {
        header.style.marginTop = "-50px";
        toggleButton.innerHTML = "&darr;";
    }
    header.classList.toggle("hide");
}