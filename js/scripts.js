window.addEventListener("load", (event) => {
  const getSliderDomObjects = () => {
    return {
      slider: document.getElementById("sliderContainer"),
      leftPane: document.getElementById("leftImgPane"),
      rightPane: document.getElementById("rightImgPane"),
      sliderAnchor: document.getElementById("sliderAnchor"),
      resizeWindow: document
        .getElementById("leftImgPane")
        .getElementsByClassName("window")[0],
    };
  };

  const { slider, leftPane, rightPane, sliderAnchor, resizeWindow } =
    getSliderDomObjects();
  const isVertical = slider.hasAttribute("vertical");

  let isMouseDown = false;
  slider.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    updateResizeWindow(e.clientX, e.clientY);
  });
  slider.addEventListener("mouseup", (e) => {
    isMouseDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    updateResizeWindow(e.clientX, e.clientY);
  });

  //If the user drags anchor off slider, set isMouseDown = false;
  window.addEventListener("mousemove", (e) => {
    const sliderDimensions = slider.getBoundingClientRect();
    if (e.clientX - sliderDimensions.x < 0) isMouseDown = false;
    if (e.clientX - (sliderDimensions.x + sliderDimensions.width) > 0)
      isMouseDown = false;

    if (e.clientY - sliderDimensions.y < 0) isMouseDown = false;
    if (e.clientY - (sliderDimensions.y + sliderDimensions.height) > 0)
      isMouseDown = false;
  });

  const getSliderStyleValues = () => {
    const sliderStyles = getComputedStyle(slider);
    return {
      borderTopWidth: +sliderStyles
        .getPropertyValue("border-top-width")
        .replace("px", ""),
      borderRightWidth: +sliderStyles
        .getPropertyValue("border-right-width")
        .replace("px", ""),
      borderBottomWidth: +sliderStyles
        .getPropertyValue("border-bottom-width")
        .replace("px", ""),
      borderLeftWidth: +sliderStyles
        .getPropertyValue("border-left-width")
        .replace("px", ""),
    };
  };

  const updateResizeWindow = (clientX, clientY) => {
    if (!isMouseDown) return;

    const sliderStyleVals = getSliderStyleValues();
    const heightBorder =
      sliderStyleVals.borderTopWidth + sliderStyleVals.borderBottomWidth;
    const widthBorder =
      sliderStyleVals.borderLeftWidth + sliderStyleVals.borderRightWidth;

    const sliderDimensions = slider.getBoundingClientRect();
    let xCoord = clientX - sliderDimensions.x;
    let yCoord = clientY - sliderDimensions.y;

    if (xCoord < 0) xCoord = 0;
    if (sliderDimensions.width - widthBorder < xCoord)
      xCoord = sliderDimensions.width - widthBorder;

    if (yCoord < 0) yCoord = 0;
    if (sliderDimensions.height - heightBorder < yCoord)
      yCoord = sliderDimensions.height - heightBorder;

    const anchorDimensions = sliderAnchor.getBoundingClientRect();
    if (isVertical) {
      resizeWindow.style.height = `${yCoord}px`;
      sliderAnchor.style.top = `${yCoord - anchorDimensions.height / 2}px`;
    } else {
      resizeWindow.style.width = `${xCoord}px`;
      sliderAnchor.style.left = `${xCoord - anchorDimensions.width / 2}px`;
    }
  };

  const showSlider = () => {
    slider.classList.add("show");
  };

  const setError = (errorMessage) => {
    showSlider();
    slider.classList.add("error");
    console.error(errorMessage);
  };

  const getImage = (source) => {
    const img = new Image();
    img.src = source;
    return img;
  };

  const displaySlider = () => {
    const leftImg = leftPane.querySelector("img");
    const rightImg = rightPane.querySelector("img");
    if (!leftImg || !rightImg) {
      setError("One or more of the required images has not been set.");
      return;
    }

    const leftImageSrc = getImage(leftImg.src);
    const rightImageSrc = getImage(rightImg.src);

    const isHeightEqual = leftImageSrc.height === rightImageSrc.height;
    const isWidthEqual = leftImageSrc.width === rightImageSrc.width;
    if (isHeightEqual && isWidthEqual) {
      showSlider();
    } else {
      setError(
        "The two images provided are different sizes. Will display error message instead."
      );
    }
  };

  displaySlider();
});
