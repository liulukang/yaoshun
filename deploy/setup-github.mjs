#!/usr/bin/env node
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { parseEnv } from "node:util";

// Run locally after `gh auth login`; secret values are passed only on stdin.
const repo = "yaoshuntoys/yaoshun";
const keyPath = process.argv[2] || path.join(homedir(), ".ssh/lucon.pem");
function gh(args, input) {
  const result = spawnSync("gh", args, { input, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`gh ${args.slice(0, 2).join(" ")} failed: ${result.stderr}`);
  return result.stdout;
}
gh(["auth", "status"]);
const metadata = JSON.parse(gh(["api", `repos/${repo}`]));
assert.equal(metadata.permissions?.push, true, "GitHub repository write access is required to configure Actions.");
const hosts = spawnSync("ssh-keygen", ["-F", "119.28.153.42"], { encoding: "utf8" });
assert.equal(hosts.status, 0, "First verify the server host key and add it to ~/.ssh/known_hosts.");
const knownHosts = hosts.stdout.split("\n").filter((line) => line && !line.startsWith("#")).join("\n");
assert.ok(knownHosts);
const key = readFileSync(keyPath, "utf8");
assert.match(key, /BEGIN .*PRIVATE KEY/);

for (const [name, value] of Object.entries({
  DEPLOY_HOST: "119.28.153.42",
  DEPLOY_USER: "ubuntu",
  DEPLOY_SSH_PRIVATE_KEY: key,
  DEPLOY_KNOWN_HOSTS: knownHosts,
})) {
  gh(["secret", "set", name, "--repo", repo], value);
  console.log(`Configured repository secret ${name}`);
}
const local = parseEnv(readFileSync(new URL("../apps/website/.env.local", import.meta.url), "utf8"));
if (!local.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && local.GOOGLE_SITE_VERIFICATION) {
  local.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = local.GOOGLE_SITE_VERIFICATION;
}
for (const [name, value] of Object.entries(local)) {
  if (name.startsWith("NEXT_PUBLIC_") || name === "ASSET_BASE_URL") {
    gh(["variable", "set", name, "--repo", repo], value);
    console.log(`Configured public build variable ${name}`);
  }
}
console.log("GitHub Actions configuration is ready. Runtime email credentials stay on the server.");
