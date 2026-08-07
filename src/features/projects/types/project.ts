/* ==========================================================
   GURUVERSE
   Project Model
   ========================================================== */

export type ProjectCategory =

    | "AI"
    | "Cybersecurity"
    | "Software"
    | "Research"
    | "Portfolio";

export interface ProjectMetric{

    label:string;

    value:string;

}

export type ProjectStatus =

    | "Completed"
    | "In Progress"
    | "Research";

export interface Project{

    /* ======================================================
       Identity
       ====================================================== */

    id:string;

    title:string;

    tagline:string;

    description:string;

    image:string;

    featured:boolean;

    /* ======================================================
       Classification
       ====================================================== */

    category:ProjectCategory;

    status:ProjectStatus;

    technologies:string[];

    /* ======================================================
       Links
       ====================================================== */

    github?:string;

    demo?:string;

    documentation?:string;

    /* ======================================================
       Case Study
       ====================================================== */

    overview?:string;

    problem?:string;

    objectives?:string[];

    challenge?:string;

    solution?:string;

    architecture?:string[];

    workflow?:string[];

    screenshots?:string[];

    metrics?:ProjectMetric[];

    /* ======================================================
       Results
       ====================================================== */

    achievements?:string[];

    futureEnhancements?:string[];

}

