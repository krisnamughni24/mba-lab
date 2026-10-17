/* corporate-society: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('corporate-society', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "engine/content.js",
    "engine/content-roles.js",
    "engine/content-levels.js",
    "engine/content-more1.js",
    "engine/content-more2.js",
    "engine/content-more3.js",
    "engine/content-values.js",
    "engine/engine.js",
    "scene/scene.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/scenario.css", "ui/style.css"]
});
