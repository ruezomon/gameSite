const collapseButtonElement = document.getElementById("collapseButtonHeader");

collapseButtonElement.addEventListener("click", () => {
    collapseButtonElement.classList.toggle("active");
    if (collapseButtonElement.nextElementSibling.style.maxHeight) {
        collapseButtonElement.nextElementSibling.style.maxHeight = null;
        collapseButtonElement.nextElementSibling.style.padding = null;
    } else {
        collapseButtonElement.nextElementSibling.style.maxHeight = collapseButtonElement.nextElementSibling.scrollHeight + "px";
        collapseButtonElement.nextElementSibling.style.padding = "5px 18px";
    }
});

document.getElementsByTagName("main")[0].addEventListener("click", () => {
    if (collapseButtonElement.nextElementSibling.style.maxHeight) {
        collapseButtonElement.nextElementSibling.style.maxHeight = null;
        collapseButtonElement.nextElementSibling.style.padding = null;
    }
});