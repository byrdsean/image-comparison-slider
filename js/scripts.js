window.addEventListener("load", (event) => {
  const paneMargin = 7;
  const borderWidth = 1;

  const leftPane = document.getElementById("leftImgPane");
  const rightPane = document.getElementById("rightImgPane");
  const rangeControl = document.getElementById("rangeControl");

  //Reset the width of the left and right image containers
  rangeControl.addEventListener("input", (e) => {
    leftPane.style.width = `${e.target.value}%`;
    rightPane.style.width = `${100 - e.target.value}%`;
  });

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

    const slider = document.getElementById("sliderContainer");
    if (leftImageObj.width !== righttImageObj.width) {
      slider.className = `${slider.className} error`.trim();
      console.error(
        "ERROR: The two images provided are different sizes. Will display error message instead."
      );
    } else {
      setLeftPaneBorders();
      setRightPaneBorders();

      //Adding 16px to account for the left/right range margin and 1px border
      //left margin + right margin + left border + right margin = 7+7+1+1 = 16
      slider.style.width = `${
        leftImageObj.width + paneMargin * 2 + borderWidth * 2
      }px`;
    }
  };

  const setLeftPaneBorders = () => {
    leftPane.style.marginLeft = `${paneMargin}px`;
    leftPane.style.borderTop = `${borderWidth}px black solid`;
    leftPane.style.borderRight = `${borderWidth / 2}px black solid`;
    leftPane.style.borderBottom = `${borderWidth}px black solid`;
    leftPane.style.borderLeft = `${borderWidth}px black solid`;
  };

  const setRightPaneBorders = () => {
    rightPane.style.marginRight = `${paneMargin}px`;
    rightPane.style.borderTop = `${borderWidth}px black solid`;
    rightPane.style.borderRight = `${borderWidth}px black solid`;
    rightPane.style.borderBottom = `${borderWidth}px black solid`;
    rightPane.style.borderLeft = `${borderWidth / 2}px black solid`;
  };

  setSliderWidth();
});
