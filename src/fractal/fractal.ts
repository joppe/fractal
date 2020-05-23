type FractalOptions = {
    ctx: CanvasRenderingContext2D;
    size: number;
    rotate: number;
    transform: DOMMatrix;
    depth: number;
};

function leaf(options: FractalOptions, direction: -1 | 1): void {
    const size: number = options.size / 2 / Math.cos(options.rotate);

    let x: number = 0;
    let y: number = options.size;

    if (direction === -1) {
        x = options.size / 2;
        y = options.size + size * Math.sin(options.rotate);
    }

    options.ctx.save();
    options.ctx.setTransform(options.transform);
    options.ctx.translate(x, y);
    options.ctx.rotate(options.rotate * direction);

    const transform: DOMMatrix = options.ctx.getTransform();

    options.ctx.restore();

    fractal({
        ctx: options.ctx,
        size,
        depth: options.depth + 1,
        rotate: options.rotate,
        transform,
    });
}

export function fractal(options: FractalOptions): void {
    options.ctx.save();
    options.ctx.setTransform(options.transform);
    options.ctx.moveTo(0, 0);
    options.ctx.lineTo(0, options.size);
    options.ctx.lineTo(options.size, options.size);
    options.ctx.lineTo(options.size, 0);
    options.ctx.lineTo(0, 0);
    options.ctx.restore();

    if (options.depth < 6) {
        leaf(options, 1);
        leaf(options, -1);
    }
}
