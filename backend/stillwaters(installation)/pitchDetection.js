
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
		localAudio.id="localAudio";
	document.body.append(localAudio);
	getLocalStream();
	draw();

}

pitchInterval = setInterval(newPitch, 1000);

// ____________ compare audios ___________

function draw() {
	requestAnimationFrame(draw);
	// TODO:
	//
	genAnalyser.getByteFrequencyData(genDataArray);
	usrAnalyser.getByteFrequencyData(usrDataArray);

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
}

	function getLocalStream() {
		navigator.mediaDevices
			.getUserMedia({video: false, audio: true})
			.then(stream => {
				const source = audioCtxt.createMediaStreamSource(stream);
				source.connect(usrAnalyser);

				globalThis.localStream = stream; // A
				globalThis.localAudio.srcObject = stream; // B
				globalThis.localAudio.autoplay = true; // C
			})
			.catch(error => {
				console.error(`you got an error: ${error}`);
			});
	}
