function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}


function randomizePosition(elmnt) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * (viewportWidth - elmnt.offsetWidth));
    const randomY = Math.floor(Math.random() * (viewportHeight - elmnt.offsetHeight));

    elmnt.style.position = "absolute";
    elmnt.style.left = randomX + "px";
    elmnt.style.top = randomY + "px";

}

const mainwindow = document.getElementById("mainWindow");
if(window.innerWidth>800){
    randomizePosition(mainwindow);
}
dragElement(mainwindow);






function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, initialX = 0, initialY = 0;

    elmnt.onmousedown = dragMouseDown; // Desktop
    elmnt.ontouchstart = dragTouchStart; // Mobile

    function dragMouseDown(e) {
        e.preventDefault();
        initializeDrag(e.clientX, e.clientY);
        mainwindow.style.cursor = "grabbing";
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        const touch = e.touches[0]; // Get the first touch point
        initializeDrag(touch.clientX, touch.clientY);
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function initializeDrag(x, y) {
        initialX = x;
        initialY = y;
        pos1 = elmnt.offsetLeft;
        pos2 = elmnt.offsetTop;
    }

    function elementDrag(e) {
        e.preventDefault();
        dragToPosition(e.clientX, e.clientY);
    }

    function elementTouchDrag(e) {
        const touch = e.touches[0]; // Get the first touch point
        dragToPosition(touch.clientX, touch.clientY);
    }

    function dragToPosition(x, y) {
        // Calculate new position
        const deltaX = x - initialX;
        const deltaY = y - initialY;

        // Set the element's new position
        elmnt.style.left = (pos1 + deltaX) + "px";
        elmnt.style.top = (pos2 + deltaY) + "px";
    }

    function closeDragElement() {
        mainwindow.style.cursor = "grab";
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}



