/* ==========================================================
   GURUVERSE
   Scroll Engine
   ========================================================== */

type ScrollListener=(progress:number)=>void;

class ScrollTracker{

    private progress=0;

    private listeners=new Set<ScrollListener>();

    constructor(){

        if(typeof window!=="undefined"){

            window.addEventListener(

                "scroll",

                this.handleScroll,

                {

                    passive:true

                }

            );

        }

    }

    private handleScroll=()=>{

        const max=

            document.documentElement.scrollHeight-

            window.innerHeight;

        this.progress=

            max>0

                ?window.scrollY/max

                :0;

        this.emit();

    };

    private emit(){

        this.listeners.forEach(

            listener=>listener(this.progress)

        );

    }

    subscribe(listener:ScrollListener){

        this.listeners.add(listener);

        listener(this.progress);

        return()=>{

            this.listeners.delete(listener);

        };

    }

    getProgress(){

        return this.progress;

    }

}

export const scrollTracker=new ScrollTracker();