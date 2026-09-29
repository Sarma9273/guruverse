import { answerGuruQuery, type GuruMode } from "../../../services/guruKnowledge";

const root = document.querySelector<HTMLElement>("#guru-bot-panel");
const launcher = document.querySelector<HTMLButtonElement>(".guru-bot");
const dock = document.querySelector<HTMLElement>(".guru-bot-dock");
const closeButton = root?.querySelector<HTMLButtonElement>(".guru-bot-panel__close");
const clearButton = root?.querySelector<HTMLButtonElement>("[data-guru-clear]");
const form = root?.querySelector<HTMLFormElement>("[data-guru-form]");
const input = root?.querySelector<HTMLInputElement>("[data-guru-input]");
const response = root?.querySelector<HTMLElement>("[data-guru-response]");
const conversation = root?.querySelector<HTMLElement>("[data-guru-conversation]");
const modeButtons = root?.querySelectorAll<HTMLButtonElement>("[data-guru-mode]");
const actionButtons = root?.querySelectorAll<HTMLButtonElement>("[data-guru-action]");

let mode: GuruMode = (document.documentElement.dataset.experienceMode as GuruMode) || "explore";

const STORAGE_KEY = "guruverse-guru-bot-position";
const EDGE = 14;
const DOCK_SNAP_DISTANCE = 110;

const modeActions: Record<GuruMode, string[]> = {
  explore: ["What is GURUVERSE?", "Give me a system map", "Show the evidence", "What are the limitations?"],
  recruiter: ["Summarize my professional profile", "Which projects show engineering work?", "Show the documented evidence", "Explain my journey"],
  engineer: ["Explain the architecture", "Walk through the workflow", "What technologies are used?", "What are the engineering boundaries?"],
  researcher: ["What research is documented?", "Explain the research methodology", "Show research evidence", "What are the next investigations?"]
};

const modePlaceholders: Record<GuruMode, string> = {
  explore: "Explore the systems, journey, projects, research…",
  recruiter: "Ask about profile, experience, projects, evidence…",
  engineer: "Ask about architecture, workflow, stack, boundaries…",
  researcher: "Ask about methodology, evidence, findings, next steps…"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function dockPoint() {
  if (!dock) return null;
  const rect = dock.getBoundingClientRect();
  return { left: rect.left + rect.width / 2, top: rect.top + rect.height / 2 };
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
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: x, top: y })); } catch {}
  }
  positionPanel();
}

function setLauncherAtDock(persist = true) {
  if (!launcher) return;
  const point = dockPoint();
  if (!point) return;
  const rect = launcher.getBoundingClientRect();
  setLauncherPosition(point.left - rect.width / 2, point.top - rect.height / 2, persist);
  dock?.classList.add("is-active");
  window.setTimeout(() => dock?.classList.remove("is-active"), 700);
}

function restoreLauncherPosition() {
  if (!launcher) return;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as { left?: number; top?: number } | null;
    if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
      setLauncherPosition(saved.left as number, saved.top as number, false);
      return;
    }
  } catch {}
  setLauncherAtDock(true);
}

function snapToDockIfClose() {
  if (!launcher) return;
  const point = dockPoint();
  if (!point) return;
  const rect = launcher.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  if (Math.hypot(centerX - point.left, centerY - point.top) <= DOCK_SNAP_DISTANCE) {
    setLauncherAtDock(true);
  }
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

function clearInactivityTimer() {
  if (inactivityTimer) window.clearTimeout(inactivityTimer);
  inactivityTimer = undefined;
}

function armInactivityTimer() {
  clearInactivityTimer();
  lastInteractionAt = Date.now();
  inactivityTimer = window.setTimeout(() => {
    if (Date.now() - lastInteractionAt >= INACTIVITY_MS) returnToDock("inactivity");
  }, INACTIVITY_MS + 20);
}

function returnToDock(reason = "manual") {
  if (!launcher || launcher.classList.contains("guru-bot--returning")) return;
  clearInactivityTimer();
  closeBot();
  const point = dockPoint();
  if (!point) {
    setLauncherAtDock(true);
    return;
  }

  const rect = launcher.getBoundingClientRect();
  const startX = rect.left;
  const startY = rect.top;
  const targetX = point.left - rect.width / 2;
  const targetY = point.top - rect.height / 2;
  const start = performance.now();
  const duration = reason === "inactivity" ? 1050 : 850;

  launcher.classList.add("guru-bot--returning");
  const travelAngle = Math.atan2(targetY - startY, targetX - startX) * 180 / Math.PI;
  launcher.style.setProperty("--guru-bot-flight-transform", `rotate(${travelAngle}deg)`);

  const step = (now: number) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const x = startX + (targetX - startX) * eased;
    const y = startY + (targetY - startY) * eased;
    setLauncherPosition(x, y, false);
    if (progress < 1) {
      returnAnimationFrame = requestAnimationFrame(step);
    } else {
      launcher.classList.remove("guru-bot--returning");
      launcher.style.removeProperty("--guru-bot-flight-transform");
      setLauncherAtDock(true);
      dock?.classList.add("is-active");
      window.setTimeout(() => dock?.classList.remove("is-active"), 700);
      returnAnimationFrame = undefined;
    }
  };
  if (returnAnimationFrame) cancelAnimationFrame(returnAnimationFrame);
  returnAnimationFrame = requestAnimationFrame(step);
}

function noteInteraction() {
  lastInteractionAt = Date.now();
  if (root?.classList.contains("guru-bot-panel--open") || launcher?.classList.contains("guru-bot--placed")) {
    armInactivityTimer();
  }
}

function openBot() {
  if (document.documentElement.classList.contains("guruverse-booting")) return;
  if (launcher?.classList.contains("guru-bot--returning") || launcher?.classList.contains("guru-bot--post-reveal-flight")) return;
  root?.classList.add("guru-bot-panel--open");
  root?.setAttribute("aria-hidden", "false");
  launcher?.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => {
    positionPanel();
    input?.focus();
    armInactivityTimer();
  });
}

function closeBot() {
  clearInactivityTimer();
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
  label.textContent = role === "user" ? "YOU" : `GURU-BOT · ${mode.toUpperCase()}`;
  const body = document.createElement("div");
  body.className = "guru-bot__message-content";
  body.textContent = text;
  item.append(label, body);
  conversation.appendChild(item);
  conversation.scrollTop = conversation.scrollHeight;
}

function updateModeUI() {
  modeButtons?.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.guruMode === mode);
  });
  actionButtons?.forEach((button, index) => {
    button.textContent = modeActions[mode][index];
    button.dataset.guruAction = modeActions[mode][index];
  });
  if (input) input.placeholder = modePlaceholders[mode];
  if (response) response.textContent = `${mode.toUpperCase()} MODE ONLINE`;
}

function clearChat() {
  noteInteraction();
  if (conversation) conversation.innerHTML = "";
  if (response) response.textContent = `${mode.toUpperCase()} MODE · CHAT CLEARED`;
  input?.focus();
}

function ask(message: string) {
  noteInteraction();
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
    updateModeUI();
    noteInteraction();
  });
});

clearButton?.addEventListener("click", clearChat);

let dragPointerId: number | null = null;
let dragStartX = 0;
let dragStartY = 0;
let dragStartLeft = 0;
let dragStartTop = 0;
let didDrag = false;
let suppressClick = false;
let inactivityTimer: number | undefined;
let returnAnimationFrame: number | undefined;
let lastInteractionAt = Date.now();
const INACTIVITY_MS = 10000;

launcher?.addEventListener("pointerdown", (event) => {
  if (document.documentElement.classList.contains("guruverse-booting")) return;
  if (event.button !== 0 || !launcher) return;
  const rect = launcher.getBoundingClientRect();
  const computed = getComputedStyle(launcher);
  dragPointerId = event.pointerId;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragStartLeft = launcher.classList.contains("guru-bot--placed") ? parseFloat(computed.left) || rect.left : rect.left;
  dragStartTop = launcher.classList.contains("guru-bot--placed") ? parseFloat(computed.top) || rect.top : rect.top;
  didDrag = false;
  noteInteraction();
  launcher.setPointerCapture(event.pointerId);
});

launcher?.addEventListener("pointermove", (event) => {
  if (!launcher || dragPointerId !== event.pointerId) return;
  const dx = event.clientX - dragStartX;
  const dy = event.clientY - dragStartY;
  if (!didDrag && Math.hypot(dx, dy) < 5) return;
  didDrag = true;
  launcher.classList.add("guru-bot--dragging");
  setLauncherPosition(dragStartLeft + dx, dragStartTop + dy, false);
  noteInteraction();
});

launcher?.addEventListener("pointerup", (event) => {
  if (!launcher || dragPointerId !== event.pointerId) return;
  if (didDrag) {
    snapToDockIfClose();
    suppressClick = true;
    armInactivityTimer();
  }
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
  noteInteraction();
  if (input) { ask(input.value); input.value = ""; }
});

root?.querySelectorAll<HTMLButtonElement>("[data-guru-action]").forEach((button) => {
  button.addEventListener("click", () => {
    noteInteraction();
    ask(button.dataset.guruAction || "What is GURUVERSE?");
  });
});

input?.addEventListener("input", noteInteraction);
root?.addEventListener("pointerdown", noteInteraction);
root?.addEventListener("keydown", noteInteraction);

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

function bootCenterPosition() {
  if (!launcher) return;
  const rect = launcher.getBoundingClientRect();
  return {
    left: window.innerWidth / 2 - rect.width / 2,
    top: window.innerHeight / 2 - rect.height / 2
  };
}

function beginPostRevealDocking() {
  if (!launcher || launcher.classList.contains("guru-bot--post-reveal-flight")) return;
  clearInactivityTimer();
  closeBot();

  const start = bootCenterPosition();
  if (!start) return;
  setLauncherPosition(start.left, start.top, false);

  launcher.classList.remove("guru-bot--booting","guru-bot--boot-emerging","guru-bot--boot-holding");
  launcher.classList.add("guru-bot--post-reveal-flight");
  document.documentElement.classList.add("guruverse-docking");

  const rect = launcher.getBoundingClientRect();
  const dock = dockPoint();
  if (!dock) {
    launcher.classList.remove("guru-bot--post-reveal-flight");
    setLauncherAtDock(true);
    document.documentElement.classList.remove("guruverse-docking");
    document.documentElement.classList.add("guruverse-docked");
    return;
  }

  const startX = start.left;
  const startY = start.top;
  const targetX = dock.left - rect.width / 2;
  const targetY = dock.top - rect.height / 2;
  const controlX = window.innerWidth * 0.66;
  const controlY = Math.min(window.innerHeight * 0.34, targetY - 40);
  const duration = 1450;
  const started = performance.now();

  const step = (now: number) => {
    const raw = Math.min(1, (now - started) / duration);
    const eased = 1 - Math.pow(1 - raw, 3);
    const x = (1-eased)*(1-eased)*startX + 2*(1-eased)*eased*controlX + eased*eased*targetX;
    const y = (1-eased)*(1-eased)*startY + 2*(1-eased)*eased*controlY + eased*eased*targetY;
    const scale = 2.55 - 1.55*eased;
    const dx = Math.max(-32, Math.min(32, (targetX - x) * .08));
    launcher.style.setProperty("--guru-bot-flight-transform", `scale(${scale}) rotate(${dx}deg)`);
    setLauncherPosition(x, y, false);

    if (raw < 1) {
      returnAnimationFrame = requestAnimationFrame(step);
    } else {
      launcher.classList.remove("guru-bot--post-reveal-flight");
      launcher.style.removeProperty("--guru-bot-flight-transform");
      setLauncherAtDock(true);
      document.documentElement.classList.remove("guruverse-docking");
      document.documentElement.classList.add("guruverse-docked");
      returnAnimationFrame = undefined;
      armInactivityTimer();
    }
  };
  returnAnimationFrame = requestAnimationFrame(step);
}

function initialiseCinematicBot() {
  if (!launcher) return;
  const intro = document.querySelector("[data-cinematic-intro]");
  if (!intro) {
    restoreLauncherPosition();
    updateModeUI();
    return;
  }

  clearInactivityTimer();
  launcher.classList.add("guru-bot--booting");
  launcher.classList.remove("guru-bot--placed","guru-bot--active");
  launcher.style.removeProperty("--guru-bot-left");
  launcher.style.removeProperty("--guru-bot-top");
  dock?.classList.remove("is-active");
  updateModeUI();

  window.addEventListener("guruverse:bot-emerge", () => {
    launcher.classList.add("guru-bot--boot-emerging");
  }, { once: true });

  window.addEventListener("guruverse:boot-whiteout", () => {
    launcher.classList.remove("guru-bot--boot-emerging");
    launcher.classList.add("guru-bot--boot-holding");
  }, { once: true });

  window.addEventListener("guruverse:website-revealed", () => {
    window.setTimeout(beginPostRevealDocking, 360);
  }, { once: true });
}

initialiseCinematicBot();

window.addEventListener("guruverse:hero-lock", () => {
  launcher?.classList.add("guru-bot--cinematic-online");
}, { once: true });


/* CINEMATIC BOOT INTEGRATION */
