import fs from "node:fs";
import path from "node:path";

const REQUIRED_FIELDS = [
  "id",
  "day",
  "topic",
  "titleZh",
  "titleEn",
  "hookZh",
  "hookEn",
  "spokenScriptZh",
  "englishSubtitle",
  "onScreenText",
  "shotList",
  "avatarCue",
  "screenCue",
  "caption",
  "hashtags",
  "cta",
  "estimatedSeconds"
];

export function parseArgs(argv) {
  const args = {
    days: 7,
    platform: "douyin",
    angle: "real-workflows",
    batchId: "batch-001",
    fixture: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    if (key === "fixture") {
      args.fixture = true;
      continue;
    }
    const value = argv[i + 1];
    i += 1;
    if (key === "days") args.days = Number(value);
    else if (key === "platform") args.platform = value;
    else if (key === "angle") args.angle = value;
    else if (key === "batch-id") args.batchId = value;
  }

  return args;
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function buildFixtureBatch({ config, fixture, days = 7, platform = "douyin", angle = "real-workflows" }) {
  const selectedTopics = fixture.topics.slice(0, days);
  const scripts = selectedTopics.map((topic, index) => buildFixtureScript(topic, index + 1, platform, angle));

  return {
    batchId: fixture.batchId || "batch-001",
    generatedAt: "fixture",
    generationMode: "fixture-only",
    platform,
    cadence: config.cadence,
    angle,
    languageMode: config.languageMode,
    creatorIdentity: config.creatorIdentity,
    durationRangeSeconds: config.durationRangeSeconds,
    scripts
  };
}

function buildFixtureScript(topic, day, platform, angle) {
  const scriptMap = {
    "day-01": {
      titleZh: "模糊想法变成可执行计划",
      lineZh: "我只说想做 AI 创作者，Codex 没有直接写鸡汤，它先逼我定平台、频率、语言和第一批选题。这个动作很关键：AI 不是替你努力，而是把模糊愿望压成下一步。",
      subtitleEn: "Codex turned a vague creator idea into a concrete production plan.",
      text: ["模糊想法", "平台 + 频率 + 语言", "第一批选题", "下一步"]
    },
    "day-02": {
      titleZh: "把混乱想法变成短视频钩子",
      lineZh: "我现在会先让 ChatGPT 提取冲突：我以为的问题、观众真正关心的点、三秒内能听懂的钩子。脚本不是第一步，钩子才是。",
      subtitleEn: "Extract the conflict before writing the script.",
      text: ["不要先写全文", "先提取冲突", "3 秒钩子", "再写脚本"]
    },
    "day-03": {
      titleZh: "脚本和项目分工",
      lineZh: "ChatGPT 更适合扩展表达，Codex 更适合落地结构。我会让 ChatGPT 产出脚本，再让 Codex 建文件夹、模板、检查命令和渲染流程。",
      subtitleEn: "ChatGPT expands the idea; Codex makes it production-ready.",
      text: ["ChatGPT: 内容", "Codex: 结构", "模板", "检查与渲染"]
    },
    "day-04": {
      titleZh: "为什么“帮我爆火”是弱提示",
      lineZh: "帮我爆火太空了。更好的问法是：给我十个真实工作流视频钩子，每个都包含反常识、屏幕动作和观众能复制的一步。",
      subtitleEn: "'Make it viral' is vague. Ask for constraints people can copy.",
      text: ["弱提示: 帮我爆火", "强提示: 场景", "屏幕动作", "可复制一步"]
    },
    "day-05": {
      titleZh: "把 AI 翻车变成内容",
      lineZh: "如果 AI 生成错了，我不会直接删掉。我会记录：哪里错、为什么错、我怎么改提示词。这个修复过程本身就是观众想看的真实工作流。",
      subtitleEn: "An AI failure becomes content when you show the repair process.",
      text: ["AI 翻车", "记录错误", "修改提示词", "变成选题"]
    },
    "day-06": {
      titleZh: "我的每日 AI 创作者流水线",
      lineZh: "每天四步：先收一个真实问题，再让 ChatGPT 拆钩子，然后用 Codex 固化成项目文件，最后只渲染一个能发布的版本。",
      subtitleEn: "One problem, one hook, one project folder, one rendered video.",
      text: ["真实问题", "钩子", "项目文件", "渲染发布"]
    },
    "day-07": {
      titleZh: "不露脸加数字人，先自动化哪里",
      lineZh: "我的 v1 不让数字人讲完整条视频，只放开头和结尾。主体还是屏幕、字幕和工作流。先稳定内容，再增加人格化包装。",
      subtitleEn: "Use the avatar as framing first, not the whole show.",
      text: ["不露脸", "数字人开场", "主体看工作流", "先稳内容"]
    }
  };

  const mapped = scriptMap[topic.id];
  const baseCaption = `${mapped.titleZh}。我会继续用真实 AI 工作流记录从想法到视频的过程。`;

  return {
    id: topic.id,
    day,
    topic: topic.title,
    titleZh: mapped.titleZh,
    titleEn: topic.title,
    hookZh: topic.hookZh,
    hookEn: topic.hookEn,
    spokenScriptZh: mapped.lineZh,
    englishSubtitle: mapped.subtitleEn,
    onScreenText: mapped.text,
    shotList: [
      "0-3s: AI-avatar/text intro frames the problem.",
      "3-9s: Faceless screen area shows the prompt/workflow step.",
      "9-21s: Bilingual captions explain the practical takeaway.",
      "21-28s: End card gives one copyable action."
    ],
    avatarCue: "Intro/outro only. Use HEYGEN_AVATAR_ID if configured; otherwise show animated avatar placeholder card.",
    screenCue: `Show a ${platform} vertical workflow board for ${angle}: prompt, Codex task, output, publish checklist.`,
    caption: {
      zh: baseCaption,
      en: mapped.subtitleEn
    },
    hashtags: ["#AI工作流", "#ChatGPT", "#Codex", "#短视频创作", "#AICreator"],
    cta: {
      zh: "关注我，看我每天把一个 AI 工作流做成视频。",
      en: "Follow for one practical AI creator workflow every day."
    },
    estimatedSeconds: 28
  };
}

export async function generateWithOpenAI({ config, fixture, days, platform, angle }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || config.openai.defaultModel;
  const prompt = buildOpenAIPrompt({ config, fixture, days, platform, angle });
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      instructions:
        "You generate production-ready bilingual short-video batches. Return valid JSON only, no markdown.",
      input: prompt
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI Responses API request failed: ${response.status} ${body.slice(0, 400)}`);
  }

  const payload = await response.json();
  const text = extractOutputText(payload);
  const parsed = JSON.parse(text);
  return {
    ...parsed,
    generatedAt: new Date().toISOString(),
    generationMode: "openai-responses-api",
    model
  };
}

function buildOpenAIPrompt({ config, fixture, days, platform, angle }) {
  return JSON.stringify(
    {
      task: "Generate a daily short-video script batch.",
      requirements: {
        days,
        platform,
        angle,
        durationRangeSeconds: config.durationRangeSeconds,
        languageMode: config.languageMode,
        creatorIdentity: config.creatorIdentity,
        avatarMode: config.avatar.mode,
        requiredFields: REQUIRED_FIELDS
      },
      topics: fixture.topics.slice(0, days)
    },
    null,
    2
  );
}

function extractOutputText(payload) {
  if (typeof payload.output_text === "string") return payload.output_text;
  const chunks = [];
  for (const item of payload.output || []) {
    for (const part of item.content || []) {
      if (part.type === "output_text" && part.text) chunks.push(part.text);
    }
  }
  return chunks.join("\n").trim();
}

export function validateBatch(batch, expectedDays = 7) {
  const errors = [];
  if (!batch || typeof batch !== "object") errors.push("Batch must be an object.");
  if (!Array.isArray(batch?.scripts)) errors.push("Batch scripts must be an array.");
  if (Array.isArray(batch?.scripts) && batch.scripts.length !== expectedDays) {
    errors.push(`Expected ${expectedDays} scripts, received ${batch.scripts.length}.`);
  }

  for (const [index, script] of (batch?.scripts || []).entries()) {
    for (const field of REQUIRED_FIELDS) {
      if (!(field in script)) errors.push(`Script ${index + 1} is missing ${field}.`);
    }
    if (typeof script.estimatedSeconds !== "number" || script.estimatedSeconds < 20 || script.estimatedSeconds > 35) {
      errors.push(`Script ${index + 1} estimatedSeconds must be between 20 and 35.`);
    }
    if (!script.spokenScriptZh || !script.englishSubtitle) {
      errors.push(`Script ${index + 1} must include bilingual script fields.`);
    }
    if (!Array.isArray(script.onScreenText) || script.onScreenText.length < 3) {
      errors.push(`Script ${index + 1} needs at least three on-screen text beats.`);
    }
    if (!Array.isArray(script.shotList) || script.shotList.length < 3) {
      errors.push(`Script ${index + 1} needs at least three shot-list items.`);
    }
  }

  return errors;
}

export function batchToMarkdown(batch) {
  const lines = [
    `# ${batch.batchId} AI Workflow Video Batch`,
    "",
    `- Platform / 平台: ${batch.platform}`,
    `- Cadence / 频率: ${batch.cadence}`,
    `- Mode / 模式: ${batch.generationMode}`,
    `- Language / 语言: ${batch.languageMode}`,
    ""
  ];

  for (const script of batch.scripts) {
    lines.push(`## Day ${script.day}: ${script.titleZh}`);
    lines.push("");
    lines.push(`**English title:** ${script.titleEn}`);
    lines.push("");
    lines.push(`**中文口播:** ${script.spokenScriptZh}`);
    lines.push("");
    lines.push(`**English subtitle:** ${script.englishSubtitle}`);
    lines.push("");
    lines.push(`**On-screen text:** ${script.onScreenText.join(" / ")}`);
    lines.push("");
    lines.push(`**Avatar cue:** ${script.avatarCue}`);
    lines.push("");
    lines.push(`**Screen cue:** ${script.screenCue}`);
    lines.push("");
    lines.push(`**CTA:** ${script.cta.zh} / ${script.cta.en}`);
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

export function resolveProjectPath(...segments) {
  return path.resolve(process.cwd(), ...segments);
}
