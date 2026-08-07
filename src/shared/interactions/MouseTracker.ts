/* ==========================================================
   GURUVERSE
   Mouse Interaction Engine
   ========================================================== */

export interface MousePosition{

    x:number;

    y:number;

}

type MouseListener=(position:MousePosition)=>void;

class MouseTracker{

    private position:MousePosition={

        x:0,

        y:0

    };

    private listeners=new Set<MouseListener>();

    constructor(){

        if(typeof window!=="undefined"){

            this.position={

                x:window.innerWidth/2,

                y:window.innerHeight/2

            };

            window.addEventListener(

                "pointermove",

                this.handlePointerMove,

                {

                    passive:true

                }

            );

        }

    }

    private handlePointerMove=(event:PointerEvent)=>{

        this.position={

            x:event.clientX,

            y:event.clientY

        };

        this.emit();

    };

    private emit(){

        this.listeners.forEach(

            listener=>listener(this.position)

        );

    }

    subscribe(listener:MouseListener){

        this.listeners.add(listener);

        listener(this.position);

        return()=>{

            this.listeners.delete(listener);

        };

    }

    getPosition(){

        return this.position;

    }

}

export const mouseTracker=new MouseTracker();