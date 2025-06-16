let stickersPathArray = [];
fetch('stickers.json').then(res => res.json()).then((stickersData) => {
const {stickersPath} = stickersData;

    for (const sticker of stickersPath){
    stickersPathArray.push(sticker);
    }

}).catch(error => console.error('fetch error',error));

let stickerContainer = document.createElement('div');
stickerContainer.className = "stickerContainer";

let sticker 
function addSticker(){
    //stickersList[correctMotifCount] =
    console.log("ooh nice you get a sticker for that ")

    sticker =  document.createElement('img');
    sticker.src = stickersPathArray[Math.floor(Math.random()*stickersPathArray.length)];
    sticker.className ="sticker"
    stickerContainer.appendChild(sticker);
    document.body.style.filter = 'saturate('+ 100 * (correctMotifCount)+ '%)';
    negativeVideoContainer.style.opacity = 0.8/correctMotifCount;
}


//TODO
function applyWindRustleEffect(selector) {
  const elements = document.querySelectorAll(selector);
  const rustleParams = [];

  elements.forEach((el) => {
    rustleParams.push({
      el,
      baseX: 0,
      baseY: 0,
      baseRot: 0,
      offsetX: Math.random() * 5,
      offsetY: Math.random() * 5,
      offsetRot: Math.random() * 2,
      speed: 0.0002 + Math.random() * 0.0003,
      phase: Math.random() * Math.PI * 2
    });
  });

  let startTime = null;
  const fadeInDuration = 2000; 
    function animate(time) {
    if (startTime === null) startTime = time;
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / fadeInDuration, 1); 

    rustleParams.forEach(p => {
      const angle = time * p.speed + p.phase;
      const x = Math.sin(angle) * p.offsetX * progress;
      const y = Math.cos(angle) * p.offsetY * progress;
      const rot = Math.sin(angle) * p.offsetRot * progress;

      p.el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


document.body.appendChild(stickerContainer);
