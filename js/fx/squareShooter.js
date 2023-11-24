import Particle from "./particle.js";

const COLORS = ['#4287f5', '#9d06d4', '#d40636', '#06d493', '#d48806', '#ebde52', '#158c1f'];

class SquareEnemy {
    constructor(squareShooter) {
        this.squareShooter = squareShooter;
        this.x = this.squareShooter.width + (Math.random() * 5);
        this.y = Math.random() * this.squareShooter.height;
        this.xVel = (Math.random() * -2) - 1; // negative because it moves right to left
        this.size = 50;
    }

    update() {
        this.x += this.xVel;
    }

    draw() {
        this.squareShooter.ctx.beginPath();
        this.squareShooter.ctx.rect(this.x, this.y, this.size, this.size);
        this.squareShooter.ctx.fillStyle = 'red';
        this.squareShooter.ctx.fill();
        this.squareShooter.ctx.strokeStyle = 'black';
        this.squareShooter.ctx.stroke();
    }
}

class Laser {
    constructor(squareShooter, x, y) {
        this.squareShooter = squareShooter;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 10;
    }

    update() {
        this.x += 3;
    }

    draw() {
        this.squareShooter.ctx.beginPath();
        this.squareShooter.ctx.rect(this.x, this.y, this.width, this.height);
        this.squareShooter.ctx.fillStyle = 'rgb(15, 226, 226)';
        this.squareShooter.ctx.fill();
    }
}



class SquareShooter {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.enemies = [];
        this.lasers = [];
        this.enemiesFiredAt = [];
        this.particles = [];
        this.canvas.style.backgroundImage = 'linear-gradient(rgb(12, 12, 12), rgb(19, 0, 54), rgb(12, 12, 12))';

        window.addEventListener('resize', (ev) => {
            this.canvas.width = ev.target.window.innerWidth;
            this.canvas.height = ev.target.window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        });

        this.spawnEnemies();
        window.setInterval(this.spawnEnemies, 1000)
    }

    // need to use arrow function so "this" refers to the SquareShooter instance and not the window
    spawnEnemies = () => {
        for (let i = 0; i < 3; i++) {
            this.enemies.push(new SquareEnemy(this));
        }
    }

    spawnParticles(x, y) {
        for (let i = 0; i < 20; i++) {
            let particle = new Particle(
                this,
                x,
                y,
                (Math.random() * 5) + 3,
                Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1),
                Math.random() * 4 * (Math.random() < 0.5 ? -1 : 1),
                {
                    sizeDelta: -0.2,
                    fillColor: COLORS[Math.floor(Math.random() * COLORS.length)],
                    borderColor: 'white'
                }
            );

            this.particles.push(particle);
        }
    }

    update() {
        // update enemies
        this.enemies.forEach(e => {
            e.update();
            e.draw();

            if (e.x <= this.width / 2 && !this.enemiesFiredAt.includes(e)) {
                this.lasers.push(new Laser(this, -100, e.y + e.size / 2));
                this.enemiesFiredAt.push(e);
            }
        });

        // detect collisions and remove lasers and enemies that collided
        let enemiesToRemove = [];
        let lasersToRemove = [];

        this.lasers.forEach((l, li) => {
            l.update();
            l.draw();

            this.enemies.forEach((e, ei) => {
                if (l.x + l.width > e.x && l.y > e.y && l.y + l.height < e.y + e.size) {
                    enemiesToRemove.push(ei);
                    lasersToRemove.push(li);
                    this.spawnParticles(e.x + (e.size / 2), e.y + (e.size / 2));
                }
            });
        });

        for (let i = lasersToRemove.length - 1; i >= 0; i--) {
            this.lasers.splice(lasersToRemove[i], 1);
        }

        for (let i = enemiesToRemove.length - 1; i >= 0; i--) {
            this.enemies.splice(enemiesToRemove[i], 1);
        }

        // update particles and remove particles with a small radius
        let particlesToRemove = [];

        this.particles.forEach((p, i) => {
            p.draw();
            p.update();

            if (p.radius < 0.2) {
                particlesToRemove.push(i);
            }
        });

        for (let i = particlesToRemove.length - 1; i >= 0; i--) {
            this.particles.splice(particlesToRemove[i], 1);
        }
    }
}

export default SquareShooter;
