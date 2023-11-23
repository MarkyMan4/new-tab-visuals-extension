class Particle {
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

export default Particle;
