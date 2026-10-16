/* smart-decision-studio: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('smart-decision-studio', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "../../shared/assistant.js",
    "../../shared/report.js",
    "ui/app.js"
  ],
  styles: ["../../shared/studio.css"]
});
