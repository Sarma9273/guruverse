export type JournalKind = "Build Log" | "Research Note" | "Architecture Note" | "Field Note" | "Postmortem";

export type JournalEntry = {
  slug: string;
  title: string;
  kind: JournalKind;
  eyebrow: string;
  summary: string;
  body: string[];
  themes: string[];
  relatedProjects?: string[];
  relatedResearch?: string[];
  source: "GURUVERSE BLOGS";
};
