import { mouseTracker } from "../interactions";

export const useMouse = (

    callback:(x:number,y:number)=>void

)=>{

    return mouseTracker.subscribe(

        ({x,y})=>{

            callback(x,y);

        }

    );

};