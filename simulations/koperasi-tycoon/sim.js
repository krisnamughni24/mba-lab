/* koperasi-tycoon: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('koperasi-tycoon', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "data/events.js",
    "engine/engine.js",
    "scene/scene.js",
    "../../shared/assistant.js",
    "ui/app.js"
  ],
  styles: ["../../shared/studio.css", "ui/style.css"]
});
