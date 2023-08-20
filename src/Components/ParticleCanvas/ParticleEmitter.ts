import { Particle } from './Particle';

export class ParticleEmitter {
    position: { x: number; y: number };
    rate: number;
    lifespan: number;
    particles: Particle[];

    constructor(x: number, y: number, rate: number, lifespan: number) {
        this.position = { x, y };
        this.rate = rate;
        this.lifespan = lifespan;
        this.particles = [];
    }

    update(dt: number) {
        // Generate new particles
        const numParticles = Math.floor(this.rate * dt);
        for (let i = 0; i < numParticles; i++) {
            const vx = Math.random() * 200 - 100;
            const vy = Math.random() * 200 - 100;
            const ax = 0;
            const ay = 100;
            const lifespan = this.lifespan + Math.random() * 2 - 1;

            const particle = new Particle(this.position.x, this.position.y, vx, vy, ax, ay, lifespan, this.selectParticleType());
            this.particles.push(particle);
        }

        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(dt);
            if (particle.lifespan <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (const particle of this.particles) {
            particle.draw(ctx);
        }
        ctx.globalAlpha = 1;
    }

    selectParticleType(): string {
        const randomIndex = Math.floor(Math.random() * ParticleTypes.length);
        return ParticleTypes[randomIndex];
    }

}

const ParticleTypes = ['rect', 'stroke', 'text', 'arc'];