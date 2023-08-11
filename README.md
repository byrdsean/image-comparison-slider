# Image Comparison Slider

## Description

Image Comparison Slider using HTML, CSS, and Javascript (no libraries).

This slider uses plain vanilla Javascript to create an image comparison slider tool. It takes two images and displays in one component. A slider button is placed in the middle, allowing the user to hide a percentage of one image, and show the remaining percentage of the other image.

## How to use

1. Copy the `img-compare-slider.min.css` and `img-compare-slider.min.js` files (located in the `dest` folder of this repository) to your project.
2. Add a `<link/>` tag inside the `<head/>` of your HTML that references the `img-compare-slider.min.css` file you copied.
3. At the end of your HTML `<body>` tag, add a `<script/>` tag that references the `img-compare-slider.min.js` file you copied.
4. Place a `<div/>` tag within the body of your HTML, and add the class `img-compare-slider` to it.
   > **NOTE**: The slider slides horizontally by default. If you want to slider vertically, add the `vertical` attibute to the `<div/>`.
5. Within the `<div class="img-compare-slider"/>`, add two `<img/>` tags, one for each img you want to display in the slider.

   > **NOTE**: The two images should have identical dimensions. If not, the slider will not display and an error message will show in your browser console.

## How to build and run this project

### Prerequisites

You should have the following installed on your computer:

1. Node.js
2. npm

### Instructions

1. Clone this repository.
2. Run `npm install` to install all node modules.
3. Run `npm run build`. This will:
   - Compile the Sass (\*.scss) files to CSS.
   - Minify the CSS.
   - Minify the Javascript.
   - Place the minified files into the `dest` folder.

> **NOTE**: In the root of this repository is an `index.html` file. This is a sample that shows the horizontal and vertical versions of the image slider.

## Screenshots

### Horizontal Slider

![Horizontal Slider](/notes/images/horizontal_slider.jpg)

### Vertical Slider

![Vertical Slider](/notes/images/vertical_slider.jpg)

## Built With

- Javascript
- CSS / Sass
- HTML

## Purpose of building this project

I wanted to challenge myself and build a cool image widget that can be used on websites, _without_ the need for any Javascript libraries. I believe the only way to get better at programming is to learn by doing. Getting a sense of pride from accomplishing this build is just as worthwhile as the experience I gained.

## Author

**Sean Byrd**

- [Github](https://github.com/byrdsean "Sean Byrd")
- [LinkedIn](https://www.linkedin.com/in/seanbyrd/ "LinkedIn")
