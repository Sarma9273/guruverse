export interface TimelineEvent{

    year:string;

    title:string;

    subtitle:string;

    description:string;

    icon:string;

    color?:string;

}

export const timeline:TimelineEvent[]=[

    {

        year:"2019",

        title:"Secondary Education",

        subtitle:"Foundation",

        description:

        "Completed secondary education with a strong interest in technology and engineering.",

        icon:"🎓",

        color:"primary"

    },

    {

        year:"2021",

        title:"B.Tech",

        subtitle:"Electrical & Electronics",

        description:

        "Started engineering journey while discovering software development and AI.",

        icon:"🎓",

        color:"primary"

    },

    {

        year:"2023",

        title:"Web Development",

        subtitle:"Frontend",

        description:

        "Built modern websites using HTML, CSS, JavaScript and TypeScript.",

        icon:"💻",
        
        color:"primary"

    },

    {

        year:"2024",

        title:"Artificial Intelligence",

        subtitle:"Research",

        description:

        "Worked on Retrieval-Augmented Generation, Machine Learning and intelligent systems.",

        icon:"🤖",
        
        color:"primary"

    },

    {

        year:"2025",

        title:"Cybersecurity",

        subtitle:"SOC & AI",

        description:

        "Developed CyberGPT, RA-XSOC and Guruverse while focusing on secure AI solutions.",

        icon:"🛡️",

        color:"primary"

    }

];