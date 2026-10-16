"""Compare two screenshot folders made by tests/shots.js. Prints the share of changed pixels per image.  Usage: python3 tests/shotdiff.py <dirA> <dirB>"""
import sys, os
from PIL import Image, ImageChops
a, b = sys.argv[1], sys.argv[2]; bad = 0
for f in sorted(os.listdir(a)):
    if not f.endswith('.png') or not os.path.exists(os.path.join(b, f)): continue
    x, y = Image.open(os.path.join(a, f)).convert('RGB'), Image.open(os.path.join(b, f)).convert('RGB')
    if x.size != y.size: print('SIZE', f, x.size, y.size); bad += 1; continue
    d = ImageChops.difference(x, y).convert('L').point(lambda v: 255 if v > 24 else 0); n = sum(1 for v in d.getdata() if v); r = n / (x.size[0] * x.size[1])
    flag = '  <-- CHANGED' if r > 0.004 else ''
    if flag: bad += 1
    print(f'{r*100:6.2f}%  {f}{flag}')
print('differences:', bad)
