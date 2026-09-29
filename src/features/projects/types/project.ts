/* ==========================================================
   GURUVERSE
   Project Model — Project Universe
   ========================================================== */

export type ProjectCategory =
  | "AI"
  | "Cybersecurity"
  | "Software"
  | "Research"
  | "Portfolio";

export type ProjectStatus = "Completed" | "In Progress" | "Research";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectEvidence {
  type: "Repository" | "Benchmark" | "Architecture" | "Deployment" | "Documentation";
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface ProjectEvolutionStage {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];

  github?: string;
  demo?: string;
  documentation?: string;

  overview?: string;
  problem?: string;
  objectives?: string[];
  challenge?: string;
  solution?: string;
  architecture?: string[];
  workflow?: string[];
  screenshots?: string[];
  metrics?: ProjectMetric[];
  evidence?: ProjectEvidence[];
  limitations?: string[];
  evolution?: ProjectEvolutionStage[];

  achievements?: string[];
  futureEnhancements?: string[];
}