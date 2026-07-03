function slideIn(text, container, duration) {
  container.innerHTML = ''; // 清空目标容器
  const fontSize = (container.offsetHeight/window.innerHeight)*100;
  const totalFrames = 60; // 假设动画在60帧内完成

  [...text].forEach((char, index) => {
    const charContainer = document.createElement('span');
	if(char === ' '){
		charContainer.textContent = char;
    	charContainer.style.display = 'inline-block';
    	charContainer.style.fontSize = `${fontSize}vh`;
    	charContainer.style.opacity = 0;
    	charContainer.style.transform = 'translateX(10%)';
    	charContainer.style.clipPath = 'inset(0 100% 0 0)';
		charContainer.style.width = `${fontSize/2.3}vh`;
    	container.appendChild(charContainer);
	}else{
    	charContainer.textContent = char;
    	charContainer.style.display = 'inline-block';
    	charContainer.style.fontSize = `${fontSize}vh`;
    	charContainer.style.opacity = 0;
    	charContainer.style.transform = 'translateX(10%)';
    	charContainer.style.clipPath = 'inset(0 100% 0 0)';
    	container.appendChild(charContainer);
	}
    const delay = index * (duration / text.length);
    
    setTimeout(() => {
      let frame = 0;

      function animate() {
        frame++;
        const progress = frame / totalFrames;
        charContainer.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        charContainer.style.transform = `translateX(${(1 - progress) * 10}%)`;
        charContainer.style.opacity = progress;

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        }
      }
      animate();
    }, delay);
  });
}