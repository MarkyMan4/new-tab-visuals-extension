class Sunset {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = ctx;
        this.stars = [];
        this.moon = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 4,
            radius: 50,
            xVel: 1,
            angle: 0
        };

        this.canvas.style.backgroundImage = 'linear-gradient(black, rgb(0, 48, 119), rgb(60, 0, 128), rgb(160, 15, 34), rgb(110, 59, 0))';

        window.addEventListener('resize', (ev) => {
            this.canvas.width = ev.target.window.innerWidth;
            this.canvas.height = ev.target.window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });

        for (let i = 0; i < 500; i++) {
            this.stars.push(
                {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: Math.random() * 2
                }
            );
        }
    }

    update() {
        // draw stars
        this.stars.forEach(s => {
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
        });

        // draw the moon
        this.ctx.beginPath();
        this.ctx.arc(this.moon.x, this.moon.y, this.moon.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(201, 201, 201)';
        this.ctx.fill();

        // draw spots on the moon
        this.ctx.beginPath();
        this.ctx.arc(this.moon.x - 20, this.moon.y, this.moon.radius / 4, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(175, 175, 175)';
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.moon.x + 30, this.moon.y - 20, this.moon.radius / 6, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(175, 175, 175)';
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.moon.x + 20, this.moon.y + 15, this.moon.radius / 7, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'rgb(175, 175, 175)';
        this.ctx.fill();

        // update the moon
        this.moon.y += Math.sin(this.moon.angle) * 2;
        this.moon.x += this.moon.xVel;
        this.moon.angle += 0.01;

        // bounce moon off edges of screen
        if (this.moon.x + this.moon.radius > this.width || this.moon.x - this.moon.radius < 0) {
            this.moon.xVel *= -1;
        }
    }
}

export default Sunset;
