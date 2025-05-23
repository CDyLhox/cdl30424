function randomizePosition(elmnt) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (viewportWidth - elmnt.offsetWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - elmnt.offsetHeight));

    elmnt.style.position = "absolute";
    elmnt.style.left = 0 + "%";
    elmnt.style.top = 12 + "%";

}

const mtxt = document.getElementById("mainPageText");
randomizePosition(mtxt);
dragElement(mtxt);



function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, initialX = 0, initialY = 0;

    if (document.getElementById(elmnt.id + "windowHeader4")) {
        document.getElementById(elmnt.id + "windowHeader4").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();

        mtxt.style.cursor = "grabbing";

        // Get initial cursor position and element position:
        initialX = e.clientX;
        initialY = e.clientY;
        pos1 = elmnt.offsetLeft;
        pos2 = elmnt.offsetTop;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        // Calculate new position:
        let deltaX = e.clientX - initialX;
        let deltaY = e.clientY - initialY;

        // Set the element's new position:
        elmnt.style.left = (pos1 + deltaX) + "px";
        elmnt.style.top = (pos2 + deltaY) + "px";
    }

    function closeDragElement() {
        mtxt.style.cursor = "grab";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

