		
const mainContainer = document.getElementById('MEC');

		function resetEC(current){
			document.querySelectorAll('.expandableContainer').forEach(container=>{
				if(container.classList.contains('ECActive') && container != current){
					container.classList.remove('ECActive');
					container.style.opacity = '1';
					/*container.querySelector('.ECCoverImg').style.backgroundColor = `rgba(150,150,150,0.8)`;*/
				}
			});
		}
		
		function fadeOtherEC(container){
			document.querySelectorAll('.expandableContainer').forEach(EC=>{
				if(EC != container){
					EC.style.opacity = '0.7';
				}
			});
		}
		function distOtherEC(container){
			document.querySelectorAll('.expandableContainer').forEach(EC=>{
				if(EC != container){
					EC.style.opacity = '1';
				}
			});
		}
		
		const ele1 = document.getElementById('player');
		const ele2 = document.getElementById('facilitator');
		const ele3 = document.getElementById('contributor');

		function ECSwitch(container){
			if(container.classList.contains('ECActive')){
				container.classList.remove('ECActive');
				
				MEC.style.transform = `translate(-50%,-50%)`;
			}else{
				container.classList.add('ECActive');
				container.querySelector('.ECCoverImg').style.backgroundColor = `rgba(0,0,0,0)`;
				switch(container){
					case ele1:
						MEC.style.transform = `translate(-48.5%,-50%)`;
						break;
					case ele2:
						MEC.style.transform = `translate(-51%,-50%)`;
						break;
					case ele3:
						MEC.style.transform = `translate(-54.5%,-50%)`;
						break;
					default:
						MEC.style.transform = `translate(-51%,-50%)`;
						break;
				}
			}
		}
		


		
		document.querySelectorAll('.expandableContainer').forEach(container=>{
			//const LDB = document.getElementById('LDB');
			
			container.addEventListener('click',()=>{
				//console.log(container+'clicked');
				resetEC(container);
				ECSwitch(container);
				
			});
			
			/*container.addEventListener('mouseenter', ()=>{
				fadeOtherEC(container);
				LDB.innerHTML=container.id;
			});
			container.addEventListener('mouseout', ()=>{
				distOtherEC(container);
				LDB.innerHTML=``;
			});*/
		});
