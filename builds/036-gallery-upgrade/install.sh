#!/usr/bin/env bash
set -e

echo "=========================================="
echo "BUILD 036.1"
echo "PREMIUM GALLERY UPGRADE"
echo "=========================================="

FILE="components/storefront/ProductGallery.tsx"

cp "$FILE" "${FILE}.backup-$(date +%Y%m%d-%H%M%S)"

python3 <<'PY'
from pathlib import Path

path = Path("components/storefront/ProductGallery.tsx")
text = path.read_text()

#######################################################
# useState
#######################################################

text = text.replace(
'const [lightboxOpen, setLightboxOpen] = useState(false);',
'''const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);'''
)

#######################################################
# motion image
#######################################################

text = text.replace(
'className="h-full w-full object-cover"',
'''onLoad={() => setLoading(false)}
                className="h-full w-full object-cover transition duration-700 hover:scale-110 cursor-zoom-in"'''
)

#######################################################
# skeleton
#######################################################

marker = '<AnimatePresence mode="wait" initial={false}>'

replacement = '''
            {loading && (
              <div className="absolute inset-0 animate-pulse bg-neutral-200" />
            )}

            <AnimatePresence mode="wait" initial={false}>
'''

text = text.replace(marker, replacement)

path.write_text(text)

print("Gallery upgraded.")
PY

echo
echo "SUCCESS"
echo
