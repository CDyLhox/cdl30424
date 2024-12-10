let density = ' CDLcdl0_. ';
let video, asciidiv, mode = 1, counter, amount = 110, avg, cdl;

function preload() {
  cdl = loadImage('../img/basicimg/2,5.png');
}

function setup() {
  noCanvas();

  video = createVideo('../img/basicimg/aprdr.mp4');
  video.size(250, 200);
  asciidiv = createDiv();



  // Style the div
  asciidiv.style('width', '96%');
  asciidiv.style('height', '10%');  // Set the height
  asciidiv.style('position', 'absolute')
  asciidiv.style('top','0px')
  asciidiv.style('left','0px')
  // asciidiv.style('z-index',)
  
  // asciidiv.style('background-color', 'rgb(0,0,0)');  // Set background color
  asciidiv.style('color', "rgb(193, 0, 71)");  // Set text color (ASCII art)
  asciidiv.style('font-size', '11px');  // Set font size
  asciidiv.style('line-height', '6px');  // Set line height for ASCII art
  asciidiv.style('white-space', 'pre');  // Keep whitespace formatting for ASCII
  asciidiv.style('font-family', 'monospace');  // Use monospace font for ASCII look


  asciidiv.parent('sketch-container'); // Add to the div container in the HTML
  video.hide();
  frameRate(60);
}

function draw() {
  // if (frameCount == 100) {
  //   video.play();
  // }

  counter = frameCount % (amount + 2);
  if (counter > amount) {
    mode = floor(random(10));
    density = ' CDLcdl0_. ' + mode;
  }

  if (frameCount > 899 && mode == 10) {
    mode = 1;
  }

  video.loadPixels();
  cdl.loadPixels();

  let asciiImage = '';

  for (let j = 0; j < video.height; j++) {
    // let row = ' ';
    for (let i = 0; i < video.width; i++) {
      switch (1) {
        case 1:
          pixelIndex = (i + j * video.width) * 4
          r = video.pixels[pixelIndex + 0];
          g = video.pixels[pixelIndex + 1];
          b = video.pixels[pixelIndex + 2];
          a = video.pixels[pixelIndex + 3];
          break;
        case 2:
          pixelIndex = (i + j * cdl.width) * 4
          r = cdl.pixels[pixelIndex + 0];
          g = cdl.pixels[pixelIndex + 1];
          b = cdl.pixels[pixelIndex + 2];
          a = video.pixels[pixelIndex + 2] + video.pixels[pixelIndex + 3];
          break;


      }

      switch (mode) {
        case 1:
          a = a + frameCount % 360
          // asciidiv.style("left"+random(5000))
          break;
        case 2:
          a = a - frameCount % 360000
          // asciidiv.style('color', "rgb(193, 0, 71)");  // Set text color (ASCII art)
          // console.log("framecount (36) " + frameCount % 3600)
          break;
        case 3:
          a = a * frameCount % 360
          asciidiv.style('color', "rgb("+r+ ","+ g +","+ b +')');  // Set text color (ASCII art)
          break;
        case 4:
          a = frameCount % 36
          asciidiv.style('color', "rgb(193, 0, 71)");  // Set text color (ASCII art)
          break;
        case 5:
          a = 0 + "." + video.pixels[pixelIndex + 1] + video.pixels[pixelIndex + 3];
          break;
        case 6:
          a = a
          asciidiv.style('color', "rgb(155, 155, 160)");  // Set text color (ASCII art)
          break;
        case 7:
          a = r - b + 300
          break;
        case 8:
          a = random(255)
          break;
        case 9:
          a = 500 * noise(0.05 * frameCount);
          break;
        case 10:
          a = 50 / noise(0.05 * frameCount);
          break;
      }
      // console.log(mode)
      // mode = floor(10 % (frameCount % 18))
      // if (frameCount % 250 === 0) {
      //   console.log("change")

      // }


      // mode = 10

      switch (1) {
        case 1:
          avg = (r + g + b + a) / 3
          break;
        case 2:
          avg = (r + g + b - a) / 3
          break;
        case 3:
          avg = (r + g + b + a) / 2
          break;
        case 4:
          avg = ((r + g + b - a) / 3) + ((r + g + b + a) / 3) / 2
          break;
        case 5:
          avg = (r + g + b) / 3
          break;
      }
      // asciidiv.style('color', "rgb("+r+ ","+ g +","+ b +')');  // Set text color (ASCII art)
      // noStroke();
      // fill(255);
      // square(i * w, j * h, w);

      // asciidiv.style("color:rgb("+ r + "," + g + "," +  b + ")" )
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));

      // textSize(w)
      // textAlign(CENTER, CENTER)
      //text(density.charAt(charIndex))
      const c = density.charAt(charIndex)//, i * w + w * 0.5, j * h + h * 0.5)
      if (c == ' ') asciiImage += '&nbsp'
      else asciiImage += c;
    }


    // console.log(row)
    // createDiv(row)
    asciiImage += '<br/>'
  }
  // console.log("mode " + mode + " " + frameCount)
  asciidiv.html(asciiImage)

  if (random(10) == 2) {
    asciidiv.style("text-decoration-line:line-through;");
  } else if (random(10) == 5) {
    asciidiv.style("text-decoration-line:none;");
  }
}

function mouseClicked() {
  mode++;
}

// Show the sketch container on button click
document.getElementById('trigger-btn').addEventListener('click', function () {
  // document.getElementById('sketch-container').style.color = "rgb(193, 0, 71);";
  video.play();
  document.getElementById('sketch-container').style.display = 'block';
});
