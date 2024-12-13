

function preload() {
  mom = createVideo('img/scriptimages/slitscan/candlemotion.mp4');
  video = createVideo('/img/scriptimages/slitscan/23aprdr2.mp4');
  song = loadSound('music/scriptwavs/slitscanwavs/SSTV.SSi.wav');
}


var x = 0
var x2 = 0
let videowidth;
let videoheight;

let video
let video2
let mom

let song

let slider
let slider2
let slider3
let slider4

let fft
let hasplayed = false




let x2Dir = 1; // Direction for x2

class Scanner {
  constructor(video, x, speed, waveAmplitude, waveFrequency) {
    this.video = video;
    this.x = x; // Horizontal scan position
    this.speed = speed; // Speed of the scan
    this.waveAmplitude = waveAmplitude; // Amplitude of the distortion
    this.waveFrequency = waveFrequency; // Frequency of the distortion
  }

  update(bandEnergy, atime) {
    // Map band energy to speed and distortion
    this.speed = map(bandEnergy, 0, 255, 1, 200); // Speed based on energy
    this.waveAmplitude = map(bandEnergy, 0, 255, 0, 50); // Distortion amplitude
    this.waveFrequency = map(bandEnergy, 0, 255, 0.1, 2); // Distortion frequency
  }

  draw(sliceWidth, yscan, atime) {
    let startX = this.x;
    this.x = (this.x + this.speed) % this.video.width;

    // Calculate the number of slices needed to fill the gap
    let steps = ceil(abs(this.x - startX) / sliceWidth);
    let stepSize = (this.x - startX) / steps;

    for (let i = 0; i < steps; i++) {
      let currentX = (startX + i * stepSize) % this.video.width;
      let destX = map(currentX, 0, this.video.width, 0, windowWidth);

      // Apply sine wave distortion
      let distortion = sin(destX * this.waveFrequency + atime) * this.waveAmplitude;

      // Copy the slice from the video with added distortion

      copy(
        this.video,
        floor(currentX),      // Convert to integer
        0,
        floor(sliceWidth),    // Convert to integer
        floor(this.video.height), // Convert to integer
        floor(destX),         // Convert to integer
        0,
        floor(sliceWidth),    // Convert to integer
        floor(yscan + distortion) // Convert to integer
      );

    }
  }
}



let scanners = [];
let scannerCount = 8;

function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight / 2);
  cnv.parent('sketch-container');

  background(10, 0, 0);
  videowidth = 320;
  videoheight = 240;

  video.size(videowidth, videoheight);
  video.loop();
  video.hide();
  video.volume(0);

  mom.size(videowidth, videoheight);
  mom.loop();
  mom.hide();
  mom.volume(0);

  // slider = createSlider(0.1, 100, 3.2, 0.1);
  // slider.position(10, 10);
  // slider.size(100);

  fft = new p5.FFT(0.1, 128);

  // Initialize scanners with random parameters
  for (let i = 0; i < scannerCount; i++) {
    scanners.push(
      new Scanner(
        video,
        random(video.width),
        random(300, 500), // Random initial speed
        random(10, 50), // Random initial wave amplitude
        random(0.5, 5) // Random initial wave frequency
      )
    );
  }



  blendMode(BLEND); // Add a surreal blending effect
}

function draw() {
  cnv.mousePressed(playsound);
  let atime = millis() / 1000; // Current atime in seconds for animations



  if (!song.isPlaying() && hasplayed == false) {
    background(10, 0, 0, 5);
  } else if (!song.isPlaying() && hasplayed == true) {
    background(10, 0, 0, 5);
    strokeWeight(20);
    stroke(100, 0, 255);
    textAlign(CENTER);
    textSize(windowWidth / 23);
    text(
      "AAAAAAAAAHAHAHAHAHAHAHA",
      windowWidth / 2,
      windowHeight / 2
    );
  } else {
    textSize(windowWidth / 53);
    textAlign(LEFT)
    strokeWeight(2);
    let spectrum = fft.analyze(); // Get the frequency spectrum
    let numScanners = scanners.length;
    let bandsPerScanner = floor(spectrum.length / numScanners);
    let atime = millis() / 1000;

    // tint(255, 50);

    image(mom, 0, 0, windowWidth, windowHeight);

    let sliceWidth = 1; // Width of each slice
    let yscan = map(video.height, 0, 240, 0, windowHeight);

    // Map FFT bands to scanners
    for (let i = 0; i < numScanners; i++) {
      let bandStart = i * bandsPerScanner;
      let bandEnd = bandStart + bandsPerScanner;
      let bandEnergy = spectrum.slice(bandStart, bandEnd).reduce((a, b) => a + b, 0) / bandsPerScanner;


      scanners[i].update(bandEnergy, atime); // Update scanner with band energy
      scanners[i].draw(sliceWidth, yscan, atime); // Draw the scanner
    }

    let amplitude = getAmplitude(spectrum);

    // Find the most active band and its amplitude

    if (amplitude < 150) {

      let playbackSpeed = map(amplitude, 0, 255, 0.1, 1);
      mom.speed(playbackSpeed);
      tint(255, 100)
    } else {
      let playbackSpeed = map(amplitude, 0, 255, 1, 16)
      mom.speed(playbackSpeed);
      tint(255, 100, 200, 200)
    }

    // Debug info
    fill(255);
    text(`Amplitude: ${amplitude}`, 10, 120);

    // Increase exposure by overlaying a semi-transparent white layer
    // blendMode(ADD); // Additive blend mode for a brighter effect
    // fill(255, 1); // Semi-transparent white
    // rect(0, 0, width, height); // Cover the entire canvas with the white layer
    // blendMode(DIFFERENCE); // Reset to default blend mode
  }


}

function playsound() {
  userStartAudio();
  if (song.isPlaying()) {
    song.pause();
  } else {
    hasplayed = true;
    song.play();
  }
  fill(255, 0, 0);
  circle(50, 50, 50);
}

function getAmplitude(spectrum) {
  let sum = 0;
  for (let i = 0; i < spectrum.length / 4; i++) {
    sum += spectrum[i];
  }
  return sum / (spectrum.length / 4);
}
