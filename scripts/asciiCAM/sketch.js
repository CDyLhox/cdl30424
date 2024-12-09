// const density = 'MQW#BNqpHERmKdgAGbX8@SDO$PUkwZyF69heT0a&xV%Cs4fY52Lonz3ucJjvItr}{li?1][7<>=)(+*|!/:-,"_~^.` '
let density = ['CDLcdl0_. ', 'CDL', 'C:\Users\dylan\Documents\Electronic Arts\The Sims 4\saves\Slot_00000002.save']

// let elza
function preload() {
  // elza = loadImage('img/Elzasmall.jpeg')
  // sound = loadSound('mp3/2aug.mp3')
  // video = createVideo('img/23aprdr.mp4')
}

let p = 1
let video
let asciidiv
let runUp = 0;

function setup() {
  //plaats hier de code die maar één keer hoeft te worden uitgevoerd
  let cnv = createCanvas(windowWidth / 1.2, windowHeight / 1.2);
  slider = createSlider(0, 4);
  slider.position(120, 150);
  slider.size(80);
  // createCanvas(windowWidth, windowHeight);
  // noCanvas();
  background(0);
    // blendMode(MULTIPLY);


  video = createCapture(VIDEO)
  video.size(100, 50)
  video.size(50, 25)
  // asciidiv = createDiv();
  video.hide()

  //sound
  // cnv.mouseClicked(togglePlay);
  // fft = new p5.FFT();

  // video.play()
}

function draw() {

  background(0, 10)

  //plaats hier de code die continue herhaald moet worden.
  // image(elza,0,0,width,height)
  // let spectrum = fft.analyze();
  // noStroke();
  // fill(255, 0, 255);
  // for (let i = 0; i< spectrum.length; i++){
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h2 = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h2 )
  // }


  //video 

  let w = width / video.width;
  let h = height / video.height;

  video.loadPixels()

  // let asciiImage = ''

  for (let j = 0; j < video.height; j++) {
    // let row = ' ';
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      // const a = video.pixels[pixelIndex + 3]
      // let soundSize = fft.analyze()
      // let soundSize4 = fft.linAverages(4)
      switch(slider.value()){
        case 1:
          fill(r, g, b)
        break;
        case 2:
          fill(r+random(-255,255), g, b)
        break
        case 3:
          fill(r, g+random(-255,255), b)
        break
        case 4:
          fill(r, g, b+random(-255,255))
        break
      }

      // fill(r+random(-255,255), g, b)

      // textSize(50)
      textSize(3*(10+sin(frameCount * 0.25)));
      // textSize(50+(a/8))

      // console.log(i)

      const avg = (r + g + b) / 3


      // square(i * w, j * h, w);
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      // console.log(a)
      textAlign(CENTER, CENTER)
      text(density[p].charAt(charIndex), i * w + w * 0.5 - runUp, j * h + h * 0.5)

      text(p, i * w + w * 0.5 + runUp, j * h + h * 0.5)

      // const c = density.charAt(charIndex)//, i * w + w * 0.5, j * h + h * 0.5)
      // if (c== ' ') asciiImage+='&nbsp'
      // else asciiImage +=  c;
    }


    // console.log(row)
    // createDiv(row)
    // asciiImage += '<br/>'
  }

  switch (1) {
    case 1:
      runUp = random(100)+100*(sin(frameCount * 0.25));
    break
    case 2:
      runUp = runUp - 1
    break;

  }

  // asciidiv.html(asciiImage)


  // createButton(1, [value])
  //  body.style('color','blue')
}

function keyPressed() {
  // console.log('i have been clicked')
  // p++
}

function togglePlay() {
  // if (sound.isPlaying()) {
  //   sound.pause();
  // } else {
  //   sound.loop();
  // }
  // if (video.isPlaying()) {
  //   sound.pause();
  // } else {
  //   video.loop();
  // }
  // video.play()
  fill(255, 0, 0)
  circle(50, mouseX, mouseY)
}