/* negotiation-batna: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('negotiation-batna', {
  scripts: [
    "i18n/strings.js",
    "i18n/strings2.js",
    "ui/template.js",
    "engine/engine.js",
    "scene/scene.js",
    "../../shared/assistant.js",
    "ui/app.js"
  ],
  styles: ["../../shared/studio.css", "ui/style.css"]
});
