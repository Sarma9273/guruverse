import { projects } from "../features/projects/data/projects";
import { research } from "../features/research/data/research";
import { experiences } from "../features/experience/data/experience";
import { timeline } from "../features/timeline/data/timeline";

export type GuruMode = "explore" | "recruiter" | "engineer" | "researcher";
export type GuruIntent =
  | "overview" | "architecture" | "workflow" | "technologies" | "problem"
  | "solution" | "results" | "evidence" | "limitations" | "research" | "journey"
  | "experience" | "help";

const normalize = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9+@#.-]+/g, " ").replace(/\s+/g, " ");

const list = (items?: string[]) =>
  items?.length ? items.map((item, i) => `${i + 1}. ${item}`).join("\n") : "No additional information is documented yet.";

export function detectGuruIntent(message: string): GuruIntent {
  const text = normalize(message);
  if (!text) return "help";
  if (/research|paper|publication|methodology|experiment|investigation/.test(text)) return "research";
  if (/journey|timeline|education|career path|background/.test(text)) return "journey";
  if (/experience|work|role|job|teaching|trainer/.test(text)) return "experience";
  if (/evidence|verification|proof|repository|benchmark/.test(text)) return "evidence";
  if (/limitation|limitations|boundary|boundaries|not included/.test(text)) return "limitations";
  if (/architecture|structure|components|design/.test(text)) return "architecture";
  if (/workflow|process|works|working|pipeline/.test(text)) return "workflow";
  if (/technology|technologies|stack|tools|built with/.test(text)) return "technologies";
  if (/problem|challenge|need|why/.test(text)) return "problem";
  if (/solution|solve|approach|implementation/.test(text)) return "solution";
  if (/result|results|achievement|impact|outcome|metric|benchmark/.test(text)) return "results";
  if (/help|what can you|commands|ask/.test(text)) return "help";
  return "overview";
}

function findProject(message: string) {
  const text = normalize(message);
  return projects.find((project) =>
    [project.id, project.title, project.tagline, project.category].some((value) => text.includes(normalize(value)))
  );
}

function findResearch(message: string) {
  const text = normalize(message);
  return research.find((item) =>
    [item.id, item.title, item.shortTitle, item.category].some((value) => text.includes(normalize(value)))
  );
}


const modeLens = (mode: GuruMode): string => {
  if (mode === "recruiter") return "RECRUITER LENS — emphasis: professional scope, evidence, ownership, and documented outcomes.";
  if (mode === "engineer") return "ENGINEER LENS — emphasis: architecture, implementation flow, technologies, and engineering boundaries.";
  if (mode === "researcher") return "RESEARCHER LENS — emphasis: methodology, evidence, limitations, findings, and next investigations.";
  return "EXPLORE LENS — emphasis: orientation, system context, and how the documented parts connect.";
};

const modeWrap = (mode: GuruMode, text: string) => `${modeLens(mode)}\\n\\n${text}`;

export function answerGuruQuery(message: string, mode: GuruMode = "explore"): { intent: GuruIntent; text: string; subject?: string } {
  const intent = detectGuruIntent(message);
  const project = findProject(message);
  const item = findResearch(message);

  if (intent === "research" || item) {
    if (!item) {
      return {
        intent,
        text: modeWrap(mode, `Research in GURUVERSE is organized into ${research.length} documented tracks: ${research.map((entry) => entry.title).join(", ")}. Ask about a specific track, methodology, evidence, boundaries, or next step.`
      };
    }
    if (intent === "limitations") return { intent, subject: item.title, text: `Boundaries of ${item.title}:\n\n${list(item.boundaries)}` };
    if (intent === "evidence" || intent === "results") return { intent, subject: item.title, text: `Evidence for ${item.title}:\n\n${item.evidence.map((e, i) => `${i + 1}. ${e.type} — ${e.title}: ${e.description}`).join("\n")}` };
    if (intent === "architecture" || intent === "workflow") return { intent, subject: item.title, text: `Methodology for ${item.title}:\n\n${list(item.methodology)}` };
    return { intent, subject: item.title, text: `${item.title}\n\n${item.summary}\n\nQuestion: ${item.question}\n\nCurrent findings:\n${list(item.findings)}\n\nNext steps:\n${list(item.nextSteps)}` };
  }

  if (intent === "journey") {
    return { intent, text: modeWrap(mode, `Engineering journey:\n\n${timeline.map((event) => `${event.year} — ${event.title}: ${event.description}`).join("\n\n")}` };
  }

  if (intent === "experience") {
    return { intent, text: modeWrap(mode, `Professional practice:\n\n${experiences.map((entry) => `${entry.role} — ${entry.company} (${entry.duration})\n${entry.description}`).join("\n\n")}` };
  }

  if (!project) {
    const modeHint = mode === "recruiter"
      ? "Try asking about professional experience, project outcomes, or the engineering journey."
      : mode === "engineer"
        ? "Try naming a project and asking about architecture, workflow, technologies, evidence, or limitations."
        : mode === "researcher"
          ? "Try asking about research methodology, evidence, boundaries, or next investigations."
          : "Try naming a project, research track, or ask about the journey.";
    return {
      intent,
      text: modeWrap(mode, `I can answer from the canonical GURUVERSE knowledge base. ${modeHint}\n\nAvailable systems: ${projects.map((entry) => entry.title).join(", ")}.\nResearch tracks: ${research.map((entry) => entry.shortTitle).join(", ")}.`
    };
  }

  if (intent === "architecture") return { intent, subject: project.title, text: `Architecture of ${project.title}:\n\n${list(project.architecture)}` };
  if (intent === "workflow") return { intent, subject: project.title, text: `Workflow of ${project.title}:\n\n${list(project.workflow)}` };
  if (intent === "technologies") return { intent, subject: project.title, text: `Technology stack for ${project.title}:\n\n${project.technologies.map((t) => `• ${t}`).join("\n")}` };
  if (intent === "problem") return { intent, subject: project.title, text: modeWrap(mode, `Problem space:\n\n${project.problem || project.description}` };
  if (intent === "solution") return { intent, subject: project.title, text: modeWrap(mode, `Engineering approach:\n\n${project.solution || project.overview || project.description}` };
  if (intent === "evidence" || intent === "results") return { intent, subject: project.title, text: `Documented evidence for ${project.title}:\n\n${list(project.evidence?.map((e) => `${e.type} — ${e.title}: ${e.description}`))}` };
  if (intent === "limitations") return { intent, subject: project.title, text: `Boundaries of ${project.title}:\n\n${list(project.limitations)}` };
  if (intent === "help") return { intent, text: modeWrap(mode, "Ask about a project, research track, architecture, workflow, technology stack, evidence, limitations, journey, or experience. GURU-BOT only uses the documented GURUVERSE knowledge base." };

  const modePrefix = mode === "recruiter" ? "Professional snapshot" : mode === "engineer" ? "Engineering snapshot" : "System overview";
  return {
    intent,
    subject: project.title,
    text: `${modePrefix}: ${project.title}\n\n${project.tagline}\n\n${project.overview || project.description}\n\nStatus: ${project.status} · Category: ${project.category}`
  };
}
