# Brand identity

One page that says how MBA Lab looks and sounds, so every simulation, report and post feels like the same product.

## Name
- **MBA Lab** (two words, capital M, B, A, then "Lab"). In the nav bar and headings CSS shows it uppercase with letter spacing; never type it in capitals in copy.
- Tagline: **Mini simulations for business decisions.** Longer: "Interactive mini simulations and calculators for business decisions".
- Simulations are named in sentence case with `&`: "A/B Testing Lab", "Negotiation & BATNA". Calculation tools end in "Calculator": "SMART Calculator", "Decision Tree Calculator".

## Logo
An "M" drawn as a decision/trend line with three nodes: two peaks and a valley. It stands for a chart, a decision tree and the letter at once.

| File (`assets/logo/`) | Use |
|---|---|
| `icon.svg` | Master. Tab icon, top bar, loading screen, About dialog, reports |
| `icon-mark.svg` | Glyph alone on a transparent background, for dark surfaces |
| `logo-horizontal-light.png` / `-dark.png` | Logo with the word "MBA LAB" and tagline, for light / dark backgrounds (README, slides, documents) |
| `icon-512.png`, `icon-192.png`, `apple-touch-icon.png`, `icon-maskable-512.png` | App icons |
| `social-card.png` (1200x630) | Link preview (Open Graph, set in `index.html`) |
| `github-social-1280x640.png` | GitHub repository social preview |
| `google-consent-120.png` | Logo for the Google OAuth consent screen |
| `../../favicon.ico` | Legacy favicon |

**Rules**
- Keep clear space around the tile equal to one node diameter (about 1/7 of the tile width).
- Minimum size: 16 px for the tile on screen. Below 24 px use the tile, never the lockup.
- Do not recolour, stretch, rotate, add effects other than the soft cyan glow used in the top bar, or put it on a busy photo.
- On light backgrounds use the tile (it is dark and carries its own background) or `logo-horizontal-light.png`.

## Colour
| Role | Night | Day | Token |
|---|---|---|---|
| Primary / cyan | `#4dd2ff` | `#0a5fe0` | `--cy` |
| Accent / magenta | `#ff6ad5` | `#c4128a` | `--mg` |
| Success | `#6ee7b7` | `#07765a` | `--gn` |
| Warning | `#ffd166` | `#8f5a00` | `--am` |
| Danger | `#ff4d6d` | `#c2123f` | `--rd` |
| Violet | `#a78bfa` | `#5b34d1` | `--vi` |
| Logo tile | `#101a4a` to `#1a0b3a` | same | n/a |
| Report ink (white paper) | `#0f172a`, headings `#1e3a8a` | n/a | `shared/report.js` |

The brand gradient is **cyan to magenta at 135 degrees** (`--sk-grad` in the kit). Use the tokens from `css/cyber.css`, never raw hex in components. Night and day differ only by colour (see `docs/ARCHITECTURE.md`).

## Typography
- Headings and brand: **Orbitron** (display), **Chakra Petch** (UI), **Share Tech Mono** (tags and numbers); loaded in `index.html`. Reports use the system sans stack so they render anywhere.
- Sentence case everywhere; uppercase is a CSS style for tags, labels and the brand name only.

## Voice
- Clear, practical, short. Say what the player decides and what happens, not what the feature "leverages".
- Indonesian is formal: **Anda** for the reader, **saya** for the assistant. English and the other languages follow the same polite, neutral tone.
- The robot assistant is called **Bit**. It gives tips, never blame.
- Use numbers and units with a space and the local format (Rp 680 mn, 25%).

## Where the identity appears
| Place | How |
|---|---|
| Browser tab, iOS/Android home screen | `favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `manifest.webmanifest` |
| Top bar | tile (30 px) + "MBA LAB" |
| Simulation loading screen | tile (64 px) + "MBA Lab" + the simulation name |
| About dialog | tile (44 px) + name |
| Reports (PDF and HTML) | brand strip with the tile, name and site address, added by `shared/report.js` |
| Link previews | `social-card.png` through Open Graph tags |
| GitHub | README header, social preview image |
| Google sign-in | consent screen logo `google-consent-120.png` (upload it in Google Cloud), app name "MBA Lab" |

## Changing the brand
Edit `assets/logo/icon.svg` (and `icon-mark.svg`, `icon-maskable.svg`), regenerate the PNGs and `favicon.ico`, and update the colour table above. The inline copy of the tile in `shared/report.js` (`BRAND`) must match, because reports cannot load external files.
