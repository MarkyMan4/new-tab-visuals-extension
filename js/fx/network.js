import Particle from "./particle.js";

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
            this.particles.push(new Particle(this))
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
