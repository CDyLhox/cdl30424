const positiveVideos = [];
const negativeVideos = [];

Promise.all([
	fetch('videos.json').then(res => res.json()),
]).then(([videoData]) => {
	const {positiveVideoPath, negativeVideoPath} = videoData;

	for (const positiveVideo of positiveVideoPath) {
		positiveVideos.push(positiveVideo);
	}

	for (const negativeVideo of negativeVideoPath) {
		negativeVideos.push(negativeVideo);
	}

	grabNextVideo('positive');
	grabNextVideo('negative');
}).catch(error => console.error('fetch error:', error));

const videoContainer = document.createElement('div');
videoContainer.className = 'videoContainer';

const positiveWrapper = document.createElement('div');
positiveWrapper.id = 'positiveVideoContainer';

const negativeWrapper = document.createElement('div');
negativeWrapper.id = 'negativeVideoContainer';

const positiveVideo = document.createElement('video');
const negativeVideo = document.createElement('video');

positiveVideo.autoplay = negativeVideo.autoplay = true;
positiveVideo.loop = negativeVideo.loop = false;
positiveVideo.muted = true;
negativeVideo.muted = true;
negativeVideo.volume = 0.2;

positiveWrapper.append(positiveVideo);
negativeWrapper.append(negativeVideo);

videoContainer.append(negativeWrapper);
videoContainer.append(positiveWrapper);

document.body.append(videoContainer);

console.log(document.querySelector('#positiveVideoContainer').getAttribute('src'));

// Updated with help of chatgpt
function grabNextVideo(type) {
	if (type === 'positive') {
		const nextSrc = positiveVideos[Math.floor(Math.random() * positiveVideos.length)];
		positiveVideo.src = nextSrc;
		positiveVideo.load();
		positiveVideo.addEventListener('canplay', function playOnce() {
			positiveVideo.removeEventListener('canplay', playOnce);
			positiveVideo.play().catch(error => console.error('Positive video play error:', error));
		});
		console.log('Loaded positive video:', nextSrc);
	} else if (type === 'negative') {
		const nextSrc = negativeVideos[Math.floor(Math.random() * negativeVideos.length)];
		negativeVideo.src = nextSrc;
		negativeVideo.load();
		negativeVideo.addEventListener('canplay', function playOnce() {
			negativeVideo.removeEventListener('canplay', playOnce);
			negativeVideo.playbackRate = 1.8;
			negativeVideo.play().catch(error => console.error('Negative video play error:', error));
		});
		console.log('Loaded negative video:', nextSrc);
	}
}

grabNextVideo('positive');
grabNextVideo('negative');

// If the last video has ended, make new video
positiveVideo.addEventListener('ended', () => grabNextVideo('positive'));
negativeVideo.addEventListener('ended', () => grabNextVideo('negative'));
