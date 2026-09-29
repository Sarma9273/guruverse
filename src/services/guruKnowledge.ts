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

const modeLens = (mode: GuruMode): string => {
  if (mode === "recruiter") return "RECRUITER LENS — professional scope, responsibilities, project evidence, and documented outcomes.";
  if (mode === "engineer") return "ENGINEER LENS — architecture, implementation flow, technology choices, and engineering boundaries.";
  if (mode === "researcher") return "RESEARCHER LENS — methodology, evidence, findings, limitations, and next investigations.";
  return "EXPLORE LENS — orientation, system context, and how the documented parts connect.";
};

const modeWrap = (mode: GuruMode, text: string) => `${modeLens(mode)}\n\n${text}`;

export function detectGuruIntent(message: string): GuruIntent {
  const text = normalize(message);
  if (!text) return "help";
  if (/research|paper|publication|methodology|experiment|investigation/.test(text)) return "research";
  if (/journey|timeline|education|career path|background/.test(text)) return "journey";
  if (/experience|work|role|job|teaching|trainer|professional profile/.test(text)) return "experience";
  if (/evidence|verification|proof|repository|benchmark/.test(text)) return "evidence";
  if (/limitation|limitations|boundary|boundaries|not included/.test(text)) return "limitations";
  if (/architecture|structure|components|design|system map/.test(text)) return "architecture";
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

export function answerGuruQuery(message: string, mode: GuruMode = "explore"): { intent: GuruIntent; text: string; subject?: string } {
  const intent = detectGuruIntent(message);
  const project = findProject(message);
  const item = findResearch(message);

  if (intent === "research" || item) {
    if (!item) {
      return {
        intent,
        text: modeWrap(mode, `Research in GURUVERSE is organized into ${research.length} documented tracks: ${research.map((entry) => entry.title).join(", ")}. Ask about a specific track, methodology, evidence, boundaries, or next step.`)
      };
    }
    if (intent === "limitations") {
      const emphasis = mode === "recruiter" ? "The documented boundaries are important when interpreting project scope." : mode === "engineer" ? "These boundaries define what the current implementation does not claim to solve." : "These boundaries define the evidence envelope for the research track.";
      return { intent, subject: item.title, text: modeWrap(mode, `${emphasis}\n\nBoundaries of ${item.title}:\n\n${list(item.boundaries)}`) };
    }
    if (intent === "evidence" || intent === "results") {
      const lead = mode === "recruiter" ? "Documented evidence relevant to professional credibility:" : mode === "engineer" ? "Implementation/evaluation evidence currently documented:" : "Research evidence currently documented:";
      return { intent, subject: item.title, text: modeWrap(mode, `${lead}\n\n${item.evidence.map((e, i) => `${i + 1}. ${e.type} — ${e.title}: ${e.description}`).join("\n")}`) };
    }
    if (intent === "architecture" || intent === "workflow") {
      return { intent, subject: item.title, text: modeWrap(mode, `Methodology for ${item.title}:\n\n${list(item.methodology)}`) };
    }
    return {
      intent,
      subject: item.title,
      text: modeWrap(mode, `${item.title}\n\n${item.summary}\n\nQuestion: ${item.question}\n\nCurrent findings:\n${list(item.findings)}\n\nNext steps:\n${list(item.nextSteps)}`)
    };
  }

  if (intent === "journey") {
    const lead = mode === "recruiter" ? "Professional journey — focus on progression and applied experience:" : mode === "engineer" ? "Engineering journey — focus on capability progression:" : mode === "researcher" ? "Research journey — focus on how engineering work led into investigation:" : "Engineering journey:";
    return { intent, text: modeWrap(mode, `${lead}\n\n${timeline.map((event) => `${event.year} — ${event.title}: ${event.description}`).join("\n\n")}`) };
  }

  if (intent === "experience") {
    const lead = mode === "recruiter" ? "Professional profile and documented roles:" : mode === "engineer" ? "Applied engineering and teaching practice:" : mode === "researcher" ? "Practice that informs the research direction:" : "Professional practice:";
    return { intent, text: modeWrap(mode, `${lead}\n\n${experiences.map((entry) => `${entry.role} — ${entry.company} (${entry.duration})\n${entry.description}`).join("\n\n")}`) };
  }

  if (!project) {
    const modeHint = mode === "recruiter"
      ? "Ask about professional experience, project outcomes, documented evidence, or the engineering journey."
      : mode === "engineer"
        ? "Name a project and ask about architecture, workflow, technologies, evidence, or limitations."
        : mode === "researcher"
          ? "Ask about a research track, methodology, evidence, boundaries, findings, or next investigations."
          : "Name a project or research track, or ask about the journey.";
    return {
      intent,
      text: modeWrap(mode, `I answer only from the canonical GURUVERSE knowledge base. ${modeHint}\n\nAvailable systems: ${projects.map((entry) => entry.title).join(", ")}.\nResearch tracks: ${research.map((entry) => entry.shortTitle).join(", ")}.`)
    };
  }

  if (intent === "architecture") {
    const lead = mode === "recruiter" ? "Architecture evidence — what the system demonstrates technically:" : mode === "researcher" ? "Architecture as an engineering/research artifact:" : "Architecture:";
    return { intent, subject: project.title, text: modeWrap(mode, `${lead} ${project.title}\n\n${list(project.architecture)}`) };
  }
  if (intent === "workflow") {
    const lead = mode === "recruiter" ? "Workflow — how the documented system work can be explained:" : mode === "researcher" ? "Workflow — the reproducible sequence behind the system:" : "Workflow:";
    return { intent, subject: project.title, text: modeWrap(mode, `${lead} ${project.title}\n\n${list(project.workflow)}`) };
  }
  if (intent === "technologies") {
    const lead = mode === "recruiter" ? "Technology stack — the concrete tools behind the project:" : mode === "researcher" ? "Technology stack — tools supporting the documented investigation:" : "Technology stack:";
    return { intent, subject: project.title, text: modeWrap(mode, `${lead} ${project.title}\n\n${project.technologies.map((t) => `• ${t}`).join("\n")}`) };
  }
  if (intent === "problem") return { intent, subject: project.title, text: modeWrap(mode, `Problem space for ${project.title}:\n\n${project.problem || project.description}`) };
  if (intent === "solution") return { intent, subject: project.title, text: modeWrap(mode, `Engineering approach for ${project.title}:\n\n${project.solution || project.overview || project.description}`) };
  if (intent === "evidence" || intent === "results") {
    const lead = mode === "recruiter" ? "Documented evidence and outcomes:" : mode === "researcher" ? "Evaluation/evidence record:" : "Documented evidence:";
    return { intent, subject: project.title, text: modeWrap(mode, `${lead} ${project.title}\n\n${list(project.evidence?.map((e) => `${e.type} — ${e.title}: ${e.description}`))}`) };
  }
  if (intent === "limitations") {
    return { intent, subject: project.title, text: modeWrap(mode, `Boundaries of ${project.title}:\n\n${list(project.limitations)}`) };
  }
  if (intent === "help") {
    const help = mode === "recruiter"
      ? "Ask about experience, project outcomes, evidence, or the journey."
      : mode === "engineer"
        ? "Ask about architecture, workflow, technologies, implementation, or limitations."
        : mode === "researcher"
          ? "Ask about research, methodology, evidence, findings, limitations, or next steps."
          : "Ask about a project, research track, architecture, workflow, technology stack, evidence, limitations, journey, or experience.";
    return { intent, text: modeWrap(mode, `${help} GURU-BOT only uses the documented GURUVERSE knowledge base.`) };
  }

  const modePrefix =
    mode === "recruiter" ? "Professional project snapshot" :
    mode === "engineer" ? "Engineering system snapshot" :
    mode === "researcher" ? "Research-oriented project snapshot" :
    "System overview";

  return {
    intent,
    subject: project.title,
    text: modeWrap(mode, `${modePrefix}: ${project.title}\n\n${project.tagline}\n\n${project.overview || project.description}\n\nStatus: ${project.status} · Category: ${project.category}`)
  };
}
