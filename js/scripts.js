const anchor = document.getElementById("sliderAnchor");
const slider = document.getElementById("sliderContainer");
const leftPane = document.getElementById("leftImgPane");
const rightPane = document.getElementById("rightImgPane");

const getOffsetX = (xCoordinate) => window.screenX + xCoordinate;
const getOffsetY = (yCoordinate) => window.screenY + yCoordinate;

const getInitialAnchorXPosition = () => {
  const anchorClientRect = getAnchorDimensions();
  return Math.floor((anchorClientRect.maxX + anchorClientRect.minX) / 2);
};

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

const setImagePangePercentage = (currentX, startingX, totalWidth) => {
  let percentage = (currentX - startingX) / totalWidth;
  percentage *= 100;

  //Validate
  if (percentage < 0) percentage = 0;
  if (100 < percentage) percentage = 100;

  //Reset the width of the left and right image containers
  leftPane.style.width = `${percentage}%`;
  rightPane.style.width = `${100 - percentage}%`;
};

const setAnchorPosition = (currentXPosition) => {
  const xCoordsToMoveAnchor = currentXPosition - initialAnchorXPosition;
  anchor.style.left = `${xCoordsToMoveAnchor}px`;
};

const setSliderWidth = () => {
  const leftImg = leftPane.querySelector("img");
  const rightImg = rightPane.querySelector("img");

  if (!leftImg || !rightImg) {
    console.error(
      "ERROR: One or more of the required images has not been set."
    );
    return;
  }

  const leftImageObj = new Image();
  leftImageObj.src = leftImg.src;

  const righttImageObj = new Image();
  righttImageObj.src = rightImg.src;

  if (leftImageObj.width !== righttImageObj.width) {
    slider.className = `${slider.className} error`.trim();
    console.error(
      "ERROR: The two images provided are different sizes. Will display error message instead."
    );
  } else {
    slider.style.width = `${leftImageObj.width}px`;
  }
};

setSliderWidth();
const initialAnchorXPosition = getInitialAnchorXPosition();
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

  //Check if the current mouse position is within the container bounds
  const minimumContainerX = Math.floor(getOffsetX(sliderDimensions.x));
  const maximumContainerX = Math.floor(
    getOffsetX(sliderDimensions.x + sliderDimensions.width)
  );
  const inBounds =
    minimumContainerX <= e.screenX && e.screenX <= maximumContainerX;

  if (inBounds) {
    const anchorXMidPoint = Math.floor(
      anchorDimensions.x + anchorDimensions.width / 2
    );
    setImagePangePercentage(
      getOffsetX(anchorXMidPoint),
      minimumContainerX,
      sliderDimensions.width
    );
    setAnchorPosition(e.screenX);
  } else {
    const currentXPosition =
      minimumContainerX > e.screenX ? minimumContainerX : maximumContainerX;
    setImagePangePercentage(
      currentXPosition,
      minimumContainerX,
      sliderDimensions.width
    );
    setAnchorPosition(currentXPosition);
  }
});
