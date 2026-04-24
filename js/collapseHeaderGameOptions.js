const collapseButtonElement = document.getElementById("collapseButtonHeader");
collapseButtonElement.addEventListener("click", function() {
    this.classList.toggle("active");
    if (this.nextElementSibling.style.maxHeight) {
        this.nextElementSibling.style.maxHeight = null;
        this.nextElementSibling.style.padding = null;
    } else {
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
        this.nextElementSibling.style.padding = "5px 18px";
    }
});