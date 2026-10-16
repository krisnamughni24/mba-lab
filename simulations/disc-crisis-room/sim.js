/* disc-crisis-room: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('disc-crisis-room', {
  scripts: [
    "i18n/strings.js",
    "../../shared/cards.js",
    "ui/template.js",
    "engine/engine.js",
    "scene/scene.js",
    "../../shared/assistant.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/scenario.css", "../../shared/studio.css", "ui/style.css"]
});
