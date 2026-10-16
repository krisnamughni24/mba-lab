/* my-simulation (Calculator template): which files make up this calculator. Paths are relative to this folder and load in this order,
   only when it is first opened. After copying, replace "my-simulation" with your id here and in every file. */
MBALAB.sims.files('my-simulation', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "engine/engine.js",
    "../../shared/assistant.js",
    "../../shared/report.js",
    "ui/app.js"
  ],
  styles: ["../../shared/studio.css", "ui/style.css"]
});
