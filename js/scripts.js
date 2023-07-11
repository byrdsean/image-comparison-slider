const anchor = document.getElementById("sliderAnchor");
const slider = document.getElementById("sliderContainer");
const leftPane = document.getElementById("leftImgPane");
const rightPane = document.getElementById("rightImgPane");

//Set the anchor styling to allow JS to reset it's x position
anchor.style.position = "relative";
anchor.style.left = "0px";

const getOffsetX = (xCoordinate) => window.screenX + xCoordinate;
const getOffsetY = (yCoordinate) => window.screenY + yCoordinate;

const getAnchorDimensions = () => {
  const bound = anchor.getBoundingClientRect();
  const minX = getOffsetX(bound.x);
  const minY = getOffsetY(bound.y);
  return {
    minX: minX,
    maxX: minX + bound.width,
    minY: minY,
    maxY: minY + bound.height,
  };
};

//Boolean flag to know when the user presses down on mouse
let mousePosition = null;

window.addEventListener("mousedown", (e) => {
  //Check if the user initiated mousedown over the anchor
  const mouseXPosition = getOffsetX(e.clientX);
  const mouseYPosition = getOffsetY(e.clientY);

  //Check if the mouse position is over the anchor
  const anchorPosition = getAnchorDimensions();
  const isMouseDown =
    anchorPosition.minX <= mouseXPosition &&
    mouseXPosition <= anchorPosition.maxX &&
    anchorPosition.minY <= mouseYPosition &&
    mouseYPosition <= anchorPosition.maxY;
  if (isMouseDown) {
    mousePosition = { xPosition: mouseXPosition, yPosition: mouseYPosition };
  }
});

window.addEventListener("mouseup", () => {
  mousePosition = null;
});

window.addEventListener("mousemove", (e) => {
  if (!mousePosition) return;

  const anchorDimensions = anchor.getBoundingClientRect();
  const sliderDimensions = slider.getBoundingClientRect();

  //REFACTOR: need to detect boundary BEFORE updating anchor position
  // //If the anchor is out of bounds, don't do anything
  // const isInBounds =
  //     Math.floor(sliderDimensions.x) <= Math.floor(anchorDimensions.x) &&
  //     Math.floor(anchorDimensions.x + anchorDimensions.width) <= Math.floor(sliderDimensions.x + sliderDimensions.width);
  // if(!isInBounds) return;

  //Get the current x position of the mouse.
  //Find the difference from when the user pressed the mouse button.
  //Update the anchor x position based on the difference
  const xCoordsToMoveAnchor = e.screenX - mousePosition.xPosition;
  anchor.style.left = `${xCoordsToMoveAnchor}px`;

  //Find the x coord of the anchor's center
  const anchorXMidPoint = Math.floor(
    anchorDimensions.x + anchorDimensions.width / 2
  );

  //Calculate how far the achor is along the x axis as a percentage
  const percentage =
    (anchorXMidPoint - sliderDimensions.x) / sliderDimensions.width;
  const roundedPercentage = Math.floor(percentage * 100);

  //Reset the width of the left and right image containers
  leftPane.style.width = `${roundedPercentage}%`;
  rightPane.style.width = `${100 - roundedPercentage}%`;
});
