type FractalOptions = {
    ctx: CanvasRenderingContext2D;
    size: number;
    rotate: number;
    transform: DOMMatrix;
    depth: number;
};

function left(options: FractalOptions): void {
    const size: number = options.size / 2 / Math.cos(options.rotate);
    console.log(options.size / 2, size);

    options.ctx.save();
    options.ctx.setTransform(options.transform);
    options.ctx.translate(0, options.size);
    options.ctx.rotate(options.rotate);

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

function right(options: FractalOptions): void {
    const size: number = options.size / 2 / Math.cos(options.rotate);
    const yOffset: number = size * Math.sin(options.rotate);

    options.ctx.save();
    options.ctx.setTransform(options.transform);
    options.ctx.translate(options.size / 2, options.size + yOffset);
    options.ctx.rotate(-options.rotate);

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
        left(options);
        right(options);
    }
}
