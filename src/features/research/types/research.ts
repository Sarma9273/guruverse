export type ResearchStatus = "Completed" | "Ongoing" | "Future";
export type ResearchKind = "Research Project" | "Engineering Evaluation" | "Research Direction";

export interface ResearchEvidence {
  type: "Repository" | "Simulation" | "Evaluation" | "Architecture" | "Documentation";
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface ResearchLineage {
  title: string;
  description: string;
}

export interface Research {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  kind: ResearchKind;
  status: ResearchStatus;
  summary: string;
  question: string;
  objective: string;
  methodology: string[];
  technologies: string[];
  findings: string[];
  evidence: ResearchEvidence[];
  boundaries: string[];
  nextSteps: string[];
  lineage: ResearchLineage[];
  featured: boolean;
  relatedProject?: string;
}
