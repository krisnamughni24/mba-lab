/* word-network: which files make up this simulation. Paths are relative to this folder and load in this order, only when it is first opened. */
MBALAB.sims.files('word-network', {
  scripts: [
    "data/swow.js",
    "data/lens.js",
    "data/lens-2.js",
    "data/lens-3.js",
    "data/lens-4.js",
    "data/lens-5.js",
    "data/lens-6.js",
    "data/lens-7.js",
    "data/lens-8.js",
    "data/lens-9.js",
    "engine/engine.js",
    "engine/lens.js",
    "i18n/strings.js",
    "ui/template.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/explorer.css", "ui/style.css"]
});
