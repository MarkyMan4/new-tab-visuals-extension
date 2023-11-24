import Network from "./fx/network.js";
import SquareShooter from "./fx/squareShooter.js";
import Sunset from "./fx/sunset.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// const effect = new Network(canvas, ctx);
// const effect = new Sunset(canvas, ctx);
const effect = new SquareShooter(canvas, ctx);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    requestAnimationFrame(animate);
}

animate();
