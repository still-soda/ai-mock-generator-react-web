export type Vec = {  
    x: number, 
    y: number, 
    len: () => number,
    add: (v2: Vec) => Vec, 
    mul: (v2: Vec | number) => Vec,
    sub: (v2: Vec) => Vec,
    crs: (v2: Vec) => number,
    dot: (v2: Vec) => number,
    norm: () => Vec,
 };

export function v(x: number, y?: number): Vec {
    y ||= x;

    const len = () => Math.sqrt(x * x + y * y);

    return { 
        x, y, len,
        add: (v2: Vec) => v(x + v2.x, y + v2.y ), 
        mul: (v2: Vec | number) => {
            return typeof v2 === 'number' ? 
                v(x * v2, y * v2) : 
                v(x * v2.x, y * v2.y);
        },
        sub: (v2: Vec) => v(x - v2.x, y - v2.y ),
        crs: (v2: Vec) => x * v2.y - y * v2.x,
        dot: (v2: Vec) => x * v2.x + y * v2.y,
        norm: () => v(x / len(), y / len()),
    };
}

export function randDir() {
    return v(Math.random() - 0.5, Math.random() - 0.5).norm();
}

export class RigidBody {
    public velocity: Vec;
    public position: Vec;
    public pause = false;
    private _kill = false;

    constructor(position: Vec = v(0, 0), velocity: Vec = v(0, 0)) {
        this.velocity = velocity;
        this.position = position;

        const startTime = Date.now();

        const next = () => {
            if (this._kill) return;

            const dt = Date.now() - startTime;

            requestAnimationFrame(next);

            this.pause || this.update(dt);
        };

        requestAnimationFrame(next);
    }

    public move(dt: number) {
        this.position = this.position.add(this.velocity.mul(dt / 1000));
    }

    public update(dt: number) { dt; }

    public onKill() {}

    public kill() { 
        this._kill = true;
        this.onKill();
     }
}