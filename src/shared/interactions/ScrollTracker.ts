/* ==========================================================
   GURUVERSE
   Scroll Engine
   V2 — Motion Engine
   ========================================================== */

type ScrollListener = (progress: number) => void;

class ScrollTracker {

    private progress = 0;

    private listeners = new Set<ScrollListener>();

    private ticking = false;

    constructor() {

        if (typeof window !== "undefined") {

            window.addEventListener(
                "scroll",
                this.handleScroll,
                {
                    passive: true
                }
            );

            this.update();

        }

    }

    private handleScroll = () => {

        if (this.ticking) {
            return;
        }

        this.ticking = true;

        requestAnimationFrame(() => {

            this.update();

            this.ticking = false;

        });

    };

    private update() {

        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;

        this.progress =
            max > 0
                ? window.scrollY / max
                : 0;

        this.emit();

    }

    private emit() {

        this.listeners.forEach(
            listener => listener(this.progress)
        );

    }

    subscribe(listener: ScrollListener) {

        this.listeners.add(listener);

        listener(this.progress);

        return () => {

            this.listeners.delete(listener);

        };

    }

    getProgress() {

        return this.progress;

    }

}

export const scrollTracker = new ScrollTracker();