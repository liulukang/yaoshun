#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { chromium } from "playwright";

function parseArgs(argv) {
  const args = {
    out: path.resolve(process.cwd(), "scripts/auth/1688-storage-state.json"),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];
    if (token === "--out" && next) {
      args.out = path.resolve(process.cwd(), next);
      i += 1;
    }
  }

  return args;
}

function waitForEnter(message) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await fs.mkdir(path.dirname(args.out), { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    locale: "zh-CN",
    viewport: { width: 1366, height: 960 },
  });
  const page = await context.newPage();

  try {
    await page.goto("https://login.1688.com/", { waitUntil: "domcontentloaded", timeout: 45000 });
    process.stdout.write("\n请在打开的浏览器中完成1688登录。\n");
    await waitForEnter("登录成功后，请回到终端按回车保存登录态：");

    await context.storageState({ path: args.out });
    process.stdout.write(`\n已保存登录态文件：${args.out}\n`);
  } finally {
    await browser.close().catch(() => {});
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});

