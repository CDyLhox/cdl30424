const analiserContainer = document.createElement('div');
analiserContainer.className = 'analiserContainer';

const audioCtxt = new (globalThis.AudioContext || globalThis.webkitAudioContext)();

const ftCanvas = document.createElement('canvas');
ftCanvas.id = 'canvas';
const canvasContext = ftCanvas.getContext('2d');
const WIDTH = ftCanvas.width = 500;
const HEIGHT = ftCanvas.height = 150;

analiserContainer.append(ftCanvas);
let logData = '';

const usrAnalyser = audioCtxt.createAnalyser();

const nyquist = audioCtxt.sampleRate / 2;

usrAnalyser.fftSize = 1024;

usrAnalyser.smoothingTimeConstant = 0.8;

const bufferSize = usrAnalyser.frequencyBinCount;

const usrDataArray = new Uint8Array(bufferSize);

let pitchInterval;
const log = document.createElement('p');
log.id = 'log';
analiserContainer.append(log);
const negativeVideoContainer = document.querySelector('#negativeVideoContainer');

// _________ DRAW SPECTRUM _________
canvasContext.fillStyle = 'rgb(0, 0, 0)';
canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

const barWidth = (WIDTH / bufferSize) * 2.5;

let usrMax_value = -Infinity;
let usrMax_index = -1;

let x = 0;
for (let i = 0; i < bufferSize; i++) {
	const usrBarHeight = usrDataArray[i];
	if (usrBarHeight > usrMax_value) {
		usrMax_value = usrBarHeight;

		usrMax_index = i;
	}

	canvasContext.fillRect(x, HEIGHT - usrBarHeight / 2, barWidth, usrBarHeight / 2);

	x += barWidth;
}

const usrFreq = usrMax_index * (nyquist / bufferSize);

const freqDifference = 0;
const maxFreq = 0;
const logLine = 0;
const similarityPercentage = 100 - (freqDifference / maxFreq) * 100;

// _________ LOG THE LOUD __________
logData += logLine;

log.textContent = logLine;

// Check if the percentage is higher than 90, decrease negativevidopacity
if (similarityPercentage > 90) {
	var negativeOpacity = (90 - similarityPercentage) * -0.1;
	negativeVideoContainer.style.opacity = negativeOpacity;
	console.log('option 1');
} else if (similarityPercentage < 90 && negativeVideoContainer.style.opacity < 0.8) {
	console.log('option 2');
	negativeOpacity += 0.05;
	negativeVideoContainer.style.opacity = negativeOpacity;
} else {
	console.log('option 3 ');
	negativeVideoContainer.style.opacity = 0.8;
}

// ____________ audioCtx _________

if (audioCtxt.state) {
	log.textContent = 'click anywhere to begin';
	onclick = e => {
		onclick = null;
		begin();
	};
} else {
	begin();
}

function begin() {
	const localAudio = document.createElement('audio');
	localAudio.id = 'localAudio';
	document.body.append(localAudio);

	getLocalStream();
	if (audioCtxt.state === 'suspended') {
		audioCtxt.resume();
	}

	draw();
}

// PitchInterval = setInterval(newPitch, 1000);

// ____________ compare audios ___________

function draw() {
	requestAnimationFrame(draw);
	if (audioCtxt.state === 'suspended') {
		audioCtxt.resume();
	}

	usrAnalyser.getByteFrequencyData(usrDataArray);

	canvasContext.fillStyle = 'rgb(0, 0, 0)';
	canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

	let usrMax_value = -Infinity;
	let usrMax_index = -1;

	let x = 0;
	for (let i = 0; i < bufferSize; i++) {
		const usrBarHeight = usrDataArray[i];

		if (usrBarHeight > usrMax_value) {
			usrMax_value = usrBarHeight;
			usrMax_index = i;
		}

		canvasContext.fillStyle = `rgb(50, 100, ${usrBarHeight + 150})`;
		canvasContext.fillRect(x, HEIGHT - usrBarHeight / 2, barWidth, usrBarHeight / 2);

		x += barWidth;
	}

	const usrFreq = usrMax_index * (nyquist / bufferSize);

	if (currentExpectedPitch && !fullMusicUnlocked) {
		const freqDiff = Math.abs(usrFreq - currentExpectedPitch);
		// Hz tolerance
		const matchThreshold = 30;

		if (freqDiff < matchThreshold) {
			correctMotifCount++;
			console.log(`Motif match count: ${correctMotifCount}`);
			currentExpectedPitch = null;
			addSticker();

			if (correctMotifCount >= 3) {
				fullMusicUnlocked = true;
                correctMotifCount++
				console.log('LETS GET GROOVY WITHd!');
			addSticker();

				startFullMusic();
				applyWindRustleEffect('.videoContainer');
				applyWindRustleEffect('.stickerContainer');
				applyWindRustleEffect('.analiserContainer');
				applyWindRustleEffect('.motifContainer');
			}
		}
	}

	const similarityPercentage = 100 - (freqDifference / maxFreq) * 100;

	logData += logLine;
	log.textContent = logLine;

	let negativeOpacity = Number.parseFloat(negativeVideoContainer.style.opacity) || 1;

	if (similarityPercentage > 90) {
		negativeOpacity = (90 - similarityPercentage) * -0.1;
		negativeOpacity = Math.min(1, Math.max(0, negativeOpacity)); 	} else {
		negativeOpacity = Math.min(1, negativeOpacity + 0.05);
	}
}

// _________ downloadLogContent _________
function downloadLog(content) {
	const blob = new Blob([content], {type: 'text/plain'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'frequency_similarity_log.txt';
	document.body.append(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

function getLocalStream() {
	navigator.mediaDevices
		.getUserMedia({video: false, audio: true})
		.then(async stream => {
			const source = audioCtxt.createMediaStreamSource(stream);
			source.connect(usrAnalyser);
			source.connect(audioCtxt.destination); // For hearing mic input

			/* globalThis.localStream = stream; // A
			globalThis.localAudio.srcObject = stream; // B
			globalThis.localAudio.autoplay = true; // C */
		})
		.catch(error => {
			console.error(`you got an error: ${error}`);
		});
}

document.body.append(analiserContainer);
