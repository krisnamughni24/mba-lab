/* van-westendorp: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('van-westendorp', {
  scripts: [
    "i18n/strings.js",
    "i18n/strings-game.js",
    "ui/template.js",
    "engine/engine.js",
    "scene/scene.js",
    "ui/chart.js",
    "../../shared/assistant.js",
    "ui/game.js",
    "ui/app.js"
  ],
  styles: ["../../shared/studio.css", "ui/style.css"]
});
