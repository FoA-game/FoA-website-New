
(function(){
    // 要操作的画布
    const cvs=document.getElementById('randomCodeCanvas');
    // 画布上下文
    const ctx=cvs.getContext('2d');

    // 初始化画布宽高
    function init(){
        cvs.width=window.innerWidth * devicePixelRatio;
        cvs.height=window.innerHeight * devicePixelRatio;
    }
    init();

    // 根据DPR计算字体的大小（devicePixelRatio 设备像素比）
    const fontSize=2.7 * window.innerHeight / 100 * devicePixelRatio;
    // 设置字体、字体大小（和CSS设置字体一样）
    ctx.font=`${fontSize}px "Smiley Sans Oblique"`;
    // 计算总列数（fontSize相当于每列的宽度）
    const columnCount=Math.floor(cvs.width / fontSize);
    // 根据列数创建数组并填充为0
    const charIndex=new Array(columnCount).fill(0);

    // 加载背景图片
    /*const backgroundImage = new Image();
    backgroundImage.src = 'images/site_main_bkg.webp'; // 替换为你的背景图片路径
    backgroundImage.onload = () => {
        // 每50毫秒绘制一次 （现已交由全局函数控制）
        //interval = setInterval(draw, 16.67);
    };*/

    // 绘制代码雨
    function draw(){
        // 绘制背景图片，并设置透明度
        ctx.globalAlpha = 0.2;
        //ctx.drawImage(backgroundImage, 0, 0, cvs.width, cvs.height);
		ctx.fillStyle = '#000';
		ctx.fillRect(0,0,cvs.width,cvs.height);
        ctx.globalAlpha = 1.0;

        // 设置字体颜色
        ctx.fillStyle='#37494e';
        // 设置文本基线为顶部
        ctx.textBaseline='top';
        for(let i=0;i<columnCount;i++){
            // 获取随机字符
            const text=getRandomChar();
            // 计算文字的x、y坐标
            const x=i*fontSize;
            const y=charIndex[i]*fontSize;
            // 绘制文本
            ctx.fillText(text,x,y);
            // 超出画布归零
            if(y>cvs.height && Math.random()>0.99){
                charIndex[i]=0;
            }else{
                charIndex[i]++;
            }
        }
    }

    // 获取随机字符
    function getRandomChar(){
        const str='カフアデミワンピス#$@&';
        return str[Math.floor(Math.random() * str.length)];
    }

    // 响应窗口大小调整
    window.addEventListener('resize', ()=>{
        init();
        ctx.font=`${fontSize}px "Smiley Sans Oblique"`;
    });

    // 控制代码雨的逻辑
    let interval;
    function codeRainPause(){
        clearInterval(interval);
		interval = null;
		//console.log('Audio Animation Paused.');
    }

    function codeRainResume(){
		if(!interval){
        	interval = setInterval(draw, 50);
			//console.log('Audio Animation Resumed.');
		}
    }

    // 暴露全局函数
    window.codeRainPause = codeRainPause;
    window.codeRainResume = codeRainResume;

})();
