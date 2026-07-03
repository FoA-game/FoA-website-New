// JavaScript Document
let currentSection = 0;
        const sections = document.querySelectorAll('.section');
        const totalSections = sections.length;
        let isAnimating = false;

const FBL = document.getElementById('frameBarLeft');
const FBR = document.getElementById('frameBarRight');

const navBar = document.getElementById('navBar');

	const sessionBtn1 = document.getElementById('sb1');
	const sessionBtn2 = document.getElementById('sb2');
	const sessionBtn3 = document.getElementById('sb3');
	const sessionBtn4 = document.getElementById('sb4');
	const sessionBtn5 = document.getElementById('sb5');
		
	const sessionCon1 = document.getElementById('sc1');
	const sessionCon2 = document.getElementById('sc2');
	const sessionCon3 = document.getElementById('sc3');
	const sessionCon4 = document.getElementById('sc4');
	const sessionCon5 = document.getElementById('sc5');

const navBtns = [sessionBtn1, sessionBtn2, sessionBtn3, sessionBtn4, sessionBtn5];
const navCons =[sessionCon1, sessionCon2, sessionCon3, sessionCon4, sessionCon5];

const scrollNotice = document.getElementById('scrollNotice');

const archiveContainer = document.getElementById('archiveContainer');
let archiveInitiationStatus = 0;

		function resetNavBtns(){
			navBtns.forEach(btn =>{
				if(btn.classList.contains('navBtnIndicate')){
					btn.classList.remove('navBtnIndicate');
				}
			});
		}
		
		function resetNavCons(){
			navCons.forEach(con =>{
				if(!con.classList.contains('navConplexCollapse')){
					con.classList.add('navConplexCollapse');
				}
			});
		}


        function updateSections(nextSection, direction) {
            isAnimating = true;
			scrollNotice.style.display = `none`;
			if(navBar.classList.contains('mainNavHidden')){
				navBar.classList.remove('mainNavHidden');
			}
			
			//翻页触发器
			if(nextSection === 1){
				
			}
			if(nextSection === 2){
				activeParallax = 1;
				window.pauseScifiAnimation();
				window.codeRainResume();
			}else{
				activeParallax = 0;
				window.resumeScifiAnimation();
				window.codeRainPause();
			}
			if(nextSection === 3){
			}
			
			//翻页动画定义
			setTimeout(() =>{
				if (direction === 'down') {
                	sections[currentSection].style.clipPath = `inset(0 0 100% 0)`;
                	sections[nextSection].style.clipPath = `inset(0 0 0 0)`;
					FBL.style.transitionDuration = `0.75s`;
					FBL.style.bottom = `100vh`;
            	} else {
                	sections[currentSection].style.clipPath = `inset(100% 0 0 0)`;
                	sections[nextSection].style.clipPath = `inset(0 0 0 0)`;
					FBR.style.transitionDuration = `0.75s`;
					FBR.style.top = `100vh`;
            	}
			},5);
            

            setTimeout(() => {
				for(prev = 0; prev<nextSection; prev++){
					sections[prev].style.transitionDuration = `0s`;
                    sections[prev].style.clipPath = `inset(0 0 100% 0)`;
					sections[prev].style.transitionDuration = `0.75s`;
				}
                
				for(nxt = 4; nxt>nextSection; nxt--){
					sections[nxt].style.transitionDuration = `0s`;
                    sections[nxt].style.clipPath = `inset(100% 0 0 0)`;
					sections[nxt].style.transitionDuration = `0.75s`;
				}
				
				if(nextSection != 0 && nextSection != 1){
					navControl = 0;
					if(navBar.classList.contains('mainNavHidden')){
						navBar.classList.remove('mainNavHidden');
				}
				}else{
					navControl = 0;
				}
            }, 50);
			
			setTimeout(()=>{
				resetNavBtns();
				resetNavCons();
				navBtns[nextSection].classList.add('navBtnIndicate');
				navCons[nextSection].classList.remove('navConplexCollapse');
			},25);
			
			setTimeout(() =>{
				currentSection = nextSection;
				for(index = 0; index < 5; index ++){
					if(index != currentSection && sections[index].style.display != `none`){
						sections[index].style.display = `none`;
						//console.log('Render layer: '+index+' successfully fired.');
					}
				}
				//currentSection.front = "1";
				
				FBR.style.transitionDuration = `0s`;
				FBL.style.transitionDuration = `0s`;
				FBR.style.top = `-2px`;
				FBL.style.bottom = `-2px`;
				
				

			}, 750);
			setTimeout(()=>{
				isAnimating = false;
				/*if(!navBar.classList.contains('mainNavHidden')){
					navBar.classList.add('mainNavHidden');
				}*/
				//console.log('!EVENT: AniFinish');
			},760);
        }

        function scrollToSection(index) {
            if (isAnimating || index < 0 || index >= totalSections || index === currentSection) return;
            const direction = index > currentSection ? 'down' : 'up';
            updateSections(index, direction);
        }
		
		sessionBtn1.addEventListener('click', function(){
			if(isAnimating === false){
				sections[0].style.display = `flex`;
				scrollToSection(0);
			}
		});
		sessionBtn2.addEventListener('click', function(){
			if(isAnimating === false){
				sections[1].style.display = `flex`;
				scrollToSection(1);
			}
		});
		sessionBtn3.addEventListener('click', function(){
			if(isAnimating === false){
				sections[2].style.display = `flex`;
				scrollToSection(2);
			}
		});
		
		sessionBtn4.addEventListener('click', function(){
			if(isAnimating === false){
				sections[3].style.display = `flex`;
				scrollToSection(3);
			}
		});


		sessionBtn5.addEventListener('click', function(){
			if(isAnimating === false){
				sections[4].style.display = `flex`;
				scrollToSection(4);
			}
		});
		
		
        window.addEventListener('wheel', (event) => {
            if (isAnimating){
				return;
			}
			
			if(scrollHolder === 1){
				if (event.deltaY > 0) {
					// Scroll down
					if(currentSection+1 < 5){
						sections[currentSection+1].style.display = `flex`;
						scrollToSection(currentSection + 1);
					}
				} else {
					// Scroll up
					if(currentSection-1 > -1){
						sections[currentSection-1].style.display = `flex`;
						scrollToSection(currentSection - 1);

					}
				}
			}
        });

        let touchStartY = 0;
        let touchEndY = 0;

        window.addEventListener('touchstart', (event) => {
            touchStartY = event.changedTouches[0].screenY;
        });

        window.addEventListener('touchend', (event) => {
            touchEndY = event.changedTouches[0].screenY;
            if (isAnimating){
				return;
			}
			if(scrollHolder === 1){
				if (touchStartY > touchEndY + 50) {
					// Scroll down
					if(currentSection+1 < 5){
						sections[currentSection+1].style.display = `flex`;
						scrollToSection(currentSection + 1);
					}
				} else if (touchStartY < touchEndY - 50) {
					// Scroll up
					if(currentSection-1 > -1){
						sections[currentSection-1].style.display = `flex`;

						scrollToSection(currentSection - 1);

					}
				}
			}
        });

//开发信息
window.addEventListener('load',()=>{
	const img = new Image();
        //img.crossOrigin = 'Anonymous'; // 允许跨域加载图片
        img.src = 'scripts/signature.png';
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL();
			console.log('@子桑牧之(Yutong Tang)');
			console.log('yt.tang@mail.utoronto.ca');
			console.log('%c ', `font-size: 100px; background: url(${dataURL}) no-repeat;`);
		}
	
});
		