const COLORS = ['#fca103', '#03a9fc', '#03fc84', '#fc030b', '#9f5eff', '#fff45e'];

class WaveParticle {
    constructor(x, y, waveFunc, multiplier, xVel, angleDelta, color) {
        this.x = x;
        this.y = y;
        this.waveFunc = waveFunc;
        this.multiplier = multiplier;
        this.xVel = xVel;
        this.angleDelta = angleDelta;
        this.color = color
        this.yOffset = y;
        this.radius = 5;
        this.angle = 0;
        this.trail = [];
    }

    update() {
        this.x += this.xVel;
        this.y = (this.waveFunc(this.angle) * this.multiplier) + this.yOffset;
        this.angle += this.angleDelta;

        // append current point to the trail and trim the trail if it exceeds a certain length
        this.trail.push({x: this.x, y: this.y});
        
        if(this.trail.length > 100) {
            this.trail.splice(0, 1);
        }
    }

    draw(ctx) {
        // draw the particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // draw the trail
        if(this.trail.length == 0) {
            return;
        }

        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);

        for(let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }

        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

class WaveEffect {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];

        window.addEventListener('resize', (ev) => {
            this.canvas.width = ev.target.window.innerWidth;
            this.canvas.height = ev.target.window.innerHeight;

            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });

        this.spawnParticles();
        window.setInterval(this.spawnParticles, 2000);
    }

    spawnParticles = () => {
        for(let i = 0; i < 15; i++) {
            let x = 0;
            let y = this.canvas.height / 2;
            let waveFunc = Math.random() < 0.5 ? Math.sin : Math.cos;
            let multiplier = (Math.random() * 100) + 100;
            let xVel = (Math.random() * 7) + 2;
            let angleDelta = (Math.random() * 0.02) + 0.01;
            let color = COLORS[Math.floor(Math.random() * COLORS.length)];

            let particle = new WaveParticle(
                x,
                y,
                waveFunc,
                multiplier,
                xVel,
                angleDelta,
                color
            );

            this.particles.push(particle);
        }
    }

    // remove particles once their trail is off the screen
    removeOffScreenParticles() {
        let indicesToRemove = [];

        this.particles.forEach((p, i) => {
            if(p.trail[0].x > this.canvas.width) {
                indicesToRemove.push(i);
            }
        });

        for(let i = indicesToRemove.length - 1; i >= 0; i--) {
            this.particles.splice(indicesToRemove[i], 1);
        }
    }

    update() {
        this.particles.forEach(p => {
            p.draw(this.ctx);
            p.update();
        });

        this.removeOffScreenParticles();
    }
}

export default WaveEffect;
