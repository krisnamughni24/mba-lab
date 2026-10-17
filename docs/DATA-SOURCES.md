# Data sources and licences

## Word Network: Small World of Words (SWOW-EN)

- File: `simulations/word-network/data/swow.js` (generated, about 1.1 MB). Rebuild with
  `python3 tools/build-swow.py path/to/strength.SWOW-EN.R123.20180827.csv 10`.
- Content: for each of 12,217 English cue words, its 10 strongest responses that are themselves cues (122,170 links, weight = strength x 1000).
- Source: De Deyne, S., Navarro, D. J., Perfors, A., Brysbaert, M., & Storms, G. (2019). The "Small World of Words" English word association
  norms for over 12,000 cue words. *Behavior Research Methods*, 51, 987-1006. https://smallworldofwords.org
- Licence: **CC BY-NC-ND 3.0**. Attribution is shown inside the simulation. The licence allows non-commercial use only and does not allow
  distributing adapted versions; this reduced file is an adaptation. The owner of this repository decided to include it for non-commercial
  teaching and research and carries responsibility for that choice. If the site is made commercial, or you want to be fully clear of the ND
  clause, ask the SWOW team for written permission or replace the file with a self-made data set.
- Language: English only. The interface is translated, the words are not.
