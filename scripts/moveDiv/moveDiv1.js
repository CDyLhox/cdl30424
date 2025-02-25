
function randomizePosition(elmnt) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (viewportWidth - elmnt.offsetWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - elmnt.offsetHeight));

    elmnt.style.position = "absolute";
    elmnt.style.left = 76 + "%";
    elmnt.style.top = 2 + "%";

}

const mainwindow1 = document.getElementById("mainWindow1");
randomizePosition(mainwindow1);
dragElement(mainwindow1);






function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, initialX = 0, initialY = 0;

    if (document.getElementById(elmnt.id + "windowHeader1")) {
        document.getElementById(elmnt.id + "windowHeader1").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e.preventDefault();

        mainwindow1.style.cursor = "grabbing";
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
        mainwindow1.style.cursor = "grab";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

