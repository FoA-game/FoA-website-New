// JavaScript Document
const desc1 = `Where light reaches, grace protects.`;
const desc2 = `The human spirit is never extinguished.`;
const desc3 = `I had nothing left but pain!`;
const desc4 = `For the greater good!`;
const desc5 = `Abilities make all possible.`;
const desc6 = `May the greenery endure, and may hope last forever.`;


const introductionContainer = document.getElementById('intro-container');
const introBackButton = document.getElementById('backBtn');
const introductionMenu = document.getElementById('intro-options');
const particleDisplay = document.getElementById('particle-canvas');
const introductionTitle = document.getElementById('intro-title');

const intro_1 = document.getElementById('t1');
const intro_2 = document.getElementById('t2');
const intro_3 = document.getElementById('t3');
const intro_4 = document.getElementById('t4');
const intro_5 = document.getElementById('t5');
const intro_6 = document.getElementById('t6');

const topC = document.getElementById('topCurtain');
const botC = document.getElementById('botCurtain');

function showCurtains(){
	topC.style.top = `0vh`;
	botC.style.bottom = `0vh`;
}

function hideCurtains(){
	topC.style.top = `-11vh`;
	botC.style.bottom = `-11vh`;
}



introBackButton.addEventListener('click', ()=>{
	introBackButton.style.opacity = 0;
	particleDisplay.style.left = `45vw`;
	introductionContainer.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/default.webp');
	introductionTitle.style.opacity = 0;
	introductionMenu.style.display = `flex`;
	introductionMenu.style.opacity = 1;
	setTimeout(function(){introBackButton.style.display = `none`; introductionContainer.style.display = `none`; introductionTitle.style.display = `none`;},500);
	hideCurtains();
});

intro_1.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc1;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc1.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("UPPER NUOVARTICA",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});

intro_2.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc2;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc2.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("MIRROR CITY",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});

intro_3.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc3;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc3.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("LOWER NUOVARTICA",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});

intro_4.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc4;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc4.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("FORTRESS",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});

intro_5.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc5;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc5.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("FON BAY",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});

intro_6.addEventListener('click', ()=>{
	introductionContainer.style.display = `flex`; introductionTitle.style.display = `flex`;
	introductionContainer.innerHTML = desc6;
	introBackButton.style.display = `flex`;
	introductionContainer.style.opacity = 1;
	particleDisplay.style.left = `20vw`;
	introductionMenu.style.opacity = 0;
	animation.handlePatternShift('images/sec2ParticleSource/ptc6.webp');
	introBackButton.style.opacity = 1;
	introductionTitle.style.opacity = 1;
	slideIn("CRESCENT GARDEN",introductionTitle, 750);
	setTimeout(function(){introductionMenu.style.display = `none`;},500);
	showCurtains()
});


/* ==========================================================================
   Territory video reveal — click the title + tagline block to collapse the
   whole section to the center line, then expand a fullscreen video.
   Currently wired for Upper Nuovartica only.
   ========================================================================== */

const VIDEO_SOURCES = {
	UN: 'assets/video/upper-nuovartica.mp4?v=trim1',
	MC: 'assets/video/mirror-city.mp4?v=trim1',
	LN: 'assets/video/lower-nuovartica.mp4?v=trim1',
	FT: 'assets/video/fortress.mp4?v=trim1',
	FB: 'assets/video/fon-bay.mp4?v=trim1',
	CG: 'assets/video/crescent-garden.mp4?v=trim1'
};

const s2Scene            = document.getElementById('s2Scene');
const s2CenterLine       = document.getElementById('s2CenterLine');
const territoryVideoLayer= document.getElementById('territoryVideoLayer');
const territoryVideo     = document.getElementById('territoryVideo');
const territoryVideoClose= document.getElementById('territoryVideoClose');

let s2Busy = false;
let currentVideoSrc = null;

function s2EnableEnter(src){
	currentVideoSrc = src;
	introductionTitle.classList.add('hasVideo');
	introductionContainer.classList.add('hasVideo');
}

function s2DisableEnter(){
	currentVideoSrc = null;
	introductionTitle.classList.remove('hasVideo', 's2-hover');
	introductionContainer.classList.remove('hasVideo', 's2-hover');
}

function s2Hover(on){
	if(!currentVideoSrc) return;
	introductionTitle.classList.toggle('s2-hover', on);
	introductionContainer.classList.toggle('s2-hover', on);
}

function enterVideo(){
	if(s2Busy || !currentVideoSrc) return;
	s2Busy = true;
	if(territoryVideo.getAttribute('src') !== currentVideoSrc){
		territoryVideo.src = currentVideoSrc;
	}
	s2CenterLine.classList.add('show');
	s2Scene.classList.add('s2-collapsed');
	setTimeout(function(){
		s2CenterLine.classList.remove('show');
		territoryVideoLayer.classList.add('s2-open');
		try { territoryVideo.currentTime = 0; } catch(e){}
		territoryVideo.play().catch(function(){});
		s2Busy = false;
	}, 520);
}

function exitVideo(){
	if(s2Busy) return;
	s2Busy = true;
	territoryVideo.pause();
	territoryVideoLayer.classList.remove('s2-open');
	s2CenterLine.classList.add('show');
	setTimeout(function(){
		s2CenterLine.classList.remove('show');
		s2Scene.classList.remove('s2-collapsed');
		s2Busy = false;
	}, 520);
}

[introductionTitle, introductionContainer].forEach(function(el){
	el.addEventListener('mouseenter', function(){ s2Hover(true); });
	el.addEventListener('mouseleave', function(){ s2Hover(false); });
	el.addEventListener('click', enterVideo);
});

territoryVideoClose.addEventListener('click', exitVideo);
territoryVideo.addEventListener('ended', exitVideo);

/* each territory enables its own video; BACK disables the button */
intro_1.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.UN); });
intro_2.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.MC); });
intro_3.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.LN); });
intro_4.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.FT); });
intro_5.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.FB); });
intro_6.addEventListener('click', function(){ s2EnableEnter(VIDEO_SOURCES.CG); });
introBackButton.addEventListener('click', s2DisableEnter);
