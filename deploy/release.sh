#!/usr/bin/env bash
set -euo pipefail

deploy_root="${DEPLOY_ROOT:-/opt/yaoshun}"
manifest_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
image="${1:?Usage: release.sh ghcr.io/yaoshuntoys/yaoshun/website@sha256:...}"
if [[ ! "$image" =~ ^ghcr\.io/yaoshuntoys/yaoshun/website(@sha256:[a-f0-9]{64}|:[a-f0-9]{40})$ ]]; then
  echo 'Expected a Yaoshun website image digest or full commit SHA tag.' >&2
  exit 1
fi

mkdir -p "$deploy_root"
exec 9> "$deploy_root/.deploy.lock"
flock -w 600 9
export WEBSITE_ENV_FILE="$deploy_root/apps/website/.env.production"
test -s "$WEBSITE_ENV_FILE" || { echo "Missing $WEBSITE_ENV_FILE" >&2; exit 1; }
docker network inspect "${EDGE_NETWORK:-lucon_default}" >/dev/null

previous_manifest=''
previous_image=''
if [[ -f "$deploy_root/current/.image" ]]; then
  previous_manifest="$(readlink -f "$deploy_root/current")"
  previous_image="$(cat "$deploy_root/current/.image")"
fi

compose() {
  WEBSITE_IMAGE="$image" docker compose -f "$manifest_dir/infra/compose.prod.yaml" "$@"
}

# Pull and validate before replacing the running container.
compose config --quiet
compose pull
rollback() {
  trap - ERR
  echo 'Deployment failed.' >&2
  if [[ -n "$previous_image" ]]; then
    echo 'Restoring the previous website image and manifest.' >&2
    WEBSITE_IMAGE="$previous_image" docker compose -f "$previous_manifest/infra/compose.prod.yaml" \
      up -d --wait --wait-timeout 180
    bash "$previous_manifest/deploy/configure-edge.sh"
  fi
  exit 1
}
trap rollback ERR
compose up -d --wait --wait-timeout 180
compose exec -T yaoshun-website node -e \
  "fetch('http://127.0.0.1:3000/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
compose exec -T yaoshun-website node --input-type=module - http://127.0.0.1:3000 --media \
  < "$manifest_dir/deploy/smoke.mjs"
bash "$manifest_dir/deploy/configure-edge.sh"
printf '%s\n' "$image" > "$manifest_dir/.image"
if [[ -n "$previous_manifest" && "$previous_manifest" != "$manifest_dir" ]]; then
  ln -sfn "$previous_manifest" "$deploy_root/previous"
fi
ln -sfn "$manifest_dir" "$deploy_root/current"
trap - ERR
echo "Website deployed: $image"
