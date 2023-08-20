export class Particle {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    acceleration: { x: number; y: number };
    lifespan: number;
    color: string;
    type: string;

    constructor(x: number, y: number, vx: number, vy: number, ax: number, ay: number, lifespan: number, type: string) {
        this.position = { x, y };
        this.velocity = { x: vx, y: vy };
        this.acceleration = { x: ax, y: ay };
        this.lifespan = lifespan;
        this.color = this.generateRandomColor();
        this.type = type;
    }

    update(dt: number) {
        this.velocity.x += this.acceleration.x * dt;
        this.velocity.y += this.acceleration.y * dt;
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.lifespan -= dt;
        this.color = this.updateColor();
    }

    private generateRandomColor(): string {
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return `rgb(${red}, ${green}, ${blue})`;
    }

    private updateColor(): string {
        const red = this.getUpdatedColorValue(parseInt(this.color.slice(4, 7)));
        const green = this.getUpdatedColorValue(parseInt(this.color.slice(9, 12)));
        const blue = this.getUpdatedColorValue(parseInt(this.color.slice(14, 17)));
        return `rgb(${red}, ${green}, ${blue})`;
    }

    private getUpdatedColorValue(value: number): number {
        const increment = Math.floor(Math.random() * 21) - 10;
        const updatedValue = value + increment;
        return Math.min(Math.max(updatedValue, 0), 255);
    }

    draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.lifespan / this.lifespan;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        switch (this.type) {
            case 'rect':
                ctx.fillRect(this.position.x, this.position.y, 10, 10);
                break;
            case 'stroke':
                ctx.strokeRect(this.position.x, this.position.y, 10, 10);
                break;
            case 'text':
                ctx.fillText('Hello', this.position.x, this.position.y);
                break;
            case 'arc':
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
                ctx.fill();
                break;

            default:
                ctx.fillRect(this.position.x, this.position.y, 10, 10);
                break;
        }
        ctx.globalAlpha = 1;
    }
}