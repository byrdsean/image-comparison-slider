window.addEventListener("load", (event) => {
  const getSliderDomObjects = () => {
    return {
      slider: document.getElementById("sliderContainer"),
      leftPane: document.getElementById("leftImgPane"),
      rightPane: document.getElementById("rightImgPane"),
      rangeControl: document.getElementById("rangeControl"),
      resizeWindow: document
        .getElementById("leftImgPane")
        .getElementsByClassName("window")[0],
    };
  };

  const { slider, leftPane, rightPane, rangeControl, resizeWindow } =
    getSliderDomObjects();
  const isVertical = slider.hasAttribute("vertical");

  const setVerticalRangeWidth = () => {
    if (!isVertical) return;
    const dimensions = slider.getBoundingClientRect();
    rangeControl.style.width = `${dimensions.height}px`;
  };

  window.addEventListener("resize", (e) => {
    setVerticalRangeWidth();
  });

  const showSlider = () => {
    slider.classList.add("show");
    setVerticalRangeWidth();
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

  //Reset the width of the left and right image containers
  rangeControl.addEventListener("input", (e) => {
    const property = isVertical ? "height" : "width";
    resizeWindow.style[property] = `${e.target.value}%`;
  });

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
