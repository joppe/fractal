import { fractal } from './fractal/fractal';

const canvasSize: number = 800;
const itemSize: number = 40;
const canvas: HTMLCanvasElement = document.createElement('canvas');
const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

canvas.style.backgroundColor = 'black';
canvas.setAttribute('width', String(canvasSize));
canvas.setAttribute('height', String(canvasSize));
document.body.appendChild(canvas);

if (ctx === null) {
    throw new Error('Could not create context');
}

ctx.translate(canvasSize / 2 - itemSize / 2, 0);

fractal({
    ctx,
    depth: 0,
    size: itemSize,
    transform: ctx.getTransform(),
    rotate: Math.PI / 6,
});

ctx.strokeStyle = 'white';
ctx.stroke();
