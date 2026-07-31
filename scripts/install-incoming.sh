#!/usr/bin/env bash
# Installs client-supplied photos from incoming/ into public/images/services/.
# Resizes to the same envelope as the rest of the library (1500px, ~200-350KB)
# and backs up whatever it replaces.
set -euo pipefail
cd "$(dirname "$0")/.."

SLOTS=(bis-certification transportation epr-compliance)
BACKUP="incoming/replaced-$(date +%Y%m%d-%H%M%S)"
missing=0

for slot in "${SLOTS[@]}"; do
  [ -f "incoming/$slot.jpg" ] || { echo "missing: incoming/$slot.jpg"; missing=1; }
done
[ "$missing" -eq 0 ] || { echo "Nothing installed."; exit 1; }

mkdir -p "$BACKUP"
for slot in "${SLOTS[@]}"; do
  target="public/images/services/$slot.jpg"
  cp "$target" "$BACKUP/$slot.jpg"
  cp "incoming/$slot.jpg" "$target"
  sips -Z 1500 -s format jpeg -s formatOptions 62 "$target" >/dev/null
  printf "  %-22s %5dKB  (previous saved to %s)\n" "$slot" "$(du -k "$target" | cut -f1)" "$BACKUP"
done
echo "Done. Previous versions: $BACKUP"
