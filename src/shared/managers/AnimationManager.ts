/* ==========================================================
   GURUVERSE
   Animation Manager
   V2 — Experience Core
   ========================================================== */

export type AnimationFrame = (time: number) => void;

class AnimationManager {
    private animations = new Set<AnimationFrame>();

    private frameId: number | null = null;

    private running = false;

    private lastTime = 0;

    private tick = (time: number) => {
        if (!this.running) {
            return;
        }

        const delta = time - this.lastTime;

        this.lastTime = time;

        this.animations.forEach((animation) => {
            animation(delta);
        });

        if (this.animations.size > 0) {
            this.frameId = requestAnimationFrame(this.tick);
        } else {
            this.stop();
        }
    };

    add(animation: AnimationFrame) {
        this.animations.add(animation);

        this.start();

        return () => {
            this.remove(animation);
        };
    }

    remove(animation: AnimationFrame) {
        this.animations.delete(animation);

        if (this.animations.size === 0) {
            this.stop();
        }
    }

    start() {
        if (
            typeof window === "undefined" ||
            this.running ||
            this.animations.size === 0
        ) {
            return;
        }

        this.running = true;

        this.lastTime = performance.now();

        this.frameId = requestAnimationFrame(this.tick);
    }

    stop() {
        this.running = false;

        if (this.frameId !== null) {
            cancelAnimationFrame(this.frameId);

            this.frameId = null;
        }
    }

    clear() {
        this.animations.clear();

        this.stop();
    }

    get size() {
        return this.animations.size;
    }

    get isRunning() {
        return this.running;
    }
}

export const animationManager = new AnimationManager();