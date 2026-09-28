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

        image:"/images/projects/ra-xsoc.svg",

        technologies:[

            "Python",
            "FAISS",
            "SentenceTransformers",
            "MITRE ATT&CK",
            "Streamlit"

        ],

        overview:
            "RA-XSOC is an AI-powered Retrieval-Augmented Extended Security Operations Center designed to assist security analysts with threat investigation, incident response, MITRE ATT&CK mapping, and intelligent security workflows.",

        architecture: [
            "Security Event and Alert Input",
            "Data Preprocessing and Normalization",
            "Threat Intelligence and Knowledge Base",
            "Embedding and Vector Retrieval",
            "RAG-Based Security Reasoning",
            "MITRE ATT&CK Mapping",
            "Analyst Response and Incident Reporting"
        ],

        workflow: [
            "Collect and ingest security events or analyst queries",
            "Normalize and prepare the security information",
            "Retrieve relevant knowledge from the security knowledge base",
            "Perform contextual threat analysis using retrieval-augmented reasoning",
            "Map identified techniques and behaviors to MITRE ATT&CK",
            "Present investigation findings and recommended response actions",
            "Generate structured incident-response information for the analyst"
        ],

        category:"Cybersecurity",

        status:"Completed",

        featured:true

    },

    {

        id:"cybergpt",

        title:"CyberGPT",

        tagline:"AI Incident Response Copilot",

        description:

            "An intelligent cybersecurity assistant that combines Retrieval-Augmented Generation with LLMs to help security analysts investigate alerts, explain attacks, and generate incident reports.",

        image:"/images/projects/cybergpt.svg",

        technologies:[

            "Python",
            "LLM",
            "FAISS",
            "NLP",
            "RAG"

        ],

        overview:
            "CyberGPT is a Retrieval-Augmented Security Incident Response Copilot that helps security analysts investigate alerts, understand attack behavior, map incidents to MITRE ATT&CK, and generate structured incident reports.",

        architecture: [
            "Security Incident Input",
            "Incident Classification",
            "Knowledge Base",
            "SentenceTransformer Embeddings",
            "FAISS Vector Retrieval",
            "Hybrid Retrieval and Context Ranking",
            "MITRE ATT&CK Mapping",
            "Incident Response Generation"
        ],

        workflow: [
            "Receive a security alert or incident description",
            "Identify the relevant attack category and security context",
            "Convert the query into an embedding representation",
            "Retrieve relevant security knowledge using FAISS",
            "Apply contextual and keyword-based relevance enhancement",
            "Map the investigation to applicable MITRE ATT&CK techniques",
            "Generate an analyst-oriented incident response",
            "Produce structured incident-report information"
        ],

        category:"AI",

        status:"Completed",

        featured:true

    },

    {

        id:"guruverse",

        title:"Guruverse",

        tagline:"Interactive Engineering Universe",

        description:

            "A cinematic portfolio experience showcasing software engineering, artificial intelligence, cybersecurity, research, and innovation through immersive storytelling.",

        image:"/images/projects/guruverse.svg",

        technologies:[

            "Astro",
            "TypeScript",
            "CSS",
            "Architecture"

        ],

        overview:
            "GURUVERSE is an interactive engineering portfolio universe designed to present software engineering, artificial intelligence, cybersecurity, research, and technical projects through immersive digital experiences.",

        architecture: [
            "Astro Application Layer",
            "Feature-Based Portfolio Architecture",
            "Shared Component System",
            "Project Data Layer",
            "Interaction and Animation Layer",
            "Ambient Universe System",
            "GURU-BOT Intelligence Interface"
        ],

        workflow: [
            "Visitor enters the GURUVERSE",
            "Explore the interactive hero and universe environment",
            "Navigate through portfolio domains and sections",
            "Explore individual engineering projects",
            "Inspect project architecture, workflow, technologies, and results",
            "Interact with GURU-BOT for contextual project information",
            "Move between projects and deeper technical experiences"
        ],

        category:"Portfolio",

        status:"Completed",

        featured:true,

        demo:"/guruverse/"

    }

    

];

