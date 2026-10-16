/* my-simulation: which files make up this simulation. Paths are relative to this folder; they load in this order,
   only when the simulation is first opened. Add engine/, data/ or scene/ files here as the simulation grows. */
MBALAB.sims.files('my-simulation', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "ui/style.css"]
});
