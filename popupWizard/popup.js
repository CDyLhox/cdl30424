// Const eyes = document.querySelector('.eyesImg');

const wizardLinks = [
'https://mlemrecords.com/mlem002/',
'https://mlemrecords.bandcamp.com/album/wacko',
	"https://stupidplusplus.com/",
	"https://lucasveerkamp.nl/"

]

const wizardQuestions = [
	'do you think this cloak suits me well?',
	'do you think i look stupid when i say simsalabim? be honest..',
	'have you listened to aching hands - up in flames yet?',
	'have you checked out wacko_ by cage.log?',
	'which staff do you think goes better with this outfit?',
	'do you think i stay in my tower too often? or am i fine still',
	'should i have applied to hogwarts after all? i sometimes feel kind of worthless.',
	'do you think ai is going to take over my job?',
	'i feel like we just dont brew together as we used to', 
	'do you think my fire spells look flimsey',
	'has my staff been.. you know, preforming well enough for you?',
	'i just feel like, you know what... nevermind.....'

];
const wizardThanks = [
	'thanks for letting me know',
	'i knew asking you was the right choice',
	'you always know how to put the brutal in brutally honest',
	'ill give it another consideration.',
	'well what would you know about it anyways',
	'i dont know why i even try',
];

function proCreate(eyes) {
	eyes.style.visibility = 'hidden';
}

function demandAttention(eyes) {
	eyes.style.visibility = 'visible';
}

function createWizard() {
	console.log("createWiz")
	const container = document.createElement('div');
	container.className = 'wizContainer';

	const wiz = document.createElement('div');
	wiz.className = 'wiz';

	 const parts = [
		{src: 'popupWizard/assets/images/body.webp', class: 'bodyImg'},
		{src: 'popupWizard/assets/images/face.webp', class: 'faceImg'},
		{src: 'popupWizard/assets/images/hat.webp', class: 'hatImg'},
		{src: 'popupWizard/assets/images/eyes.webp', class: 'eyesImg'},
	];

	for (const {src, class: cls} of parts) {
		const img = document.createElement('img');
		img.src = src;
		img.className = cls;
		wiz.append(img);
	}

	container.style.position = 'absolute';
	container.style.left = Math.random() * window.innerWidth * 1 + 'px';
	container.style.top = Math.random() * window.innerHeight * 1 + 'px';

	const script = document.createElement('script');
	script.src = 'popupWizard/popup.js';
	//container.append(script);

	const closeButton = document.createElement('button');
	closeButton.addEventListener('click', closeWizard);
	closeButton.addEventListener('click', openMoreWizards);
	closeButton.className = 'closeButton';
	closeButton.type = 'button';
	closeButton.innerHTML = 'X';

	const question = document.createElement('p');
	question.innerHTML = wizardQuestions[Math.floor(Math.random() * wizardQuestions.length)];
	question.className = 'wizardQuestion';

	const promptUser = document.createElement('input');
	promptUser.type = 'text';
	promptUser.minLength = 3;
	promptUser.name = 'userInput';
	promptUser.className = 'wizardInput';
	promptUser.placeholder = '(your answer)';
	promptUser.autocomplete = 'off';
	promptUser.size = "50";

	const userSubmit = document.createElement('input');
	userSubmit.type = 'submit';
	userSubmit.value = 'Submit';
	userSubmit.className = 'wizardSubmit';
	userSubmit.disabled = true;

	// Enable submit button only if input has 4+ characters
	promptUser.addEventListener('input', () => {
		userSubmit.disabled = promptUser.value.trim().length < 3;
	});
	const userForm = document.createElement('form');
	userForm.addEventListener('submit', e => {
		e.preventDefault(); // Prevent page reload
		pleaseWizard();
	});

	userForm.append(userSubmit);
	userForm.append(promptUser);

	container.append(closeButton);
	container.append(wiz);
	container.append(question);

	dragthisElement(container);
	const eyes = wiz.querySelector('.eyesImg');// The eyes are the window to the soul
	setInterval(() => {
		demandAttention(eyes);
	}, Math.random()*530);
	setInterval(() => {
		proCreate(eyes);
	}, Math.random()* 250);
	container.append(userForm);

	// OpenMoreWizards();
	return container;
}

let patienceCounter = 1; // Wizard's patience
function openMoreWizards() {
	if (patienceCounter > 2000) {
		window.open(wizardLinks[Math.floor(Math.random()*wizardLinks.length)]);
	}

	for (let i = 0; i < patienceCounter; i++) {
		makeWizard();
	}

	patienceCounter *= 2;
}

const wizZone = document.querySelector('#wizZone');
function makeWizard() {

	wizZone.append(createWizard());
}

function closeWizard() {
	event.target.closest('.wizContainer').remove();
}

function pleaseWizard() {
	const currentWizard = event.target.closest('.wizContainer');
	const question = currentWizard.querySelector('.wizardQuestion');
	if (question) {
		question.innerHTML = wizardThanks[Math.floor(Math.random() * wizardThanks.length)];
	}

	patienceCounter -= 1;

	setTimeout(() => {
		currentWizard.remove();
	}, 2000);
}

function myStop() {
	clearInterval(wizInterval);
}

if(Math.floor(Math.random()*2) == 0){makeWizard();}

// ______________ DRAG WIZARD ____________

const dragWizards = document.querySelectorAll('.wizContainer');
for (const dragWizard of dragWizards) {
	dragthisElement(dragWizard);
}

function dragthisElement(elemnt) {
	console.log("draggeable")
	let pos1 = 0; let pos2 = 0; let initialX = -100_000; let
		initialY = 0;

	elemnt.addEventListener('mousedown', dragMouseDown);
	elemnt.addEventListener('touchstart', dragTouchStart);

	function dragMouseDown(e) {
		// Prevent dragging if clicking an input, textarea, or button
		if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) {
			return;
		}

		e.preventDefault();
		initializeDrag(e.clientX, e.clientY);
		elemnt.style.cursor = 'grabbing';
		document.addEventListener('mouseup', closeDragElement);
		document.addEventListener('mousemove', elementDrag);
	}

	function dragTouchStart(e) {
		const touch = e.touches[0];
		if (!touch || ['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) {
			return;
		}

		initializeDrag(touch.clientX, touch.clientY);
		document.addEventListener('touchend', closeDragElement);
		document.addEventListener('touchmove', elementTouchDrag);
	}

	function initializeDrag(x, y) {
		initialX = x;
		initialY = y;
		pos1 = elemnt.offsetLeft;
		pos2 = elemnt.offsetTop;
	}

	function elementDrag(e) {
		e.preventDefault();
		dragToPosition(e.clientX, e.clientY);
	}

	function elementTouchDrag(e) {
		const touch = e.touches[0]; // Get the first touch point
		dragToPosition(touch.clientX, touch.clientY);
	}

	function dragToPosition(x, y) {
		// Calculate new position
		const deltaX = x - initialX;
		const deltaY = y - initialY;

		// Set the element's new position
		elemnt.style.left = (pos1 + deltaX) + 'px';
		elemnt.style.top = (pos2 + deltaY) + 'px';
	}

	function closeDragElement() {
		elemnt.style.cursor = 'grab';
		document.removeEventListener('mouseup', closeDragElement);
		document.removeEventListener('mousemove', elementDrag);
		document.removeEventListener('touchend', closeDragElement);
		document.removeEventListener('touchmove', elementTouchDrag);
	}
}
