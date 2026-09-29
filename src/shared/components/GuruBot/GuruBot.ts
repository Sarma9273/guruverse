import { answerGuruQuery, type GuruMode } from "../../../services/guruKnowledge";

const root = document.querySelector<HTMLElement>("#guru-bot-panel");
const launcher = document.querySelector<HTMLElement>(".guru-bot");
const closeButton = root?.querySelector<HTMLButtonElement>(".guru-bot-panel__close");
const form = root?.querySelector<HTMLFormElement>("[data-guru-form]");
const input = root?.querySelector<HTMLInputElement>("[data-guru-input]");
const response = root?.querySelector<HTMLElement>("[data-guru-response]");
const conversation = root?.querySelector<HTMLElement>("[data-guru-conversation]");
const modeButtons = root?.querySelectorAll<HTMLButtonElement>("[data-guru-mode]");

let mode: GuruMode = (document.documentElement.dataset.experienceMode as GuruMode) || "explore";

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
  const answer = answerGuruQuery(text, mode);
  addMessage("bot", answer.text);
  if (response) response.textContent = `${mode.toUpperCase()} · ${answer.intent.toUpperCase()}`;
}
modeButtons?.forEach((button) => {
  button.addEventListener("click", () => {
    mode = (button.dataset.guruMode as GuruMode) || "explore";
    modeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    if (response) response.textContent = `${mode.toUpperCase()} MODE ONLINE`;
  });
});
launcher?.addEventListener("click", openBot);
closeButton?.addEventListener("click", closeBot);
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input) { ask(input.value); input.value = ""; }
});
root?.querySelectorAll<HTMLButtonElement>("[data-guru-action]").forEach((button) => {
  button.addEventListener("click", () => ask(button.dataset.guruAction || "What is GURUVERSE?"));
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeBot(); });
if (response) response.textContent = "EXPLORE MODE · KNOWLEDGE BASE ONLINE";
