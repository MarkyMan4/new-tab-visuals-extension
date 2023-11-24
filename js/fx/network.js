class NetworkParticle {
    constructor(effect) {
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = (Math.random() * 10) + 5;
        this.xVel = Math.random() * 2 * (Math.random() < 0.5 ? 1 : -1);
        this.yVel = Math.random() * 2 * (Math.random() < 0.5 ? 1 : -1);
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;

        if (this.x + this.radius > this.effect.width || this.x - this.radius < 0) {
            this.xVel *= -1;
        }

        if (this.y + this.radius > this.effect.height || this.y - this.radius < 0) {
            this.yVel *= -1;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'DodgerBlue';
        ctx.fill();
    }
}

class Network {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];

        this.canvas.style.backgroundImage = 'linear-gradient(orange, purple, rgb(47, 0, 68));';

        window.addEventListener('resize', (ev) => {
            this.canvas.width = ev.target.window.innerWidth;
            this.canvas.height = ev.target.window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });

        for (let i = 0; i < 200; i++) {
            this.particles.push(new NetworkParticle(this))
        }
    }

    update() {
        this.particles.forEach(p1 => {
            // check if particle is close to another particle
            // if it is, draw a line between them to get a "network" effect

            this.particles.forEach(p2 => {
                const distance = Math.sqrt(
                    Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
                );

                if (distance <= 200) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = 'white';
                    this.ctx.stroke();
                }
            });

            // draw and update the particle
            // p1.draw(this.ctx);
            p1.update();
        });
    }
}

export default Network;
