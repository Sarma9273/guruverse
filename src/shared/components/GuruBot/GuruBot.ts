import { answerGuruQuery, type GuruProjectContext } from "../../../services/guruBot";

const root = document.querySelector<HTMLElement>("#guru-bot-panel");
const launcher = document.querySelector<HTMLElement>(".guru-bot");
const closeButton = document.querySelector<HTMLButtonElement>(".guru-bot-panel__close");
const form = root?.querySelector<HTMLFormElement>("[data-guru-form]");
const input = root?.querySelector<HTMLInputElement>("[data-guru-input]");
const response = root?.querySelector<HTMLElement>("[data-guru-response]");
const conversation = root?.querySelector<HTMLElement>("[data-guru-conversation]");
const projectElement = document.querySelector<HTMLScriptElement>("[data-guru-project]");

const fallback: GuruProjectContext = {
  title: "GURUVERSE",
  tagline: "Interactive Engineering Universe",
  description: "An interactive engineering portfolio universe.",
  category: "Portfolio",
  status: "2.0",
  technologies: ["Astro", "TypeScript", "CSS"],
};

let project: GuruProjectContext = fallback;
try {
  if (projectElement?.textContent) project = JSON.parse(projectElement.textContent) as GuruProjectContext;
} catch {}

function openBot() {
  root?.classList.add("guru-bot-panel--open");
  root?.setAttribute("aria-hidden", "false");
  launcher?.setAttribute("aria-expanded", "true");
  input?.focus();
}
function closeBot() {
  root?.classList.remove("guru-bot-panel--open");
  root?.setAttribute("aria-hidden", "true");
  launcher?.setAttribute("aria-expanded", "false");
}
function addMessage(role: "user" | "bot", text: string) {
  if (!conversation) return;
  const item = document.createElement("div");
  item.className = `guru-bot__message guru-bot__message--${role}`;
  const label = document.createElement("span");
  label.className = "guru-bot__message-role";
  label.textContent = role === "user" ? "YOU" : "GURU-BOT";
  const body = document.createElement("div");
  body.className = "guru-bot__message-content";
  body.textContent = text;
  item.append(label, body);
  conversation.appendChild(item);
  conversation.scrollTop = conversation.scrollHeight;
}
function ask(message: string) {
  const text = message.trim();
  if (!text) return;
  addMessage("user", text);
  const answer = answerGuruQuery(text, project);
  addMessage("bot", answer.text);
  if (response) response.textContent = `Intent detected: ${answer.intent.toUpperCase()}`;
}
launcher?.addEventListener("click", openBot);
closeButton?.addEventListener("click", closeBot);
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input) {
    ask(input.value);
    input.value = "";
  }
});
root?.querySelectorAll<HTMLButtonElement>("[data-guru-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.guruAction || "overview";
    const prompts: Record<string, string> = {
      overview: "What is this project?",
      architecture: "Explain the architecture",
      workflow: "Explain the workflow",
      technologies: "Show the technology stack",
    };
    ask(prompts[action] || prompts.overview);
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBot();
});
if (response) response.textContent = "Local project intelligence online.";
