export interface Research {

    title:string;

    category:string;

    description:string;

    technologies:string[];

    status:"Published"|"Ongoing"|"Future";
 
    difficulty:"Intermediate"| "Advanced"| "Expert";
    featured:boolean;

    link?:string;

    
}

export const research:Research[]=[

    {

        title:"Modified Osprey Optimization Algorithm for MPPT",

        category:"IEEE Research",

        description:

        "Research on improving Maximum Power Point Tracking under partial shading conditions using a Modified Osprey Optimization Algorithm in MATLAB/Simulink.",

        technologies:[

            "MATLAB",

            "Simulink",

            "PV Systems",

            "Optimization"

        ],

        status:"Published",
        featured:true,
        difficulty:"Advanced"

    },

    {

        title:"Retrieval-Augmented AI Security",

        category:"Artificial Intelligence",

        description:

        "Research on combining Retrieval-Augmented Generation with cybersecurity incident response for intelligent analyst assistance.",

        technologies:[

            "RAG",

            "FAISS",

            "LLMs",

            "Python"

        ],

        status:"Ongoing",
        featured:true,
        difficulty:"Expert"

    },

    {

        title:"Autonomous SOC",

        category:"Future Research",

        description:

        "Designing AI-driven Security Operations Centers capable of autonomous detection, reasoning and response.",

        technologies:[

            "AI Agents",

            "SOAR",

            "SOC",

            "Threat Intelligence"

        ],

        status:"Future",
        featured:true,
        difficulty:"Expert"


    }

];