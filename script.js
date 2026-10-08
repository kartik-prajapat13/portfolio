"use strict";

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileQuery = window.matchMedia("(max-width: 600px)");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

function syncMenu() {
  menuButton.hidden = !mobileQuery.matches;
  closeMenu();
}

menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(expanded));
  navigation.classList.toggle("is-open", expanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

mobileQuery.addEventListener("change", syncMenu);
syncMenu();

const stages = {
  extract: {
    title: "01 / Start with the source.",
    description: "Extract legacy product lifecycle data and retrieve field-mapping files from QuickBase."
  },
  transform: {
    title: "02 / Make the data make sense.",
    description: "Use Python and SQL for field-level mapping, schema validation and exception reporting before loading."
  },
  load: {
    title: "03 / Bring it into Windchill.",
    description: "Load Parts, Documents and CAD with WBM, scan CAD with WBMFF, and validate results through migration rehearsals."
  }
};

const stageButtons = document.querySelectorAll(".pipeline-step");
const stageTitle = document.querySelector("#pipeline-detail strong");
const stageDescription = document.querySelector("#pipeline-detail p");

stageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const stage = stages[button.dataset.stage];
    stageButtons.forEach((other) => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    });
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;
  });
});

const copyButton = document.querySelector(".copy-email");
const copyStatus = document.querySelector(".copy-status");
let copyStatusTimeout;

if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    clearTimeout(copyStatusTimeout);
    try {
      await navigator.clipboard.writeText("kumharkartik092@gmail.com");
      copyStatus.textContent = "Email copied to clipboard.";
    } catch (error) {
      copyStatus.textContent = "Couldn’t copy. Select the email address to copy it manually.";
      console.warn("Email clipboard write failed:", error);
    }
    copyStatusTimeout = setTimeout(() => { copyStatus.textContent = ""; }, 7000);
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
