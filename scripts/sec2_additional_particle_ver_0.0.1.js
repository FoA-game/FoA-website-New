        (function() {
            const canvas = document.getElementById('particle-bkg-canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let particles = [];
            const particleCount = 100;
            let animationFrameId;
            let isPaused = false;

            class Particle {
                constructor() {
                    this.init();
                }

                init() {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height * (0.7 + 0.2 * Math.random());
                    this.size = 2.5;
                    this.speedY = Math.random() * 0.3 + 0.1;
                    this.distance = canvas.height * (0.1 + 0.5 * Math.random());
                    this.initialOpacity = Math.random();
                    this.opacity = 0;
                    this.fadeInSpeed = Math.random() * 0.05 + 0.02;
                    this.fadeOutSpeed = Math.random() * 0.02 + 0.01;
                    this.color = `rgba(255, 255, 255, ${this.opacity})`;
                    this.travelled = 0;
                    this.fadingOut = false;
                }

                update() {
                    if (this.fadingOut) {
                        this.opacity -= this.fadeOutSpeed;
                        if (this.opacity <= 0) {
                            this.init();
                        }
                    } else {
                        if (this.opacity < this.initialOpacity) {
                            this.opacity += this.fadeInSpeed;
                            if (this.opacity > this.initialOpacity) this.opacity = this.initialOpacity;
                        } else {
                            this.y -= this.speedY;
                            this.travelled += this.speedY;
                            if (this.travelled > this.distance) {
                                this.fadingOut = true;
                            }
                        }
                    }
                    this.color = `rgba(70, 70, 70, ${this.opacity})`;
                }

                draw() {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.x, this.y, this.size, this.size);
                }
            }

            function initParticles() {
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function animate() {
                if (isPaused) return;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                animationFrameId = requestAnimationFrame(animate);
            }

            function pauseAnimation() {
                isPaused = true;
                cancelAnimationFrame(animationFrameId);
            }

            function resumeAnimation() {
                if (!isPaused) return;
                isPaused = false;
                animate();
            }

            /*window.addEventListener('resize', () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initParticles();
                if (!isPaused) {
                    animate();
                }
            });
*/			
            initParticles();
            animate();

            // Expose the pause and resume functions to the global scope
            window.pauseSec3Animation = pauseAnimation;
            window.resumeSec3Animation = resumeAnimation;
        })();