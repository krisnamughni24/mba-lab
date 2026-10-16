/* decision-tree-ev: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('decision-tree-ev', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "engine/engine.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "ui/style.css"]
});
