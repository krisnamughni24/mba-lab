/* tryout-mba: which files make up this simulation. Paths are relative to this folder; they load in this order, only when the simulation is first opened. */
MBALAB.sims.files('tryout-mba', {
  scripts: [
    "data/data.js",
    "data/lang-en.js",
    "data/lang-id.js",
    "data/lang-ja.js",
    "data/lang-zh.js",
    "i18n/strings.js",
    "ui/template.js",
    "engine/engine.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "../../shared/exam.css"]
});
