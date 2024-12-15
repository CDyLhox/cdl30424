let imgs = [];

function preload() {
  for (let i = 0; i < 10; i++) {
    imgs[i] = loadImage('../img/scriptimages/pixelsort/' + i + ".jpg");
  }
}

let img
let thisimg;

function setup() {
  let cnv = createCanvas(windowWidth / 100 * 25, windowHeight / 100 * 80);
  cnv.parent('sketch-container');
  // Resize the image so it fits on the screen.
  // We make it 100x100 so we can see individual pixels.
  thisimg = floor(random(10))
  img = imgs[thisimg];
  img.resize(random(200,500), random(200,500));

  noSmooth();
}

function draw() {
  for (let a = 0; a < 50; a++) {

    img.loadPixels();

    // Loop 100 times to speed up the animation.
    for (let i = 0; i < 100; i++) {
      sortPixels();
    }

    img.updatePixels();

    image(img, 0, 0, width, height);

  }
}

function sortPixels() {
  // Get a random pixel.
  const x = random(img.width);
  const y = random(img.height - 1);

  // Get the color of the pixel.
  const colorOne = img.get(x, y);

  // Get the color of the pixel below the first one.
  const colorTwo = img.get(x, y + 1);

  // Get the total R+G+B of both colors.
  const totalOne = red(colorOne) + green(colorOne) + blue(colorOne);
  const totalTwo = red(colorTwo) + green(colorTwo) + blue(colorTwo);

  // If the first total is less than the second total, swap the pixels.
  // This causes darker colors to fall to the bottom,
  // and light pixels to rise to the top.
  if (totalOne < totalTwo) {
    img.set(x, y, colorTwo);
    img.set(x, y + 1, colorOne);
  }
}