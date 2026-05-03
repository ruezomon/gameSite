document.getElementById("global-header-wrapper").innerHTML = `
<header id="global-header">
    <div class="header-content" id="sitename">
    !cogugames
</div>
<div class="header-content" id="links-to-pages">
    <a href="index.html" class="header-button">Home</a>
    <button type="button" id="collapseButtonHeader" class="clickable-link-to-page">Games</button>
    <div id="links-wrapper">
        <a href="wordle.html">Wordle</a> <br>
        <a href="snake.html">Snake</a> <br>
        <a href="gewinnt.html">4 Gewinnt</a>
    </div>
    <a href="aboutUs.html" class="header-button">&Uuml;ber uns</a>
</div>
</header>
<button id="toggle-header">&uarr;</button>`