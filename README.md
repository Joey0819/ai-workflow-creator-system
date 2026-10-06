# AI Workflow Creator System / AI工作流创作者系统

这是一个面向 Douyin/TikTok 的 AI 工作流短视频系统：ChatGPT/Codex 选题脚本生成、双语字幕、数字人开场/结尾占位、HyperFrames 竖屏视频模板和 MP4 渲染。

This is a Douyin/TikTok-oriented AI workflow creator system: ChatGPT/Codex idea and script generation, bilingual captions, avatar intro/outro placeholders, a HyperFrames vertical video template, and MP4 rendering.

## Frontend/UI Interface / 前端与界面

- `index.html` is a 1080x1920 HyperFrames composition.
- UI includes safe-zone guides, workflow cards, screen-operation panel, bilingual captions, and avatar intro/outro slots.
- If `HEYGEN_AVATAR_ID` is not configured, the video uses an animated avatar placeholder.

## Backend / 后端

- `npm run generate:batch -- --days 7 --platform douyin --angle real-workflows`
- The generator uses local fixtures when no `OPENAI_API_KEY` is available.
- When `OPENAI_API_KEY` is added later, the same command can call OpenAI Responses API.
- `OPENAI_MODEL` can override the default `gpt-5.4-mini`.

## Content / 内容

- JSON output: `content/batches/batch-001.json`
- Markdown output: `content/batches/batch-001.md`
- First batch contains 7 daily real-workflow short-video scripts.

## Verification / 验证

```bash
npm run generate:batch -- --days 7 --platform douyin --angle real-workflows
npm test
npm run check
npm run render
```

Rendered MP4 output is written to `renders/batch-001-preview.mp4`.

## Manual / 使用手册

See [USER_MANUAL.md](./USER_MANUAL.md) for the full bilingual step-by-step product guide.

完整双语分步使用手册见 [USER_MANUAL.md](./USER_MANUAL.md)。
