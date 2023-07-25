window.addEventListener("load", (event) => {
  const buildDom = (tag, classes, children) => {
    const domElement = document.createElement(tag);
    classes?.forEach((className) => {
      domElement.classList.add(className);
    });
    children?.forEach((child) => {
      domElement.appendChild(child);
    });
    return domElement;
  };

  const buildImageContainer = (image1, image2) => {
    const window = buildDom("div", ["window"], [image1]);
    const leftImgPane = buildDom("div", ["img-pane", "left"], [window]);
    const rightImgPane = buildDom("div", ["img-pane", "right"], [image2]);
    return buildDom("div", ["sliderImgContainer"], [leftImgPane, rightImgPane]);
  };

  const buildErrorContainer = () => {
    const para = buildDom("p", null, null);
    para.innerHTML = "Unable to load data";

    const errorTitle = buildDom("div", ["errorTitle"], null);
    errorTitle.innerHTML = "Image Comparison Slider";

    return buildDom("div", ["errorContainer"], [errorTitle, para]);
  };

  const buildAnchorDom = () => {
    const sliderAnchorButton = buildDom("div", ["sliderAnchorButton"], null);
    const sliderAnchor = buildDom(
      "div",
      ["sliderAnchor"],
      [sliderAnchorButton]
    );
    return buildDom("div", ["sliderAnchorContainer"], [sliderAnchor]);
  };

  const buildSliderReset = () => {
    const resetBtn = buildDom("button", ["sliderResetBtn"], null);
    resetBtn.innerHTML = "reset";
    return buildDom("div", ["sliderReset"], [resetBtn]);
  };

  const buildSliderDom = (imgSlider) => {
    const images = Array.from(imgSlider.querySelectorAll("img"));

    //Remove all children
    while (imgSlider.firstChild) {
      imgSlider.removeChild(imgSlider.firstChild);
    }

    imgSlider.classList.add("sliderContainer");
    imgSlider.appendChild(buildAnchorDom());
    imgSlider.appendChild(buildSliderReset());
    imgSlider.appendChild(buildImageContainer(images[0], images[1]));
    imgSlider.appendChild(buildErrorContainer());
  };

  const imageCompareSliders =
    document.getElementsByClassName("img-compare-slider");
  Array.from(imageCompareSliders).forEach((slider) => {
    buildSliderDom(slider);

    const getSliderDomObjects = () => {
      return {
        leftPane: slider.getElementsByClassName("img-pane left")[0],
        rightPane: slider.getElementsByClassName("img-pane right")[0],
        sliderAnchor: slider.getElementsByClassName("sliderAnchor")[0],
        resizeWindow: slider
          .getElementsByClassName("img-pane left")[0]
          .getElementsByClassName("window")[0],
        resetBtn: slider.getElementsByClassName("sliderResetBtn")[0],
      };
    };

    const { leftPane, rightPane, sliderAnchor, resizeWindow, resetBtn } =
      getSliderDomObjects();
    const isVertical = slider.hasAttribute("vertical");

    let isMouseDown = false;
    slider.addEventListener("mousedown", (e) => {
      isMouseDown = true;

      if (e.target.id === resetBtn.id) {
        resetResizeDimensions();
      } else {
        updateResizeWindow(e.clientX, e.clientY);
      }
    });
    slider.addEventListener("mouseup", (e) => {
      isMouseDown = false;
    });
    slider.addEventListener("mousemove", (e) => {
      updateResizeWindow(e.clientX, e.clientY);
    });

    const setResizeDimensions = (height, width) => {
      const anchorDimensions = sliderAnchor.getBoundingClientRect();
      if (isVertical) {
        resizeWindow.style.height = `${height}px`;
        sliderAnchor.style.top = `${height - anchorDimensions.height / 2}px`;
      } else {
        resizeWindow.style.width = `${width}px`;
        sliderAnchor.style.left = `${width - anchorDimensions.width / 2}px`;
      }
    };

    const resetResizeDimensions = () => {
      const sliderDimensions = slider.getBoundingClientRect();
      const middleHeight = sliderDimensions.height / 2;
      const middleWidth = sliderDimensions.width / 2;
      setResizeDimensions(middleHeight, middleWidth);
      resetBtn.classList.remove("show");
    };

    window.addEventListener("resize", (e) => {
      resetResizeDimensions();
    });

    window.addEventListener("mouseup", (e) => {
      isMouseDown = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;

      const sliderDimensions = slider.getBoundingClientRect();
      const styles = getSliderStyleValues();

      if (isVertical) {
        if (e.clientY < sliderDimensions.y) {
          setResizeDimensions(0, e.clientY);
        } else if (e.clientY > sliderDimensions.y + sliderDimensions.height) {
          const heightBorder = styles.borderTopWidth + styles.borderBottomWidth;
          setResizeDimensions(
            sliderDimensions.height - heightBorder,
            e.clientX
          );
        }
      } else {
        if (e.clientX < sliderDimensions.x) {
          setResizeDimensions(e.clientY, 0);
        } else if (e.clientX > sliderDimensions.x + sliderDimensions.width) {
          const widthBorder = styles.borderLeftWidth + styles.borderRightWidth;
          setResizeDimensions(e.clientY, sliderDimensions.width - widthBorder);
        }
      }
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

      setResizeDimensions(yCoord, xCoord);
      resetBtn.classList.add("show");
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
});
