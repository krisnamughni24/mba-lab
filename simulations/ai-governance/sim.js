/* ai-governance: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('ai-governance', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "engine/engine.js",
    "scene/scene.js",
    "ui/game.js",
    "ui/lab.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/scenario.css", "ui/style.css"]
});
