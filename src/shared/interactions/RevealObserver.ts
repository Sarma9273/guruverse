/* ==========================================================
   GURUVERSE
   Reveal Observer
   V2 — Motion Engine
   ========================================================== */

type RevealOptions = {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
};

const defaultOptions: Required<RevealOptions> = {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
    once: true,
};

class RevealObserver {
    private observer: IntersectionObserver | null = null;

    private elements = new WeakSet<Element>();

    private options: Required<RevealOptions>;

    constructor(options: RevealOptions = {}) {
        this.options = {
            ...defaultOptions,
            ...options,
        };

        if (typeof window !== "undefined" && "IntersectionObserver" in window) {
            this.observer = new IntersectionObserver(
                this.handleIntersection,
                {
                    threshold: this.options.threshold,
                    rootMargin: this.options.rootMargin,
                }
            );
        }
    }

    private handleIntersection = (
        entries: IntersectionObserverEntry[]
    ) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");

            if (this.options.once) {
                this.observer?.unobserve(entry.target);
            }
        });
    };

    observe(element: Element) {
        if (!this.observer) {
            element.classList.add("is-visible");
            return () => {};
        }

        if (this.elements.has(element)) {
            return () => {};
        }

        this.elements.add(element);

        this.observer.observe(element);

        return () => {
            this.observer?.unobserve(element);
            this.elements.delete(element);
        };
    }

    observeAll(elements: Iterable<Element>) {
        const cleanupFunctions = Array.from(elements).map(
            (element) => this.observe(element)
        );

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }

    disconnect() {
        this.observer?.disconnect();
        this.observer = null;
    }
}

export const revealObserver = new RevealObserver();