/* ==========================================================
   GURUVERSE
   Viewport Engine
   ========================================================== */

export const viewport={

    get width(){

        return window.innerWidth;

    },

    get height(){

        return window.innerHeight;

    },

    get centerX(){

        return window.innerWidth/2;

    },

    get centerY(){

        return window.innerHeight/2;

    }

};