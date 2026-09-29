import { answerGuruQuery, type GuruMode } from "../../../services/guruKnowledge";

const root = document.querySelector<HTMLElement>("#guru-bot-panel");
const launcher = document.querySelector<HTMLButtonElement>(".guru-bot");
const closeButton = root?.querySelector<HTMLButtonElement>(".guru-bot-panel__close");
const form = root?.querySelector<HTMLFormElement>("[data-guru-form]");
const input = root?.querySelector<HTMLInputElement>("[data-guru-input]");
const response = root?.querySelector<HTMLElement>("[data-guru-response]");
const conversation = root?.querySelector<HTMLElement>("[data-guru-conversation]");
const modeButtons = root?.querySelectorAll<HTMLButtonElement>("[data-guru-mode]");

let mode: GuruMode = (document.documentElement.dataset.experienceMode as GuruMode) || "explore";

const STORAGE_KEY = "guruverse-guru-bot-position";
const EDGE = 14;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function setLauncherPosition(left: number, top: number, persist = true) {
  if (!launcher) return;
  const rect = launcher.getBoundingClientRect();
  const x = clamp(left, EDGE, window.innerWidth - rect.width - EDGE);
  const y = clamp(top, EDGE, window.innerHeight - rect.height - EDGE);
  launcher.classList.add("guru-bot--placed");
  launcher.style.setProperty("--guru-bot-left", `${x}px`);
  launcher.style.setProperty("--guru-bot-top", `${y}px`);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: x, top: y }));
    } catch {}
  }
  positionPanel();
}

function restoreLauncherPosition() {
  if (!launcher) return;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { left?: number; top?: number } | null;
    if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
      setLauncherPosition(saved.left as number, saved.top as number, false);
    }
  } catch {}
}

function positionPanel() {
  if (!root || !launcher || !root.classList.contains("guru-bot-panel--open")) return;
  const launcherRect = launcher.getBoundingClientRect();
  const panelWidth = Math.min(380, window.innerWidth - 40);
  const panelRect = root.getBoundingClientRect();
  const panelHeight = Math.min(panelRect.height || 520, window.innerHeight - 28);
  const x = clamp(launcherRect.left + launcherRect.width / 2 - panelWidth / 2, 20, window.innerWidth - panelWidth - 20);
  const roomAbove = launcherRect.top - panelHeight - 16;
  const y = roomAbove >= 14
    ? roomAbove
    : clamp(launcherRect.bottom + 16, 14, window.innerHeight - panelHeight - 14);
  root.style.setProperty("--guru-bot-panel-left", `${x}px`);
  root.style.setProperty("--guru-bot-panel-top", `${y}px`);
}

function openBot() {
  root?.classList.add("guru-bot-panel--open");
  root?.setAttribute("aria-hidden", "false");
  launcher?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    positionPanel();
    input?.focus();
  });
}

function closeBot() {
  root?.classList.remove("guru-bot-panel--open");
  root?.setAttribute("aria-hidden", "true");
  launcher?.setAttribute("aria-expanded", "false");
}

function addMessage(role: "user", text: string): void;
function addMessage(role: "bot", text: string): void;
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

let dragPointerId: number | null = null;
let dragStartX = 0;
let dragStartY = 0;
let dragStartLeft = 0;
let dragStartTop = 0;
let didDrag = false;
let suppressClick = false;

launcher?.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || !launcher) return;
  const rect = launcher.getBoundingClientRect();
  const computed = getComputedStyle(launcher);
  dragPointerId = event.pointerId;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragStartLeft = launcher.classList.contains("guru-bot--placed")
    ? parseFloat(computed.left) || rect.left
    : rect.left;
  dragStartTop = launcher.classList.contains("guru-bot--placed")
    ? parseFloat(computed.top) || rect.top
    : rect.top;
  didDrag = false;
  launcher.setPointerCapture(event.pointerId);
});

launcher?.addEventListener("pointermove", (event) => {
  if (!launcher || dragPointerId !== event.pointerId) return;
  const dx = event.clientX - dragStartX;
  const dy = event.clientY - dragStartY;
  if (!didDrag && Math.hypot(dx, dy) < 5) return;
  didDrag = true;
  launcher.classList.add("guru-bot--dragging");
  setLauncherPosition(dragStartLeft + dx, dragStartTop + dy);
});

launcher?.addEventListener("pointerup", (event) => {
  if (!launcher || dragPointerId !== event.pointerId) return;
  if (didDrag) suppressClick = true;
  launcher.releasePointerCapture(event.pointerId);
  launcher.classList.remove("guru-bot--dragging");
  dragPointerId = null;
  window.setTimeout(() => { suppressClick = false; }, 0);
});

launcher?.addEventListener("pointercancel", () => {
  dragPointerId = null;
  launcher?.classList.remove("guru-bot--dragging");
});

launcher?.addEventListener("click", (event) => {
  if (suppressClick) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  openBot();
});

closeButton?.addEventListener("click", closeBot);
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input) { ask(input.value); input.value = ""; }
});

root?.querySelectorAll<HTMLButtonElement>("[data-guru-action]").forEach((button) => {
  button.addEventListener("click", () => ask(button.dataset.guruAction || "What is GURUVERSE?"));
});

window.addEventListener("resize", () => {
  if (!launcher) return;
  if (launcher.classList.contains("guru-bot--placed")) {
    const rect = launcher.getBoundingClientRect();
    setLauncherPosition(rect.left, rect.top, false);
  }
  positionPanel();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBot();
});

restoreLauncherPosition();
if (response) response.textContent = "EXPLORE MODE · KNOWLEDGE BASE ONLINE";
