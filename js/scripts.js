const anchor = document.getElementById('anchor');

console.log(anchor.getBoundingClientRect());
// anchor.style.position = "relative"
// anchor.style.left = "0px"


//Boolean flag to know when the user presses down on mouse
let isMouseDown;

window.addEventListener("mousedown", () => {
    isMouseDown = true;
})
window.addEventListener("mouseup", () => {
    isMouseDown = false;
})


window.addEventListener("mousemove", (e) => {
    if(isMouseDown) {
        // console.log(e)

        const mouseXPosition = e.clientX;
        const mouseYPosition = e.clientY;

        //Check if the mouse position is over the anchor
        const anchorPosition = getAnchorDimensions();
        const isOverAnchor = 
            anchorPosition.minX <= mouseXPosition &&
            mouseXPosition <= anchorPosition.maxX &&
            anchorPosition.minY <= mouseYPosition &&
            mouseYPosition <= anchorPosition.maxY;
        if(isOverAnchor) {
            console.log({mouseXPosition, mouseYPosition})



        }

    }
})

const getAnchorDimensions = () => {
    const bound = anchor.getBoundingClientRect();
    return {
        minX: bound.x,
        maxX: bound.x + bound.width,
        minY: bound.y,
        maxY: bound.y + bound.height
    }
}