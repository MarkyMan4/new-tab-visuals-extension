class Particle {
    /*
    effect - an object with the following attributes
                - width
                - height
                - ctx (2d rendering context)
    options - object with optional attributes:
                - sizeDelta: how much the particle changes in size at each time step, defaults to 0
                - fillColor: color of the particle, defaults to white
                - borderColor: border color of particle, no border if not specified
                - bounceOffWalls: whether the particle should bounce off walls
    */
    constructor(effect, x, y, radius, xVel, yVel, options) {
        this.effect = effect;
        this.ctx = this.effect.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.xVel = xVel;
        this.yVel = yVel;
        this.sizeDelta = options.sizeDelta || 0;
        this.fillColor = options.fillColor || 'white';
        this.borderColor = options.borderColor;
        this.bounceOffWalls = options.bounceOffWalls || false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();

        if (this.borderColor !== undefined) {
            this.ctx.strokeStyle = this.borderColor;
            this.ctx.stroke();
        }
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
        this.radius += this.sizeDelta;

        if (this.bounceOffWalls) {
            if (this.x - this.radius < 0 || this.x + this.radius > this.effect.width) {
                this.xVel *= -1;
            }

            if (this.y - this.radius < 0 || this.y + this.radius > this.effect.height) {
                this.yVel *= -1;
            }
        }
    }
}

export default Particle;
