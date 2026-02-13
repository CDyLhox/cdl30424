const topbar = document.getElementById("topbar");
console.log(topbar.getBoundingClientRect().height);

function randomizePosition(elmnt) {

    const randomX = Math.floor(Math.random() * (viewportWidth - elmnt.offsetWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - elmnt.offsetHeight));

    elmnt.style.position = "absolute";

}

const mtxt = document.getElementById("mainPageText");
mtxt.style.height = viewportHeight / 2 + "px";

    mtxt.style.left = 0 + "%";
    mtxt.style.top = 10 + "%";

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

