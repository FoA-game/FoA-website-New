(function() {
    let animationFrameId = null; // 用于存储 requestAnimationFrame 的 ID
    let isPaused = false; // 控制动画是否暂停

    function init(t) {
        if (isPaused) return; // 如果暂停，则直接退出

        t /= 27000;
        let c = document.getElementById('scifi-canvas'),
            cc = c.getContext('2d'),
            w = c.width = window.innerWidth,
            h = c.height = window.innerHeight,
            increment = 50;

        cc.clearRect(0, 0, w, h);
        cc.globalCompositeOperation = 'lighter';

        for (let n = 0; n < 3; n++) {
            if (n == 0) cc.fillStyle = '#22b';
            if (n == 1) cc.fillStyle = '#96d';
            if (n == 2) cc.fillStyle = '#3af';

            for (let i = 0; i < h; i += increment) {
                for (let j = 0; j < w / 2; j += increment) {
                    let index = i * w + j;
                    cc.globalAlpha = Math.tan(index * index - t);
                    cc.fillRect(
                        Math.tan(i*j-Math.sin(index+n/100)+t)*j+w/2-increment/2,
                    i,
                    Math.tan(index+i/j+t+n/100)/2*increment/2,
                    Math.tan(index*index-t)*increment/2
                    );
                }
            }
        }

        animationFrameId = requestAnimationFrame(init);
    }

    // 暂停动画的函数
    function pauseScifiAnimation() {
        if (!isPaused) {
            isPaused = true;
            cancelAnimationFrame(animationFrameId); // 取消当前帧
        }
    }

    // 恢复动画的函数
    function resumeScifiAnimation() {
        if (isPaused) {
            isPaused = false;
            animationFrameId = requestAnimationFrame(init);
        }
    }

    // 将这两个函数挂载到 window 对象上
    window.pauseScifiAnimation = pauseScifiAnimation;
    window.resumeScifiAnimation = resumeScifiAnimation;

    // 启动动画
    init();
})();
