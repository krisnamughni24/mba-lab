/* bumn-explorer: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('bumn-explorer', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "engine/engine.js",
    "data/facts.js",
    "data/more.js",
    "data/guide.js",
    "data/guide2.js",
    "data/danantara.js",
    "scene/world.js",
    "scene/buildings.js",
    "scene/buildings2.js",
    "scene/buildings3.js",
    "scene/buildings4.js",
    "scene/scene.js",
    "../../shared/assistant.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/studio.css", "../../shared/explorer.css"]
});
