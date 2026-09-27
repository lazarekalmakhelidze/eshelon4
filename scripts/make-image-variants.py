#!/usr/bin/env python3
"""Creates light WebP copies of the site's static images (public/ → public/v/)
and writes src/imageManifest.json so the site can serve them automatically.
Re-run after adding new images to public/:  python3 scripts/make-image-variants.py
"""
import json, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(PUB, 'v')
SKIP_DIRS = {'v'}
SKIP_FILES = {'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'favicon-32.png', 'og-image.jpg'}
WIDTHS = [480, 960, 1600]      # responsive steps (never upscaled)
LONG_RATIO = 2.2               # very tall images (full case boards) keep one width
# Big hero photo: sharp on Retina/4K screens (it is only ever shown at full width on desktop)
SPECIAL = {
    '/cover-desktop.jpg': {'widths': [1280, 1920, 2880, 3358], 'quality': 90},
}

manifest = {}
total_in = total_out = 0
for dirpath, dirnames, filenames in os.walk(PUB):
    rel_dir = os.path.relpath(dirpath, PUB)
    if rel_dir.split(os.sep)[0] in SKIP_DIRS:
        continue
    for name in filenames:
        if name in SKIP_FILES or not name.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        src = os.path.join(dirpath, name)
        url = '/' + os.path.relpath(src, PUB).replace(os.sep, '/')
        # only images the site actually shows
        if not (url.startswith(('/optimized/', '/logos/')) or url.count('/') == 1):
            continue
        try:
            im = Image.open(src)
            im.load()
        except Exception as e:
            print('skip', url, e, file=sys.stderr)
            continue
        has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        im = im.convert('RGBA' if has_alpha else 'RGB')
        w, h = im.size
        tall = h / w > LONG_RATIO
        spec = SPECIAL.get(url, {})
        widths = spec.get('widths') or (WIDTHS + ([160] if 'logo' in name.lower() else []))
        quality = spec.get('quality', 80)
        steps = [min(w, 1400)] if tall else sorted({min(w, x) for x in widths})
        stem = os.path.splitext(os.path.relpath(src, PUB))[0]
        made = []
        for sw in steps:
            dst = os.path.join(OUT, f'{stem}-{sw}.webp')
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if not os.path.exists(dst) or os.path.getmtime(dst) < os.path.getmtime(src):
                img = im if sw == w else im.resize((sw, round(h * sw / w)), Image.LANCZOS)
                img.save(dst, 'WEBP', quality=quality, method=6)
            made.append(sw)
            total_out += os.path.getsize(dst) if sw == steps[-1] else 0
        total_in += os.path.getsize(src)
        manifest[url] = {'w': made, 'h': round(h * made[-1] / w) if made else h}
with open(os.path.join(ROOT, 'src', 'imageManifest.json'), 'w') as f:
    json.dump(manifest, f, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
print(f'{len(manifest)} images · originals {total_in/1e6:.1f} MB → largest WebP {total_out/1e6:.1f} MB')
