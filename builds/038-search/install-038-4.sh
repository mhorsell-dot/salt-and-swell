#!/usr/bin/env bash
set -e

echo "========================================"
echo " BUILD 038.4"
echo " SEARCH INTEGRATION"
echo "========================================"

FILE="components/layout/Navbar.tsx"

cp "$FILE" "$FILE.backup"

python3 <<'PY'
from pathlib import Path

path = Path("components/layout/Navbar.tsx")
text = path.read_text()

# Add imports
if 'import SearchDrawer' not in text:
    text = text.replace(
        'import MobileMenu from "./MobileMenu";',
        '''import MobileMenu from "./MobileMenu";
import SearchDrawer from "./SearchDrawer";
import SearchResults from "@/components/search/SearchResults";'''
    )

# Add search state
text = text.replace(
    'const [menuOpen, setMenuOpen] = useState(false);',
    '''const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");'''
)

# Open search when clicking icon
text = text.replace(
    '<Search className="h-5 w-5" />',
    '<Search className="h-5 w-5" />'
)

text = text.replace(
    '<button className="rounded-full p-2 hover:bg-black/5">',
    '<button onClick={() => setSearchOpen(true)} className="rounded-full p-2 hover:bg-black/5">',
    1
)

# Insert SearchDrawer after MobileMenu
marker = '''<MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />'''

replacement = marker + '''

      <SearchDrawer
        open={searchOpen}
        value={query}
        onChange={setQuery}
        onClose={() => {
          setSearchOpen(false);
          setQuery("");
        }}
      >
        <SearchResults query={query} />
      </SearchDrawer>
'''

text = text.replace(marker, replacement)

path.write_text(text)
PY

echo
echo "========================================"
echo " Search Connected"
echo "========================================"
echo
