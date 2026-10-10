/* Audio feature: futuristic electronic music + soft UI sounds, generated live with the Web Audio API (no audio files).
   - Music: evolving synth pad, plucked arpeggio with filter sweep, sub bass, light beat, bell motif, reverb + delay.
     Night = slower and darker (A minor colours), Day = brighter and faster (C major / lydian colours); it follows the theme switch.
   - UI sounds: short sine/bell blips. Buttons choose their sound with data-sfx="open|close|lang|theme|..." (default: click).
   - Two toggles in the top bar (music, sound). Choices are remembered. Browsers only allow audio after a user gesture. */
MBALAB.feature('audio', () => {
  /* Mix levels (0..1): music sits quieter than the UI sounds so clicks stay clear. Tune these two numbers. */
  const MUSIC_LEVEL = .3, SFX_LEVEL = .8;
  const ICON_MUSIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ic">' +
    '<line class="eq" x1="4" y1="10" x2="4" y2="14"/><line class="eq" x1="8" y1="6" x2="8" y2="18"/><line class="eq" x1="12" y1="3" x2="12" y2="21"/>' +
    '<line class="eq" x1="16" y1="7" x2="16" y2="17"/><line class="eq" x1="20" y1="10.5" x2="20" y2="13.5"/></g>' +
    '<line class="xx" x1="3" y1="3" x2="21" y2="21"/></svg>';
  const ICON_SOUND = '<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ic">' +
    '<path d="M11 5 6.5 9H3v6h3.5L11 19z"/><path d="M15.5 8.6a4.8 4.8 0 0 1 0 6.8"/><path d="M18.4 5.7a9 9 0 0 1 0 12.6"/></g>' +
    '<line class="xx" x1="3" y1="3" x2="21" y2="21"/></svg>';

  const musicBtn = MBALAB.ui.html('<button id="mu" class="pill aud" type="button" aria-pressed="false" data-sfx="none">' + ICON_MUSIC + '<span class="lb" id="mul" data-i18n="musicLb"></span></button>');
  const soundBtn = MBALAB.ui.html('<button id="sf" class="pill aud" type="button" aria-pressed="true" data-sfx="none">' + ICON_SOUND + '<span class="lb" id="sfl" data-i18n="sfxLb"></span></button>');
  MBALAB.ui.nav(musicBtn, 20);
  MBALAB.ui.nav(soundBtn, 30);

  /* ---------- state ---------- */
  const state = { music: false, sfx: true };
  try {
    const m = localStorage.getItem('mbalab-music'), s = localStorage.getItem('mbalab-sfx');
    if (m !== null) state.music = m === '1';
    if (s !== null) state.sfx = s === '1';
  } catch (e) {}
  const save = () => { try { localStorage.setItem('mbalab-music', state.music ? '1' : '0'); localStorage.setItem('mbalab-sfx', state.sfx ? '1' : '0'); } catch (e) {} };

  /* ---------- audio graph ---------- */
  let ctx = null, master = null, sfxBus = null, sfxVerb = null, noiseBuf = null, impulse = null;
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);

  const makeImpulse = (seconds, decay) => {
    const len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay); }
    return buf;
  };
  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ctx = new AC(); } catch (e) { return null; }
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -20; comp.ratio.value = 3; comp.attack.value = .01; comp.release.value = .25;
      comp.connect(ctx.destination);
      master = ctx.createGain(); master.gain.value = .9; master.connect(comp);
      sfxBus = ctx.createGain(); sfxBus.gain.value = SFX_LEVEL; sfxBus.connect(master);
      impulse = makeImpulse(2.6, 2.4);
      sfxVerb = ctx.createConvolver(); sfxVerb.buffer = impulse;
      const sv = ctx.createGain(); sv.gain.value = .28; sfxVerb.connect(sv); sv.connect(sfxBus);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate >> 1, ctx.sampleRate);
      const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  /* ---------- UI sounds ---------- */
  /* [frequency, offset s, duration s, kind, volume, glide-to frequency] ; kind: sine | triangle | bell */
  const FX = {
    click: [[1480, 0, .07, 'sine', .11, 1980]],
    open: [[620, 0, .16, 'sine', .11, 940], [1240, .05, .2, 'bell', .05]],
    close: [[940, 0, .15, 'sine', .1, 620]],
    on: [[740, 0, .12, 'sine', .11, 1110]],
    off: [[1110, 0, .12, 'sine', .1, 740]],
    day: [[523, 0, .3, 'bell', .08], [659, .08, .3, 'bell', .08], [784, .16, .3, 'bell', .08], [1047, .24, .5, 'bell', .08]],
    night: [[1047, 0, .3, 'bell', .08], [784, .08, .3, 'bell', .08], [659, .16, .3, 'bell', .08], [523, .24, .5, 'bell', .08]],
    lang: [[1760, 0, .08, 'sine', .09, 2349], [2349, .06, .1, 'sine', .06]],
    ok: [[784, 0, .35, 'bell', .09], [988, .1, .35, 'bell', .09], [1319, .2, .6, 'bell', .09]],
    err: [[196, 0, .24, 'sine', .14, 128], [185, .09, .28, 'triangle', .07, 110]]
  };
  const blip = (freq, at, dur, kind, vol, glide) => {
    const parts = kind === 'bell' ? [[1, 1], [2.756, .35]] : [[1, 1]];
    parts.forEach(([ratio, gain]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = kind === 'triangle' ? 'triangle' : 'sine';
      o.frequency.setValueAtTime(freq * ratio, at);
      if (glide) o.frequency.exponentialRampToValueAtTime(glide * ratio, at + dur);
      g.gain.setValueAtTime(.0001, at);
      g.gain.linearRampToValueAtTime(vol * gain, at + .008);
      g.gain.exponentialRampToValueAtTime(.0001, at + dur);
      o.connect(g); g.connect(sfxBus); g.connect(sfxVerb);
      o.start(at); o.stop(at + dur + .05);
    });
  };
  const play = name => {
    if (!state.sfx || !FX[name] || !ensure()) return;
    const at = ctx.currentTime + .005;
    FX[name].forEach(([f, o, d, k, v, g]) => blip(f, at + o, d, k, v, g));
  };

  /* ---------- typing sound: soft mechanical tick for every key pressed in a text field ---------- */
  let lastKey = 0;
  const keyTick = e => {
    if (!state.sfx || e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.target; if (!el || !(el.matches && el.matches('input:not([type=range]):not([type=checkbox]):not([type=radio]):not([type=button]),textarea,[contenteditable=true]'))) return;
    const k = e.key, printable = k.length === 1, edit = k === 'Backspace' || k === 'Delete', enter = k === 'Enter';
    if (!printable && !edit && !enter) return;
    const now = performance.now(); if (now - lastKey < 28) return; lastKey = now;
    if (!ensure()) return;
    const at = ctx.currentTime + .002, j = 1 + (Math.random() - .5) * .22;
    if (k === ' ') { blip(260 * j, at, .07, 'sine', .12, 150); blip(1500 * j, at, .02, 'sine', .04); }
    else if (enter) { blip(190, at, .1, 'sine', .15, 120); blip(1900, at + .01, .05, 'bell', .05); }
    else if (edit) { blip(900 * j, at, .045, 'triangle', .07, 520); }
    else { blip(2300 * j, at, .03, 'sine', .07, 1500 * j); blip(420 * j, at, .035, 'sine', .08, 260); }
  };
  document.addEventListener('keydown', keyTick, true);

  /* ---------- loading sound: a rising synth swell that fades in while a simulation loads ---------- */
  let loadSnd = null;
  const loadEnd = quiet => {
    const s = loadSnd; if (!s) return; loadSnd = null;
    clearInterval(s.iv);
    try { s.g.gain.cancelScheduledValues(ctx.currentTime); s.g.gain.setTargetAtTime(.0001, ctx.currentTime, .12); } catch (e) {}
    setTimeout(() => s.nodes.forEach(n => { try { n.disconnect(); } catch (e) {} }), 900);
    if (!quiet) play('ok');
  };
  const loadStart = ms => {
    if (!state.sfx || !ensure()) return;
    loadEnd(true);
    const at = ctx.currentTime + .02, dur = ms / 1000, t0 = performance.now();
    const g = ctx.createGain(), f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 4;
    f.frequency.setValueAtTime(160, at); f.frequency.exponentialRampToValueAtTime(3000, at + dur);
    g.gain.setValueAtTime(.0001, at); g.gain.exponentialRampToValueAtTime(.1, at + dur * .92);   // fade in
    const o1 = osc('sawtooth', 55, at, at + dur + 2, -7), o2 = osc('sawtooth', 55, at, at + dur + 2, 7), o3 = osc('sine', 110, at, at + dur + 2);
    [o1, o2, o3].forEach(o => { o.frequency.exponentialRampToValueAtTime(o === o3 ? 220 : 110, at + dur); o.connect(f); });
    f.connect(g); g.connect(sfxBus); g.connect(sfxVerb);
    const iv = setInterval(() => {                                        // data-stream blips that climb with progress
      const p = Math.min(1, (performance.now() - t0) / ms);
      blip(700 + p * 2200 + Math.random() * 500, ctx.currentTime + .005, .05, 'sine', .025 + .035 * p);
    }, 150);
    loadSnd = { g, iv, nodes: [g, f, o1, o2, o3] };
  };

  /* ---------- music ---------- */
  /* chord = pad notes (MIDI); bass = bass root. 4-bar cycle. */
  const NIGHT = { bpm: 96, kick: [0, 8, 10], snare: [12], chords: [
    { pad: [57, 60, 64, 67, 71], bass: 45 },   // Am9
    { pad: [53, 57, 60, 64, 67], bass: 41 },   // Fmaj9
    { pad: [55, 59, 64, 67, 72], bass: 48 },   // Cmaj7
    { pad: [52, 55, 59, 62, 67], bass: 40 } ]  // Em7
  };
  const DAY = { bpm: 118, kick: [0, 4, 8, 12], snare: [4, 12], chords: [
    { pad: [60, 64, 67, 71, 74], bass: 48 },   // Cmaj9
    { pad: [55, 59, 62, 66, 69], bass: 43 },   // Gmaj7
    { pad: [57, 60, 64, 67, 72], bass: 45 },   // Am7
    { pad: [53, 57, 60, 64, 71], bass: 41 } ]  // Fmaj7#11
  };
  const ARP = [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 3, 4, 3, 2, 1, 2];
  const BASS_STEPS = [0, 3, 6, 8, 11, 14];
  const BELL = [[0, 4], [6, 2], [10, 3], [14, 1]];   // [step, pad index] motif, shifted per bar

  let session = null, timer = null, nextTime = 0, step = 0, bar = 0, cycle = 0, theme = NIGHT;

  const newSession = () => {
    const bus = ctx.createGain(); bus.gain.value = 0; bus.connect(master);
    const input = ctx.createGain(); input.connect(bus);                       // dry
    const verb = ctx.createConvolver(); verb.buffer = impulse;
    const verbGain = ctx.createGain(); verbGain.gain.value = .34;
    input.connect(verb); verb.connect(verbGain); verbGain.connect(bus);       // reverb
    const delay = ctx.createDelay(1.5), fb = ctx.createGain(), tone = ctx.createBiquadFilter(), wet = ctx.createGain();
    fb.gain.value = .38; tone.type = 'lowpass'; tone.frequency.value = 2200; wet.gain.value = .3;
    const send = ctx.createGain();
    send.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay); tone.connect(wet); wet.connect(bus); wet.connect(verb);
    return { bus, input, send, delay, nodes: [bus, input, verb, verbGain, delay, fb, tone, wet, send] };
  };

  const osc = (type, freq, at, stop, detune) => {
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, at);
    if (detune) o.detune.value = detune;
    o.start(at); o.stop(stop); return o;
  };
  const pad = (at, dur, notes) => {
    const g = ctx.createGain(), f = ctx.createBiquadFilter(), end = at + dur + 1.4;
    f.type = 'lowpass'; f.Q.value = 1.2;
    f.frequency.setValueAtTime(480, at); f.frequency.linearRampToValueAtTime(1500, at + dur * .6); f.frequency.linearRampToValueAtTime(700, at + dur + 1);
    g.gain.setValueAtTime(.0001, at); g.gain.linearRampToValueAtTime(.05, at + .7); g.gain.setValueAtTime(.05, at + dur * .8); g.gain.linearRampToValueAtTime(.0001, end);
    notes.forEach(n => [-8, 8].forEach(d => osc('sawtooth', midi(n), at, end, d).connect(f)));
    f.connect(g); g.connect(session.input);
  };
  const arp = (at, freq, len, vol) => {
    const o = osc('sawtooth', freq, at, at + len + .05), f = ctx.createBiquadFilter(), g = ctx.createGain();
    f.type = 'lowpass'; f.Q.value = 5; f.frequency.setValueAtTime(3400, at); f.frequency.exponentialRampToValueAtTime(500, at + len);
    g.gain.setValueAtTime(.0001, at); g.gain.linearRampToValueAtTime(vol, at + .004); g.gain.exponentialRampToValueAtTime(.0001, at + len);
    o.connect(f); f.connect(g); g.connect(session.input); g.connect(session.send);
  };
  const bass = (at, freq, len, vol) => {
    const o = osc('sine', freq, at, at + len + .05), o2 = osc('triangle', freq, at, at + len + .05), g = ctx.createGain();
    g.gain.setValueAtTime(.0001, at); g.gain.linearRampToValueAtTime(vol, at + .01); g.gain.exponentialRampToValueAtTime(.0001, at + len);
    o.connect(g); o2.connect(g); g.connect(session.input);
  };
  const kick = (at, vol) => {
    const o = osc('sine', 135, at, at + .3), g = ctx.createGain();
    o.frequency.exponentialRampToValueAtTime(38, at + .18);
    g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(.0001, at + .25);
    o.connect(g); g.connect(session.bus);
  };
  const noise = (at, len, vol, type, freq) => {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = type; f.frequency.value = freq;
    g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(.0001, at + len);
    s.connect(f); f.connect(g); g.connect(session.input); s.start(at); s.stop(at + len + .05);
  };
  const bell = (at, freq, vol) => {
    [[1, 1], [2.756, .3]].forEach(([r, gn]) => {
      const o = osc('sine', freq * r, at, at + 1.6), g = ctx.createGain();
      g.gain.setValueAtTime(.0001, at); g.gain.linearRampToValueAtTime(vol * gn, at + .006); g.gain.exponentialRampToValueAtTime(.0001, at + 1.4);
      o.connect(g); g.connect(session.input); g.connect(session.send);
    });
  };

  const playStep = (at, sd) => {
    const c = theme.chords[bar];
    if (step === 0) {
      pad(at, sd * 16, c.pad);
      session.delay.delayTime.setValueAtTime(sd * 3, at);        // dotted-eighth echo
    }
    const base = c.pad[ARP[step]] + 12;
    arp(at, midi(base), sd * 1.6, step % 4 === 0 ? .075 : .05);
    if (BASS_STEPS.includes(step)) bass(at, midi(c.bass), sd * 2.4, .2);
    if (theme.kick.includes(step)) kick(at, .38);
    if (theme.snare.includes(step)) noise(at, .14, .05, 'bandpass', 1800);
    if (step % 2 === 1) noise(at, .035, step % 4 === 3 ? .032 : .018, 'highpass', 8500);
    BELL.forEach(([s, idx]) => { if (s === step && (cycle + bar + idx) % 2 === 0) bell(at, midi(c.pad[(idx + bar) % c.pad.length] + 24), .045); });
  };

  const schedule = () => {
    if (!ctx || !session) return;
    while (nextTime < ctx.currentTime + .35) {
      if (step === 0) theme = document.body.classList.contains('day') ? DAY : NIGHT;
      const sd = 60 / theme.bpm / 4;
      playStep(nextTime, sd);
      nextTime += sd;
      if (++step === 16) { step = 0; if (++bar === theme.chords.length) { bar = 0; cycle++; } }
    }
  };
  const startMusic = () => {
    if (timer || !ensure()) return;
    session = newSession();
    session.bus.gain.setTargetAtTime(MUSIC_LEVEL, ctx.currentTime, .5);        // fade in
    nextTime = ctx.currentTime + .12; step = 0; bar = 0;
    timer = setInterval(schedule, 80);
  };
  const stopMusic = () => {
    clearInterval(timer); timer = null;
    if (!session || !ctx) return;
    const old = session; session = null;
    old.bus.gain.setTargetAtTime(0, ctx.currentTime, .15);             // fade out
    setTimeout(() => old.nodes.forEach(n => { try { n.disconnect(); } catch (e) {} }), 4500);
  };

  /* ---------- toggles ---------- */
  const refreshButtons = () => {
    [[musicBtn, state.music, 'musicOn', 'musicOff'], [soundBtn, state.sfx, 'sfxOn', 'sfxOff']].forEach(([btn, on, yes, no]) => {
      btn.setAttribute('aria-pressed', on);
      btn.classList.toggle('off', !on);
      const text = t(on ? yes : no);
      btn.setAttribute('aria-label', text);
      btn.title = text;
    });
  };
  const setMusic = on => { state.music = on; save(); on ? startMusic() : stopMusic(); refreshButtons(); };
  const setSfx = on => { state.sfx = on; save(); refreshButtons(); };

  musicBtn.onclick = () => { setMusic(!state.music); play(state.music ? 'on' : 'off'); };
  soundBtn.onclick = () => { if (state.sfx) { play('off'); setSfx(false); } else { setSfx(true); play('on'); } };

  /* UI sounds for every button, chosen by data-sfx (capture phase so it runs before the button's own handler) */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('button');
    if (!b || b.disabled) return;
    let kind = b.dataset.sfx;
    if (kind === 'none') return;
    if (kind === 'theme') kind = document.body.classList.contains('day') ? 'night' : 'day';   // state before the toggle
    else if (!kind) kind = b.hasAttribute('data-close') ? 'close' : 'click';
    play(kind);
  }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && MBALAB.overlay.isOpen()) play('close'); }, true);

  document.addEventListener('visibilitychange', () => { if (ctx) document.hidden ? ctx.suspend() : ctx.resume(); });
  /* a saved "music on" choice starts with the first gesture, because browsers block autoplay */
  const firstGesture = () => { if (state.music) startMusic(); };
  ['pointerdown', 'keydown'].forEach(ev => document.addEventListener(ev, firstGesture, { once: true }));

  MBALAB.on('lang', refreshButtons);
  MBALAB.audio = { play, state, setMusic, setSfx, loadStart, loadEnd };
  refreshButtons();
});
