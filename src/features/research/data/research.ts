import type { Research } from "../types/research";

export const research: Research[] = [
  {
    id: "modified-osprey-mppt",
    title: "Modified Osprey Optimization Algorithm for MPPT",
    shortTitle: "Osprey MPPT",
    category: "Optimization / Renewable Energy",
    kind: "Research Project",
    status: "Completed",
    summary:
      "A MATLAB/Simulink research project exploring a Modified Osprey Optimization Algorithm for Maximum Power Point Tracking under partial-shading conditions.",
    question:
      "How can an optimization strategy improve the ability of a photovoltaic MPPT controller to track the maximum available power when operating conditions change?",
    objective:
      "Model and investigate a modified population-based optimization approach for PV maximum power point tracking, with simulation used to examine controller behavior.",
    methodology: [
      "Model the photovoltaic and converter environment in MATLAB/Simulink.",
      "Define the MPPT objective around available PV power.",
      "Apply a modified Osprey Optimization Algorithm to search for the operating point.",
      "Observe tracking behavior under changing and partial-shading conditions.",
      "Compare algorithm behavior through simulation rather than claiming field deployment."
    ],
    technologies: ["MATLAB", "Simulink", "PV Systems", "Optimization", "MPPT"],
    findings: [
      "The work establishes a simulation-oriented research path for applying metaheuristic optimization to PV MPPT.",
      "The modified optimizer is evaluated in a modeled environment rather than a physical PV installation.",
      "The research connects optimization theory with an engineering control problem."
    ],
    evidence: [
      {
        type: "Simulation",
        title: "MATLAB / Simulink research environment",
        description:
          "The project is based on MATLAB/Simulink modeling and simulation of PV MPPT behavior."
      },
      {
        type: "Documentation",
        title: "Research lineage",
        description:
          "The work represents the earlier optimization-focused research direction in the broader engineering journey."
      }
    ],
    boundaries: [
      "The evidence represented here is simulation-oriented; it does not establish field hardware performance.",
      "No unsupported publication, citation count, or measured deployment claim is attached to this record.",
      "Results should be interpreted within the modeled operating conditions and assumptions."
    ],
    nextSteps: [
      "Evaluate against additional benchmark irradiance and temperature profiles.",
      "Compare convergence and tracking behavior against established MPPT optimizers.",
      "Study computational cost and controller suitability for embedded implementation."
    ],
    lineage: [
      {
        title: "PV engineering foundation",
        description: "Started from the engineering problem of extracting maximum available PV power."
      },
      {
        title: "Optimization research",
        description: "Explored a modified population-based optimizer as the tracking mechanism."
      },
      {
        title: "Broader intelligent systems",
        description: "The research experience contributed to a later focus on AI, retrieval, and security systems."
      }
    ],
    featured: true
  },
  {
    id: "rag-security-operations",
    title: "Retrieval-Augmented Security Operations",
    shortTitle: "RAG Security",
    category: "AI + Cybersecurity",
    kind: "Research Project",
    status: "Ongoing",
    summary:
      "An ongoing research direction on grounding AI-assisted security analysis in explicit security knowledge, retrieval, and analyst-oriented workflows.",
    question:
      "How can retrieval-augmented AI make security analysis more grounded, inspectable, and useful without treating generated text as an unsupported source of truth?",
    objective:
      "Investigate retrieval-first architectures that connect security knowledge with incident-analysis workflows and provide traceable context for analyst assistance.",
    methodology: [
      "Curate and normalize security knowledge around attack behavior and response context.",
      "Represent knowledge and analyst queries with semantic embeddings.",
      "Retrieve relevant records before response synthesis.",
      "Combine semantic retrieval with lexical fallback and structured security context.",
      "Evaluate retrieval quality with reproducible benchmark cases.",
      "Document limitations separately from measured results."
    ],
    technologies: ["RAG", "SentenceTransformers", "FAISS", "Python", "MITRE ATT&CK", "FastAPI"],
    findings: [
      "A retrieval layer creates an inspectable boundary between stored security knowledge and generated analysis.",
      "The RA-XSOC engineering baseline demonstrates a reproducible fixed 30-case in-corpus retrieval benchmark.",
      "The current evidence supports retrieval-system evaluation, not a claim of autonomous or real-world SOC effectiveness."
    ],
    evidence: [
      {
        type: "Evaluation",
        title: "RA-XSOC retrieval benchmark v1",
        description:
          "The documented benchmark contains 30 fixed in-corpus cases with Top-1 accuracy, Recall@3, Recall@5, and MRR reported at 1.00.",
        href: "https://github.com/Sarma9273/ra-xsoc-security-copilot",
        linkLabel: "Inspect the implementation"
      },
      {
        type: "Architecture",
        title: "Retrieval-first security workflow",
        description:
          "The research direction is represented by the RA-XSOC architecture: normalized knowledge, semantic retrieval, lexical fallback, and structured analyst response."
      },
      {
        type: "Repository",
        title: "Public RA-XSOC baseline",
        description:
          "The public repository provides the implementation and engineering documentation used as evidence for the current research line.",
        href: "https://github.com/Sarma9273/ra-xsoc-security-copilot",
        linkLabel: "Open repository"
      }
    ],
    boundaries: [
      "The 30-case benchmark is fixed and in-corpus; it does not establish performance on unseen incidents.",
      "The documented baseline does not include live SIEM or EDR integration.",
      "Production deployment is outside the defined engineering baseline.",
      "Retrieval accuracy does not by itself establish end-to-end incident-response quality."
    ],
    nextSteps: [
      "Introduce held-out and adversarial retrieval evaluation.",
      "Measure evidence provenance and analyst feedback quality.",
      "Test controlled telemetry integrations such as SIEM and EDR.",
      "Evaluate end-to-end incident-analysis quality beyond retrieval metrics."
    ],
    lineage: [
      {
        title: "CyberGPT",
        description: "Initial exploration of AI-assisted incident interpretation and response."
      },
      {
        title: "RA-XSOC",
        description: "Shifted the architecture toward explicit retrieval and security knowledge grounding."
      },
      {
        title: "RA-XSOC-X",
        description: "Hardened the retrieval-first system with application structure, security controls, tests, and reproducible benchmark documentation."
      }
    ],
    featured: true,
    relatedProject: "ra-xsoc"
  },
  {
    id: "security-retrieval-evaluation",
    title: "Security Retrieval Evaluation",
    shortTitle: "Retrieval Evaluation",
    category: "AI Systems Evaluation",
    kind: "Engineering Evaluation",
    status: "Ongoing",
    summary:
      "A focused evaluation track for measuring whether security retrieval systems return the knowledge needed to support analyst-oriented reasoning.",
    question:
      "Which evaluation signals are useful for determining whether a security retrieval layer is returning relevant evidence rather than merely producing plausible responses?",
    objective:
      "Build a reproducible evaluation discipline around retrieval quality, corpus coverage, evidence relevance, and future held-out testing.",
    methodology: [
      "Define labeled retrieval cases against a known security corpus.",
      "Measure ranked retrieval using Top-1, Recall@k, and MRR.",
      "Separate in-corpus validation from unseen-data evaluation.",
      "Record corpus and benchmark limitations alongside the metric values.",
      "Use future held-out and adversarial cases to test generalization."
    ],
    technologies: ["Information Retrieval", "FAISS", "SentenceTransformers", "Benchmarking", "Python"],
    findings: [
      "Ranked retrieval metrics make the retrieval layer measurable independently of generated response quality.",
      "A fixed in-corpus benchmark is useful for regression detection but insufficient for claims about generalization.",
      "Evaluation scope and dataset provenance need to remain visible with every reported metric."
    ],
    evidence: [
      {
        type: "Evaluation",
        title: "30-case retrieval benchmark",
        description:
          "The current RA-XSOC benchmark provides a concrete baseline for retrieval regression testing.",
        href: "https://github.com/Sarma9273/ra-xsoc-security-copilot",
        linkLabel: "View benchmark implementation"
      },
      {
        type: "Documentation",
        title: "Measurement boundaries",
        description:
          "The benchmark is explicitly documented as fixed and in-corpus, keeping the reported result separate from real-world effectiveness."
      }
    ],
    boundaries: [
      "Current evaluation is limited by the available fixed corpus and labeled cases.",
      "No held-out or adversarial benchmark is represented as completed evidence yet.",
      "Retrieval metrics do not measure analyst decision quality or operational outcomes."
    ],
    nextSteps: [
      "Create a held-out evaluation set with unseen query formulations.",
      "Add adversarial and ambiguous security queries.",
      "Measure retrieval evidence quality and analyst usefulness separately."
    ],
    lineage: [
      {
        title: "Baseline retrieval",
        description: "Established a measurable retrieval layer inside the security copilot."
      },
      {
        title: "Benchmark discipline",
        description: "Separated reproducible retrieval metrics from broader operational claims."
      },
      {
        title: "Generalization",
        description: "Future work will test held-out and adversarial cases."
      }
    ],
    featured: true,
    relatedProject: "ra-xsoc"
  },
  {
    id: "autonomous-soc",
    title: "Autonomous Security Operations",
    shortTitle: "Autonomous SOC",
    category: "Future AI Security",
    kind: "Research Direction",
    status: "Future",
    summary:
      "A future research direction exploring how agentic AI, retrieval, orchestration, and security automation could support more autonomous SOC workflows.",
    question:
      "What architectural and safety constraints are required before AI agents can perform meaningful security-operations tasks with controlled autonomy?",
    objective:
      "Explore the boundary between analyst assistance and controlled automation while keeping evidence, authorization, observability, and human oversight explicit.",
    methodology: [
      "Study agentic security-operation architectures and task decomposition.",
      "Define authorization boundaries for automated actions.",
      "Connect retrieval and threat intelligence to controlled workflows.",
      "Model human approval and rollback points.",
      "Evaluate safety and reliability before increasing autonomy."
    ],
    technologies: ["AI Agents", "RAG", "SOAR", "Threat Intelligence", "Security Operations"],
    findings: [
      "The research direction is currently conceptual and does not represent a completed autonomous SOC deployment.",
      "Reliable autonomy requires explicit authorization, observability, evidence, and rollback mechanisms.",
      "Human oversight remains a design constraint for higher-impact security actions."
    ],
    evidence: [
      {
        type: "Architecture",
        title: "Future system direction",
        description:
          "This record captures a future research question derived from the existing retrieval and security-operations work."
      },
      {
        type: "Documentation",
        title: "Explicitly future scope",
        description:
          "No production or autonomous-operation claim is made by this research record."
      }
    ],
    boundaries: [
      "This is a future research direction, not a deployed autonomous SOC.",
      "No production agentic workflow or autonomous response benchmark is claimed.",
      "Safety, authorization, and operational reliability require dedicated future evaluation."
    ],
    nextSteps: [
      "Define a constrained agent task model.",
      "Prototype human-approved security actions in a sandbox.",
      "Establish safety, observability, and rollback requirements before broader automation."
    ],
    lineage: [
      {
        title: "AI assistance",
        description: "Started with analyst-oriented AI assistance."
      },
      {
        title: "Retrieval grounding",
        description: "Introduced explicit knowledge retrieval and measurable evaluation."
      },
      {
        title: "Controlled autonomy",
        description: "Future work explores whether grounded systems can safely orchestrate bounded SOC tasks."
      }
    ],
    featured: true
  }
];

export const featuredResearch = research.filter((item) => item.featured);
