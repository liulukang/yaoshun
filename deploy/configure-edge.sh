#!/usr/bin/env bash
set -euo pipefail

# Reuse the HTTPS proxy already serving Lucon on this host. Preserve every other
# virtual host and the bind-mounted file's inode when updating this fragment.
manifest_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
caddy_file="${CADDY_FILE:-/opt/lucon/infra/caddy/Caddyfile}"
caddy_container="${CADDY_CONTAINER:-lucon-edge-1}"
backup="$(mktemp)"
cp "$caddy_file" "$backup"
trap 'rm -f "$backup"' EXIT

python3 - "$caddy_file" "$manifest_dir/infra/caddy/Caddyfile" <<'PY'
from pathlib import Path
import sys

target, fragment = map(Path, sys.argv[1:])
start, end = '# BEGIN YAOSHUN WEBSITE', '# END YAOSHUN WEBSITE'
original = target.read_text()
block = f'{start}\n{fragment.read_text().rstrip()}\n{end}\n'
if start in original:
    if original.count(start) != 1 or original.count(end) != 1:
        raise SystemExit('Invalid Yaoshun Caddy markers; inspect the config first.')
    prefix, tail = original.split(start, 1)
    _, suffix = tail.split(end, 1)
    updated = prefix + block + suffix.lstrip('\n')
else:
    if end in original:
        raise SystemExit('Invalid Yaoshun Caddy markers.')
    updated = original.rstrip() + '\n\n' + block
if updated != original:
    target.write_text(updated)
PY

if cmp -s "$backup" "$caddy_file"; then
  echo 'Caddy routes already match this release.'
  exit 0
fi

if ! docker exec "$caddy_container" caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile \
  || ! docker exec "$caddy_container" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile; then
  cat "$backup" > "$caddy_file"
  docker exec "$caddy_container" caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
  echo 'Caddy update failed; restored the previous configuration.' >&2
  exit 1
fi
