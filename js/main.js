import Network from "./fx/network.js";
import SquareShooter from "./fx/squareShooter.js";
import Sunset from "./fx/sunset.js";
import WaveEffect from "./fx/wavy.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let effect;

// randomly choose an effect
let randNum = Math.floor(Math.random() * 4);

if(randNum == 0) effect = new Network(canvas, ctx);
else if(randNum == 1) effect = new Sunset(canvas, ctx);
else if(randNum == 2) effect = new SquareShooter(canvas, ctx);
else if(randNum == 3) effect = new WaveEffect(canvas, ctx);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.update();
    requestAnimationFrame(animate);
}

animate();
