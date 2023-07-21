window.addEventListener("load", (event) => {
  const getSliderDomObjects = () => {
    return {
      slider: document.getElementById("sliderContainer"),
      leftPane: document.getElementById("leftImgPane"),
      rightPane: document.getElementById("rightImgPane"),
      rangeControl: document.getElementById("rangeControl"),
    };
  };

  const { slider, leftPane, rightPane, rangeControl } = getSliderDomObjects();

  const isVertical = slider.hasAttribute("vertical");
  const showSlider = () => slider.classList.add("show");

  //Reset the width of the left and right image containers
  rangeControl.addEventListener("input", (e) => {
    const property = isVertical ? "height" : "width";
    leftPane.style[property] = `${e.target.value}%`;
    rightPane.style[property] = `${100 - e.target.value}%`;
  });

  const setSliderDimensions = (height, width) => {
    const separationWidth = 1;
    const margin = 7;
    const extraSpace = 2 * margin + 2 * separationWidth;

    slider.style.height = `${height + extraSpace}px`;
    slider.style.width = `${width + extraSpace}px`;

    if (isVertical) {
      slider.style.height = `${height}px`;
      rangeControl.style.width = `${height + extraSpace}px`;

      const imgContainer = document.getElementById("sliderImgContainer");
      imgContainer.style.height = `${height - separationWidth}px`;
      imgContainer.style.width = `${width}px`;
    }
  };

  const getImage = (source) => {
    const img = new Image();
    img.src = source;
    return img;
  };

  const setError = (errorMessage) => {
    slider.classList.add("error");
    console.error(errorMessage);
    showSlider();
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
      setSliderDimensions(leftImageSrc.height, leftImageSrc.width);
      showSlider();
    } else {
      setError(
        "The two images provided are different sizes. Will display error message instead."
      );
    }
  };

  displaySlider();
});
