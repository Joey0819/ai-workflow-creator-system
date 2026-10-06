import test from "node:test";
import assert from "node:assert/strict";
import { buildFixtureBatch, validateBatch } from "../src/content-system.mjs";
import config from "../creator.config.json" with { type: "json" };
import fixture from "../content/fixtures/batch-001-topics.json" with { type: "json" };

test("fixture batch creates seven bilingual scripts in the target duration range", () => {
  const batch = buildFixtureBatch({
    config,
    fixture,
    days: 7,
    platform: "douyin",
    angle: "real-workflows"
  });

  assert.equal(batch.scripts.length, 7);
  assert.deepEqual(validateBatch(batch, 7), []);

  for (const script of batch.scripts) {
    assert.ok(script.spokenScriptZh.length > 20);
    assert.ok(script.englishSubtitle.length > 10);
    assert.ok(script.estimatedSeconds >= 20);
    assert.ok(script.estimatedSeconds <= 35);
    assert.ok(script.avatarCue.includes("Intro/outro"));
  }
});
