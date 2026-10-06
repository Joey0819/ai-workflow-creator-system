#!/usr/bin/env node
import fs from "node:fs";
import {
  batchToMarkdown,
  buildFixtureBatch,
  ensureDir,
  generateWithOpenAI,
  parseArgs,
  readJson,
  resolveProjectPath,
  validateBatch
} from "../src/content-system.mjs";

const args = parseArgs(process.argv.slice(2));
const config = readJson(resolveProjectPath("creator.config.json"));
const fixture = readJson(resolveProjectPath("content", "fixtures", "batch-001-topics.json"));

let batch = null;
if (!args.fixture) {
  batch = await generateWithOpenAI({
    config,
    fixture,
    days: args.days,
    platform: args.platform,
    angle: args.angle
  });
}

if (!batch) {
  batch = buildFixtureBatch({
    config,
    fixture,
    days: args.days,
    platform: args.platform,
    angle: args.angle
  });
}

const errors = validateBatch(batch, args.days);
if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const outDir = resolveProjectPath("content", "batches");
ensureDir(outDir);
fs.writeFileSync(resolveProjectPath("content", "batches", `${batch.batchId}.json`), `${JSON.stringify(batch, null, 2)}\n`);
fs.writeFileSync(resolveProjectPath("content", "batches", `${batch.batchId}.md`), batchToMarkdown(batch));

console.log(`Generated ${batch.scripts.length} scripts in ${batch.generationMode} mode.`);
console.log(`Wrote content/batches/${batch.batchId}.json`);
console.log(`Wrote content/batches/${batch.batchId}.md`);
