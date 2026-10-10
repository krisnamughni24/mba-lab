/* Boot: load every feature listed in data/features.js (styles and scripts, in order), initialise them,
   then render the current language. A feature that fails to load or start does not stop the others. */
(async () => {
  const features = MBALAB.data.features;
  const styles = features.flatMap(f => (f.styles || []).map(s => f.path + s));
  const scripts = features.flatMap(f => (f.scripts || []).map(s => f.path + s));
  try { await Promise.all([MBALAB.load.styles(styles), MBALAB.load.scripts(scripts)]); }
  catch (err) { console.error('[MBALAB]', err); }
  features.forEach(f => {
    const init = MBALAB.features[f.id];
    if (!init) { console.error('[MBALAB] feature "' + f.id + '" did not register'); return; }
    try { init(); } catch (err) { console.error('[MBALAB] feature "' + f.id + '" failed to start', err); }
  });
  MBALAB.i18n.set(MBALAB.i18n.get());   // first render in the saved language, emits 'lang'
  document.documentElement.classList.add('ready');
  MBALAB.emit('ready');
})();
