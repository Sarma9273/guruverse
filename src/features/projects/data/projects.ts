/* ==========================================================
   GURUVERSE
   Featured Projects
   ========================================================== */

import type { Project } from "../types/project";

export const projects:Project[]=[

    {

        id:"ra-xsoc",

        title:"RA-XSOC",

        tagline:"AI Powered Security Operations Center",

        description:

            "An AI-powered Retrieval-Augmented Extended Security Operations Center that assists analysts with threat investigation, incident response, MITRE ATT&CK mapping, and intelligent security workflows.",

        image:"/images/projects/ra-xsoc.webp",

        technologies:[

            "Python",
            "FAISS",
            "SentenceTransformers",
            "MITRE ATT&CK",
            "Streamlit"

        ],

        category:"Cybersecurity",

        status:"Completed",

        featured:true,

        github:"https://github.com/Sarma9273",

        demo:"#"

    },

    {

        id:"cybergpt",

        title:"CyberGPT",

        tagline:"AI Incident Response Copilot",

        description:

            "An intelligent cybersecurity assistant that combines Retrieval-Augmented Generation with LLMs to help security analysts investigate alerts, explain attacks, and generate incident reports.",

        image:"/images/projects/cybergpt.webp",

        technologies:[

            "Python",
            "LLM",
            "FAISS",
            "NLP",
            "RAG"

        ],

        category:"AI",

        status:"Completed",

        featured:true,

        github:"https://github.com/Sarma9273",

        demo:"#"

    },

    {

        id:"guruverse",

        title:"Guruverse",

        tagline:"Interactive Engineering Universe",

        description:

            "A cinematic portfolio experience showcasing software engineering, artificial intelligence, cybersecurity, research, and innovation through immersive storytelling.",

        image:"/images/projects/guruverse.webp",

        technologies:[

            "Astro",
            "TypeScript",
            "CSS",
            "Architecture"

        ],

        category:"Portfolio",

        status:"In Progress",

        featured:true,

        github:"https://github.com/Sarma9273",

        demo:"#"

    }

];