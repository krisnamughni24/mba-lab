/* word-network: which files make up this simulation. Paths are relative to this folder and load in this order, only when it is first opened. */
MBALAB.sims.files('word-network', {
  scripts: [
    "data/swow.js",
    "data/lens.js",
    "engine/engine.js",
    "engine/lens.js",
    "i18n/strings.js",
    "ui/template.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/explorer.css", "ui/style.css"]
});
