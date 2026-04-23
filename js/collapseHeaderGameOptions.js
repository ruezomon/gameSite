const collapseButtonElement = document.getElementById("collapseButtonHeader");
collapseButtonElement.addEventListener("click", function() {
    this.classList.toggle("active");
    if (this.nextElementSibling.style.maxHeight) 
        this.nextElementSibling.style.maxHeight = null;
    else 
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
});