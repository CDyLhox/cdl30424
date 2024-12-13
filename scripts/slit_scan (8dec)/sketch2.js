




let scanners = [];
let scannerCount = 8;

function setup() {
  cnv = createCanvas(windowWidth/2, windowHeight /2);
  cnv.parent('sketch-container');
  
}

function draw() {
circle(random(50),random(50),random(50),random(50),)
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
