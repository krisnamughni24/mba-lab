/* my-simulation (Game template): which files make up this simulation. Paths are relative to this folder and load in this order,
   only when the simulation is first opened. After copying, replace "my-simulation" with your id here and in every file. */
MBALAB.sims.files('my-simulation', {
  scripts: [
    "i18n/strings.js",
    "ui/template.js",
    "ui/app.js"
  ],
  styles: ["../../shared/simkit.css", "ui/style.css"]
});
