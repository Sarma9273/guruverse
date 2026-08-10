/* ============================================================
   GURUVERSE
   GURU-BOT
   ------------------------------------------------------------
   S4.11 — Conversation State & Context
   ============================================================

   RESPONSIBILITIES
   ------------------------------------------------------------
   01. Open / close GURU-BOT
   02. Read current project data
   03. Detect project actions
   04. Generate project-aware responses
   05. Maintain conversation history
   06. Display USER + GURU-BOT messages
   07. Remember the previous topic
   08. Support keyboard Escape
   09. Keep everything local

   IMPORTANT
   ------------------------------------------------------------
   No API.
   No external AI service.
   No backend.

   Project information comes from GuruBot.astro.
   ============================================================ */


/* ============================================================
   01. PROJECT TYPES
   ============================================================ */

interface GuruBotProject {

    id: string;

    title: string;

    tagline: string;

    description: string;

    category: string;

    status: string;

    technologies: string[];

    overview?: string;

    problem?: string;

    objectives?: string[];

    challenge?: string;

    solution?: string;

    architecture?: string[];

    workflow?: string[];

    achievements?: string[];

    futureEnhancements?: string[];
}


/* ============================================================
   02. GURU-BOT ACTION TYPES
   ============================================================ */

type GuruAction =
    | "overview"
    | "architecture"
    | "workflow"
    | "technologies"
    | "problem"
    | "solution"
    | "results";


/* ============================================================
   03. CONVERSATION TYPES
   ============================================================ */

type ConversationRole =
    | "user"
    | "bot";


interface ConversationMessage {

    id: number;

    role: ConversationRole;

    text: string;

    action?: GuruAction;

    timestamp: number;
}


/* ============================================================
   04. DOM ELEMENTS
   ============================================================ */

const guruBot =
    document.querySelector<HTMLElement>(
        ".guru-bot"
    );


const guruBotPanel =
    document.querySelector<HTMLElement>(
        "#guru-bot-panel"
    );


const guruBotCloseButton =
    document.querySelector<HTMLButtonElement>(
        ".guru-bot-panel__close"
    );


const guruBotResponse =
    guruBotPanel?.querySelector<HTMLElement>(
        "[data-guru-response]"
    );


const guruBotActionButtons =
    guruBotPanel?.querySelectorAll<HTMLButtonElement>(
        "[data-guru-action]"
    );


/* ============================================================
   05. PROJECT DATA ELEMENT
   ============================================================ */

const guruProjectElement =
    document.querySelector<HTMLScriptElement>(
        "[data-guru-project]"
    );


/* ============================================================
   06. CONVERSATION STATE
   ============================================================ */

const conversationHistory:
    ConversationMessage[] = [];


let conversationMessageId =
    0;


/* ============================================================
   07. CURRENT PROJECT
   ============================================================ */

let currentProject:
    GuruBotProject | null = null;


/* ============================================================
   08. FALLBACK PROJECT
   ============================================================ */

const fallbackProject:
    GuruBotProject = {

        id: "guruverse",

        title: "GURUVERSE",

        tagline:
            "Interactive Engineering Universe",

        description:
            "An interactive engineering portfolio universe.",

        category:
            "Portfolio",

        status:
            "In Progress",

        technologies: [],
    };


/* ============================================================
   09. LOAD PROJECT DATA
   ============================================================ */

function loadProjectData():
    GuruBotProject | null {

    if (!guruProjectElement) {

        console.warn(
            "[GURU-BOT] No project data element found."
        );

        return null;
    }


    try {

        const rawData =
            guruProjectElement.textContent ||
            "{}";


        const parsedData =
            JSON.parse(rawData);


        return parsedData as GuruBotProject;

    } catch (error) {

        console.error(
            "[GURU-BOT] Failed to parse project data:",
            error
        );

        return null;
    }
}


/* ============================================================
   10. INITIALIZE PROJECT
   ============================================================ */

currentProject =
    loadProjectData();


/* ============================================================
   11. GET ACTIVE PROJECT
   ============================================================ */

function getActiveProject():
    GuruBotProject {

    return (
        currentProject ||
        fallbackProject
    );
}


/* ============================================================
   12. CREATE CONVERSATION MESSAGE
   ============================================================ */

function createConversationMessage(
    role: ConversationRole,
    text: string,
    action?: GuruAction
): ConversationMessage {

    conversationMessageId += 1;


    return {

        id:
            conversationMessageId,

        role,

        text,

        action,

        timestamp:
            Date.now(),
    };
}


/* ============================================================
   13. ADD CONVERSATION MESSAGE
   ============================================================ */

function addConversationMessage(
    role: ConversationRole,
    text: string,
    action?: GuruAction
): void {

    conversationHistory.push(

        createConversationMessage(
            role,
            text,
            action
        )

    );
}


/* ============================================================
   14. GET LAST USER ACTION
   ============================================================ */

function getLastUserAction():
    GuruAction | undefined {

    for (
        let index =
            conversationHistory.length - 1;

        index >= 0;

        index--
    ) {

        const message =
            conversationHistory[index];


        if (
            message.role === "user" &&
            message.action
        ) {

            return message.action;
        }
    }


    return undefined;
}


/* ============================================================
   15. NORMALIZE TEXT
   ============================================================ */

function normalizeText(
    value: string
): string {

    return value
        .toLowerCase()
        .trim()
        .replace(
            /\s+/g,
            " "
        );
}


/* ============================================================
   16. DETECT ACTION
   ============================================================ */

function detectAction(
    message: string
): GuruAction {

    const text =
        normalizeText(message);


    /* --------------------------------------------------------
       ARCHITECTURE
       -------------------------------------------------------- */

    if (
        text.includes("architecture") ||
        text.includes("system design") ||
        text.includes("system structure") ||
        text.includes("structure") ||
        text.includes("components")
    ) {

        return "architecture";
    }


    /* --------------------------------------------------------
       WORKFLOW
       -------------------------------------------------------- */

    if (
        text.includes("workflow") ||
        text.includes("process") ||
        text.includes("how does it work") ||
        text.includes("how it works") ||
        text.includes("working")
    ) {

        return "workflow";
    }


    /* --------------------------------------------------------
       TECHNOLOGIES
       -------------------------------------------------------- */

    if (
        text.includes("technology") ||
        text.includes("technologies") ||
        text.includes("tech stack") ||
        text.includes("stack") ||
        text.includes("tools") ||
        text.includes("built with")
    ) {

        return "technologies";
    }


    /* --------------------------------------------------------
       PROBLEM
       -------------------------------------------------------- */

    if (
        text.includes("problem") ||
        text.includes("why was") ||
        text.includes("why this") ||
        text.includes("why") ||
        text.includes("need")
    ) {

        return "problem";
    }


    /* --------------------------------------------------------
       SOLUTION
       -------------------------------------------------------- */

    if (
        text.includes("solution") ||
        text.includes("solve") ||
        text.includes("solves")
    ) {

        return "solution";
    }


    /* --------------------------------------------------------
       RESULTS
       -------------------------------------------------------- */

    if (
        text.includes("result") ||
        text.includes("results") ||
        text.includes("achievement") ||
        text.includes("achievements") ||
        text.includes("impact")
    ) {

        return "results";
    }


    /* --------------------------------------------------------
       DEFAULT
       -------------------------------------------------------- */

    return "overview";
}


/* ============================================================
   17. CONTEXT-AWARE ACTION DETECTION
   ============================================================ */

function detectContextualAction(
    message: string
): GuruAction {

    const text =
        normalizeText(message);


    const explicitAction =
        detectAction(text);


    /* --------------------------------------------------------
       Check whether user clearly specified a topic.
       -------------------------------------------------------- */

    const hasExplicitTopic =
        text.includes("architecture") ||
        text.includes("workflow") ||
        text.includes("technology") ||
        text.includes("technologies") ||
        text.includes("tech stack") ||
        text.includes("problem") ||
        text.includes("solution") ||
        text.includes("result") ||
        text.includes("achievement");


    if (hasExplicitTopic) {

        return explicitAction;
    }


    /* --------------------------------------------------------
       Context references
       -------------------------------------------------------- */

    const refersToPreviousContext =
        text.includes("that") ||
        text.includes("this") ||
        text.includes("it") ||
        text.includes("previous") ||
        text.includes("above") ||
        text.includes("layer");


    if (
        refersToPreviousContext
    ) {

        const previousAction =
            getLastUserAction();


        if (previousAction) {

            return previousAction;
        }
    }


    return explicitAction;
}


/* ============================================================
   18. ACTION MAP
   ============================================================

   Converts the data-guru-action attribute from Astro
   into a valid GuruAction.

   Example:

   data-guru-action="architecture"
   ============================================================ */

const actionMap:
    Record<string, GuruAction> = {

        overview:
            "overview",

        architecture:
            "architecture",

        workflow:
            "workflow",

        technologies:
            "technologies",

        problem:
            "problem",

        solution:
            "solution",

        results:
            "results",
    };


/* ============================================================
   19. FORMAT LIST
   ============================================================ */

function formatList(
    items: string[]
): string {

    return items
        .map(
            (item, index) =>
                `${index + 1}. ${item}`
        )
        .join("\n");
}


/* ============================================================
   20. FORMAT TECHNOLOGIES
   ============================================================ */

function formatTechnologies(
    technologies: string[]
): string {

    return technologies
        .map(
            technology =>
                `• ${technology}`
        )
        .join("\n");
}


/* ============================================================
   21. OVERVIEW RESPONSE
   ============================================================ */

function generateOverviewResponse(
    project: GuruBotProject
): string {

    return [

        `Here's the quick picture of ${project.title}:`,

        "",

        project.overview ||
            project.description,

    ].join("\n");
}


/* ============================================================
   22. ARCHITECTURE RESPONSE
   ============================================================ */

function generateArchitectureResponse(
    project: GuruBotProject
): string {

    if (
        !project.architecture ||
        project.architecture.length === 0
    ) {

        return [
            "Architecture information",
            "is not available yet.",
        ].join(" ");
    }


    return [

        `Here's how ${project.title} is structured:`,

        "",

        formatList(
            project.architecture
        ),

    ].join("\n");
}


/* ============================================================
   23. WORKFLOW RESPONSE
   ============================================================ */

function generateWorkflowResponse(
    project: GuruBotProject
): string {

    if (
        !project.workflow ||
        project.workflow.length === 0
    ) {

        return [
            "Workflow information",
            "is not available yet.",
        ].join(" ");
    }


    return [

        `Here's how ${project.title} works:`,

        "",

        formatList(
            project.workflow
        ),

    ].join("\n");
}


/* ============================================================
   24. TECHNOLOGY RESPONSE
   ============================================================ */

function generateTechnologyResponse(
    project: GuruBotProject
): string {

    if (
        !project.technologies ||
        project.technologies.length === 0
    ) {

        return [
            "Technology information",
            "is not available yet.",
        ].join(" ");
    }


    return [

        `${project.title} is built using:`,

        "",

        formatTechnologies(
            project.technologies
        ),

    ].join("\n");
}


/* ============================================================
   25. PROBLEM RESPONSE
   ============================================================ */

function generateProblemResponse(
    project: GuruBotProject
): string {

    if (project.problem) {

        return [

            `The main problem addressed by ${project.title} is:`,

            "",

            project.problem,

        ].join("\n");
    }


    return (
        `The detailed problem statement for ` +
        `${project.title} has not been documented yet.`
    );
}


/* ============================================================
   26. SOLUTION RESPONSE
   ============================================================ */

function generateSolutionResponse(
    project: GuruBotProject
): string {

    if (project.solution) {

        return [

            `The core solution behind ${project.title} is:`,

            "",

            project.solution,

        ].join("\n");
    }


    return [

        `${project.title} is designed to:`,

        "",

        project.description,

    ].join("\n");
}


/* ============================================================
   27. RESULTS RESPONSE
   ============================================================ */

function generateResultsResponse(
    project: GuruBotProject
): string {

    if (
        !project.achievements ||
        project.achievements.length === 0
    ) {

        return (
            `Project results and achievements for ` +
            `${project.title} have not been documented yet.`
        );
    }


    return [

        `Here are the documented results for ${project.title}:`,

        "",

        formatList(
            project.achievements
        ),

    ].join("\n");
}


/* ============================================================
   28. RESPONSE GENERATOR
   ============================================================ */

function getProjectResponse(
    action: GuruAction,
    project: GuruBotProject
): string {

    switch (action) {

        case "overview":

            return generateOverviewResponse(
                project
            );


        case "architecture":

            return generateArchitectureResponse(
                project
            );


        case "workflow":

            return generateWorkflowResponse(
                project
            );


        case "technologies":

            return generateTechnologyResponse(
                project
            );


        case "problem":

            return generateProblemResponse(
                project
            );


        case "solution":

            return generateSolutionResponse(
                project
            );


        case "results":

            return generateResultsResponse(
                project
            );


        default:

            return generateOverviewResponse(
                project
            );
    }
}


/* ============================================================
   29. ACTION → USER MESSAGE
   ============================================================ */

function getUserMessageForAction(
    action: GuruAction,
    project: GuruBotProject
): string {

    switch (action) {

        case "overview":

            return `What is ${project.title}?`;


        case "architecture":

            return "Explain the architecture.";


        case "workflow":

            return "Explain the workflow.";


        case "technologies":

            return "What technologies are used?";


        case "problem":

            return "What problem does this project solve?";


        case "solution":

            return "What is the solution?";


        case "results":

            return "What are the results?";


        default:

            return `Tell me about ${project.title}.`;
    }
}


/* ============================================================
   30. CLEAR RESPONSE AREA
   ============================================================ */

function clearResponseArea(): void {

    if (!guruBotResponse) {
        return;
    }


    while (
        guruBotResponse.firstChild
    ) {

        guruBotResponse.removeChild(
            guruBotResponse.firstChild
        );
    }
}


/* ============================================================
   31. CREATE MESSAGE ELEMENT
   ============================================================ */

function createMessageElement(
    message: ConversationMessage
): HTMLElement {

    const messageWrapper =
        document.createElement(
            "div"
        );


    messageWrapper.className =
        `guru-bot__message ` +
        `guru-bot__message--${message.role}`;


    const roleElement =
        document.createElement(
            "span"
        );


    roleElement.className =
        "guru-bot__message-role";


    roleElement.textContent =
        message.role === "user"
            ? "USER"
            : "GURU-BOT";


    const contentElement =
        document.createElement(
            "div"
        );


    contentElement.className =
        "guru-bot__message-content";


    contentElement.textContent =
        message.text;


    messageWrapper.appendChild(
        roleElement
    );


    messageWrapper.appendChild(
        contentElement
    );


    return messageWrapper;
}


/* ============================================================
   32. RENDER CONVERSATION
   ============================================================ */

function renderConversation(): void {

    if (!guruBotResponse) {
        return;
    }


    clearResponseArea();


    conversationHistory.forEach(
        (message) => {

            const messageElement =
                createMessageElement(
                    message
                );


            guruBotResponse.appendChild(
                messageElement
            );
        }
    );


    guruBotResponse.classList.add(
        "is-visible"
    );


    guruBotResponse.scrollTop =
        guruBotResponse.scrollHeight;
}


/* ============================================================
   33. OPEN GURU-BOT
   ============================================================ */

function openGuruBot(): void {

    if (!guruBotPanel) {
        return;
    }


    guruBotPanel.classList.add(
        "guru-bot-panel--open"
    );


    guruBotPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    guruBot?.setAttribute(
        "aria-expanded",
        "true"
    );
}


/* ============================================================
   34. CLOSE GURU-BOT
   ============================================================ */

function closeGuruBot(): void {

    if (!guruBotPanel) {
        return;
    }


    guruBotPanel.classList.remove(
        "guru-bot-panel--open"
    );


    guruBotPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    guruBot?.setAttribute(
        "aria-expanded",
        "false"
    );
}


/* ============================================================
   35. TOGGLE GURU-BOT
   ============================================================ */

function toggleGuruBot(): void {

    if (!guruBotPanel) {
        return;
    }


    const isOpen =
        guruBotPanel.classList.contains(
            "guru-bot-panel--open"
        );


    if (isOpen) {

        closeGuruBot();

    } else {

        openGuruBot();
    }
}


/* ============================================================
   36. HANDLE ACTION BUTTON
   ============================================================ */

function handleGuruBotAction(
    actionValue: string
): void {

    const project =
        getActiveProject();


    const action =
        actionMap[actionValue] ||
        "overview";


    /* --------------------------------------------------------
       USER MESSAGE
       -------------------------------------------------------- */

    const userMessage =
        getUserMessageForAction(
            action,
            project
        );


    addConversationMessage(
        "user",
        userMessage,
        action
    );


    /* --------------------------------------------------------
       BOT RESPONSE
       -------------------------------------------------------- */

    const botResponse =
        getProjectResponse(
            action,
            project
        );


    addConversationMessage(
        "bot",
        botResponse,
        action
    );


    /* --------------------------------------------------------
       RENDER
       -------------------------------------------------------- */

    renderConversation();
}


/* ============================================================
   37. LAUNCHER EVENT
   ============================================================ */

if (guruBot) {

    guruBot.addEventListener(
        "click",
        () => {

            toggleGuruBot();
        }
    );
}


/* ============================================================
   38. CLOSE BUTTON EVENT
   ============================================================ */

if (guruBotCloseButton) {

    guruBotCloseButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            closeGuruBot();
        }
    );
}


/* ============================================================
   39. ACTION BUTTON EVENTS
   ============================================================ */

guruBotActionButtons?.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                /* ------------------------------------------------
                   Remove previous active state
                   ------------------------------------------------ */

                guruBotActionButtons.forEach(
                    (otherButton) => {

                        otherButton.classList.remove(
                            "is-active"
                        );
                    }
                );


                /* ------------------------------------------------
                   Activate current button
                   ------------------------------------------------ */

                button.classList.add(
                    "is-active"
                );


                /* ------------------------------------------------
                   Read action
                   ------------------------------------------------ */

                const action =
                    button.dataset.guruAction;


                if (!action) {

                    console.warn(
                        "[GURU-BOT] Action button has no data-guru-action."
                    );

                    return;
                }


                /* ------------------------------------------------
                   Process action
                   ------------------------------------------------ */

                handleGuruBotAction(
                    action
                );
            }
        );
    }
);


/* ============================================================
   40. KEYBOARD SUPPORT
   ============================================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeGuruBot();
        }
    }
);


/* ============================================================
   41. INITIAL ACCESSIBILITY STATE
   ============================================================ */

if (guruBot) {

    guruBot.setAttribute(
        "aria-expanded",
        "false"
    );
}


if (guruBotPanel) {

    guruBotPanel.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* ============================================================
   42. INITIAL RESPONSE
   ============================================================ */

if (guruBotResponse) {

    const project =
        getActiveProject();


    guruBotResponse.textContent =
        `${project.title} is ready. ` +
        `Choose a topic to explore this project.`;
}


/* ============================================================
   43. INITIALIZATION LOG
   ============================================================ */

console.info(
    "[GURU-BOT] S4.11 initialized."
);


console.info(
    "[GURU-BOT] Active project:",
    getActiveProject().title
);


/* ============================================================
   44. S4.11 COMPLETE
   ============================================================

   Current capabilities:

   ✓ Open / close bot
   ✓ Current-project awareness
   ✓ Overview
   ✓ Architecture
   ✓ Workflow
   ✓ Technology stack
   ✓ Problem
   ✓ Solution
   ✓ Results
   ✓ Conversation history
   ✓ Previous-action context
   ✓ Keyboard Escape
   ✓ Safe DOM rendering

   Next:

   S4.12
   ------------------------------------------------------------
   Conversational input + typing animation + thinking state.
   ============================================================ */