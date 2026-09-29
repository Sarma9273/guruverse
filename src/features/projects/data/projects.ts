/* ==========================================================
   GURUVERSE
   Project Universe — canonical project records
   ========================================================== */

import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "ra-xsoc",
    title: "RA-XSOC",
    tagline: "AI-assisted Retrieval-Augmented Security Operations",
    description:
      "A retrieval-augmented security operations copilot for analyst-oriented incident investigation, security knowledge retrieval, MITRE ATT&CK mapping, and structured response workflows.",
    image: "/images/projects/ra-xsoc.webp",
    technologies: ["Python", "FastAPI", "FAISS", "SentenceTransformers", "MITRE ATT&CK", "PostgreSQL"],
    category: "Cybersecurity",
    status: "Completed",
    featured: true,
    github: "https://github.com/Sarma9273/ra-xsoc-security-copilot",
    overview:
      "RA-XSOC evolved from an incident-response assistant into a retrieval-first security operations system. The project focuses on grounding analyst-facing responses in a normalized security knowledge base rather than treating a language model as an unsupported source of truth.",
    problem:
      "Security investigation often requires connecting an alert or incident description with relevant attack knowledge, techniques, response guidance, and analyst context. The project addresses that retrieval and synthesis problem with a dedicated security knowledge layer.",
    objectives: [
      "Retrieve security knowledge semantically from a curated corpus.",
      "Combine retrieval signals with analyst-facing incident analysis.",
      "Map investigation context to MITRE ATT&CK techniques.",
      "Expose a structured workflow that can be inspected and tested."
    ],
    solution:
      "The engineering baseline uses normalized security records, SentenceTransformer embeddings, persisted FAISS similarity retrieval, lexical fallback, a FastAPI application layer, role-aware access controls, and analyst feedback pathways.",
    architecture: [
      "Analyst query / incident input",
      "FastAPI application layer",
      "Incident analysis service",
      "Semantic retrieval with normalized embeddings",
      "FAISS IndexFlatIP + lexical fallback",
      "Security knowledge and playbook layers",
      "MITRE ATT&CK-aligned analysis",
      "Structured analyst response"
    ],
    workflow: [
      "Receive an incident description or analyst query",
      "Normalize and prepare the input for retrieval",
      "Generate a 384-dimensional SentenceTransformer representation",
      "Retrieve relevant security records from the persisted FAISS index",
      "Use lexical fallback when semantic retrieval is insufficient",
      "Assemble retrieval-grounded analysis and response context",
      "Present structured findings to the analyst"
    ],
    metrics: [
      { label: "Benchmark cases", value: "30" },
      { label: "Top-1 accuracy", value: "1.00" },
      { label: "Recall@3", value: "1.00" },
      { label: "Recall@5", value: "1.00" },
      { label: "MRR", value: "1.00" }
    ],
    evidence: [
      {
        type: "Benchmark",
        title: "Retrieval benchmark v1",
        description:
          "A reproducible 30-case in-corpus benchmark reports Top-1 accuracy, Recall@3, Recall@5, and MRR of 1.00. It is explicitly an in-corpus benchmark, not a real-world effectiveness claim."
      },
      {
        type: "Repository",
        title: "Public engineering baseline",
        description:
          "The source repository contains the application, retrieval layer, security controls, tests, and release documentation.",
        href: "https://github.com/Sarma9273/ra-xsoc-security-copilot",
        linkLabel: "Open repository"
      },
      {
        type: "Architecture",
        title: "Retrieval-first system design",
        description:
          "The architecture separates application orchestration, retrieval, knowledge, and analyst-facing response concerns."
      }
    ],
    limitations: [
      "The reported benchmark is fixed and in-corpus; it does not establish performance on unseen real-world incidents.",
      "The defined V2 engineering scope does not include live SIEM or live EDR integration.",
      "Production hosting of the FastAPI, FAISS, and PostgreSQL stack is outside the documented baseline.",
      "A held-out evaluation set is not part of the reported benchmark."
    ],
    futureEnhancements: [
      "Introduce held-out and adversarial retrieval evaluation.",
      "Connect controlled live telemetry sources such as SIEM or EDR.",
      "Expand evidence provenance and analyst feedback evaluation.",
      "Measure end-to-end incident-analysis quality beyond retrieval accuracy."
    ],
    evolution: [
      {
        title: "CyberGPT / incident-response copilot",
        description: "Established the core idea of using retrieval and language-model assistance for security investigation."
      },
      {
        title: "RA-XSOC",
        description: "Expanded the concept toward a retrieval-augmented security operations workflow."
      },
      {
        title: "RA-XSOC-X",
        description: "Hardened the engineering baseline with a FastAPI service layer, persisted retrieval, RBAC, tests, and benchmark documentation."
      }
    ]
  },
  {
    id: "cybergpt",
    title: "CyberGPT",
    tagline: "AI Incident Response Copilot",
    description:
      "An early security copilot concept combining retrieval, language-model assistance, attack classification, MITRE ATT&CK context, and structured incident reporting.",
    image: "/images/projects/cybergpt.webp",
    technologies: ["Python", "LLM", "FAISS", "NLP", "RAG", "MITRE ATT&CK"],
    category: "AI",
    status: "Completed",
    featured: true,
    overview:
      "CyberGPT represents the earlier copilot layer of the security-system lineage. Its purpose is to reduce the distance between a raw incident description and analyst-oriented investigation context.",
    problem:
      "Security alerts are often verbose, fragmented, and difficult to translate into a consistent investigation workflow. CyberGPT explores how retrieval and language-model assistance can make that translation more structured.",
    objectives: [
      "Classify incoming security incident context.",
      "Retrieve relevant security knowledge.",
      "Surface attack behavior and MITRE ATT&CK context.",
      "Generate structured incident-response information."
    ],
    solution:
      "The documented design combines incident classification, a security knowledge base, SentenceTransformer embeddings, FAISS retrieval, hybrid relevance enhancement, MITRE ATT&CK mapping, and response generation.",
    architecture: [
      "Security incident input",
      "Incident classification",
      "Security knowledge base",
      "SentenceTransformer embeddings",
      "FAISS vector retrieval",
      "Hybrid relevance and context ranking",
      "MITRE ATT&CK mapping",
      "Incident-response generation"
    ],
    workflow: [
      "Receive a security alert or incident description",
      "Identify relevant attack category and context",
      "Convert the query into an embedding representation",
      "Retrieve related security knowledge",
      "Enhance relevance with contextual or keyword signals",
      "Map investigation context to MITRE ATT&CK",
      "Generate analyst-oriented response information"
    ],
    evidence: [
      {
        type: "Architecture",
        title: "RAG security workflow",
        description:
          "The project record documents the retrieval, ATT&CK mapping, and response-generation pipeline rather than presenting the system as a generic chatbot."
      },
      {
        type: "Documentation",
        title: "Project lineage",
        description:
          "CyberGPT is represented as the earlier incident-response copilot stage in the evolution toward RA-XSOC."
      }
    ],
    limitations: [
      "The project record does not claim production deployment or measured operational impact.",
      "The documented architecture is not equivalent to validation on unseen enterprise incidents.",
      "Later RA-XSOC work supersedes this as the more mature retrieval-first engineering baseline."
    ],
    futureEnhancements: [
      "Preserve the useful incident-response concepts while migrating toward the hardened RA-XSOC architecture.",
      "Add reproducible held-out evaluation and evidence provenance."
    ],
    evolution: [
      {
        title: "Initial copilot",
        description: "Explored AI-assisted incident interpretation and response generation."
      },
      {
        title: "Retrieval grounding",
        description: "Introduced explicit security knowledge retrieval to reduce unsupported responses."
      },
      {
        title: "RA-XSOC lineage",
        description: "The concept matured into a broader retrieval-augmented security operations system."
      }
    ]
  },
  {
    id: "guruverse",
    title: "GURUVERSE",
    tagline: "Interactive Engineering Universe",
    description:
      "A cinematic engineering environment connecting identity, journey, projects, research, knowledge, and interactive systems through a feature-based Astro architecture.",
    image: "/images/projects/guruverse.webp",
    technologies: ["Astro", "TypeScript", "CSS", "Feature Architecture"],
    category: "Portfolio",
    status: "In Progress",
    featured: true,
    overview:
      "GURUVERSE is itself an engineering project: a static-first, feature-based Astro application designed to turn a conventional portfolio into an inspectable technical universe.",
    problem:
      "Traditional portfolios flatten complex engineering work into short cards and disconnected links. GURUVERSE is designed to preserve the context around systems: why they exist, how they work, what can be verified, and where their boundaries are.",
    objectives: [
      "Create a coherent cinematic engineering identity.",
      "Expose project architecture and evidence rather than only summaries.",
      "Keep content structured and maintainable through feature ownership.",
      "Provide a foundation for later intelligence and interactive-universe layers."
    ],
    solution:
      "The current architecture uses Astro static rendering, TypeScript data models, feature-owned components and styles, reusable layout primitives, and small client-side islands only where interaction is needed.",
    architecture: [
      "Astro page and layout layer",
      "Feature-based content architecture",
      "Typed project data model",
      "Reusable project-world components",
      "Shared visual and motion systems",
      "Client-side interaction islands",
      "GitHub Pages deployment pipeline"
    ],
    workflow: [
      "Enter the cinematic GURUVERSE shell",
      "Trace identity and engineering journey",
      "Explore selected systems through the project index",
      "Open a project world and inspect its case study",
      "Trace architecture, workflow, evidence, and limitations",
      "Move between related project stages and technical domains"
    ],
    evidence: [
      {
        type: "Deployment",
        title: "Production GitHub Pages deployment",
        description:
          "The repository is built and deployed through GitHub Actions to the project's GitHub Pages environment.",
        href: "https://github.com/Sarma9273/guruverse",
        linkLabel: "Open repository"
      },
      {
        type: "Architecture",
        title: "Feature-based Astro implementation",
        description:
          "Project pages, data, components, and styles are organized as a dedicated feature rather than a monolithic portfolio page."
      },
      {
        type: "Documentation",
        title: "Versioned engineering scope",
        description:
          "Repository documentation records the architecture, design system, release engineering, and project evolution."
      }
    ],
    limitations: [
      "GURUVERSE is a portfolio and engineering showcase, not a production SaaS platform.",
      "The current project layer is intentionally static-first; deeper intelligence features belong to later phases.",
      "Visual richness must remain subordinate to performance, accessibility, and inspectable content."
    ],
    futureEnhancements: [
      "Expand the project universe with additional verified project records.",
      "Add the research explorer and canonical knowledge layer.",
      "Integrate the planned intelligence interfaces without turning the site into a generic chatbot shell.",
      "Continue expanding the verified project universe while preserving the completed accessibility, performance, SEO, and responsive baseline."
    ],
    evolution: [
      {
        title: "Portfolio foundation",
        description: "Established the feature-based Astro portfolio architecture and shared design system."
      },
      {
        title: "Cinematic foundation",
        description: "Introduced the visual language, ambient universe, navigation, motion, and responsive foundation."
      },
      {
        title: "Identity + story",
        description: "Connected the interface to a concrete engineering identity, journey, and professional practice."
      },
      {
        title: "Project Universe",
        description: "Transforms project cards into inspectable system worlds with architecture, evidence, limitations, and evolution."
      }
    ],
    demo: "/guruverse/"
  }
];