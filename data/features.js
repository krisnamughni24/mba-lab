/* Features that make up the site, in load order. Remove a line to switch a feature off.
   Each feature lives in features/<id>/ and may contain <id>.js, strings.js (UI texts) and <id>.css.
   Order matters for stacking and CSS cascade: landing/scene first, then controls, then windows. */
MBALAB.data.features = [
  { id: 'landing',   scripts: ['landing.js'],                  styles: ['landing.css'] },
  { id: 'scene',     scripts: ['scene.js'],                    styles: ['scene.css'] },
  { id: 'theme',     scripts: ['strings.js', 'theme.js'] },
  { id: 'camera',    scripts: ['strings.js', 'camera.js'],     styles: ['camera.css'] },
  { id: 'language',  scripts: ['strings.js', 'language.js'],   styles: ['language.css'] },
  { id: 'audio',     scripts: ['strings.js', 'audio.js'],      styles: ['audio.css'] },
  { id: 'catalog',   scripts: ['strings.js', 'catalog.js'],    styles: ['catalog.css'] },
  { id: 'about',     scripts: ['strings.js', 'about.js'],      styles: ['about.css'] },
  { id: 'idea-form', scripts: ['strings.js', 'idea-form.js'],  styles: ['idea-form.css'] }
].map(f => Object.assign({ path: 'features/' + f.id + '/' }, f));
