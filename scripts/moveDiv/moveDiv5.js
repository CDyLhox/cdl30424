

const emt = document.getElementById("extraMainText");

    emt.style.position = "absolute";
    emt.style.left = 0 + "%";
    emt.style.top = (0.11 * viewportHeight) + (viewportHeight/2)+"px";

randomizePosition(emt);
dragElement(emt);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, initialX = 0, initialY = 0;

    if (document.getElementById(elmnt.id + "windowHeader5")) {
        document.getElementById(elmnt.id + "windowHeader5").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();

        emt.style.cursor = "grabbing";

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
        emt.style.cursor = "grab";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

