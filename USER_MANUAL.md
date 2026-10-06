# AI Workflow Creator System User Manual / AI工作流创作者系统使用手册

Tested on 2026-06-09. This manual explains how to use the product as a daily Douyin/TikTok AI-workflow content system.

2026-06-09 已测试。本手册说明如何把这个项目当作日更 Douyin/TikTok AI 工作流内容系统来使用。

## 1. What This Product Does / 产品用途

中文：

这个产品帮你把“我想做 AI 创作者”变成一个可执行的视频生产流程：

- 生成 7 条日更短视频脚本。
- 每条脚本包含中文口播、英文字幕、屏幕文案、镜头提示、数字人开场/结尾提示、发布文案和标签。
- 提供 1080x1920 竖屏 HyperFrames 视频模板。
- 可以预览 UI，也可以渲染成 MP4。
- 当前是 `fixture-only` 模式，不需要 OpenAI API key。
- 以后如果配置 `OPENAI_API_KEY`，同一个生成命令可以切到 live API 生成。

English:

This product turns the idea “I want to become an AI creator” into a repeatable video-production workflow:

- Generate 7 daily short-video scripts.
- Each script includes Chinese narration, English subtitle, on-screen text, shot list, avatar intro/outro cue, caption, and hashtags.
- Use a 1080x1920 vertical HyperFrames video template.
- Preview the UI and render an MP4.
- Current mode is `fixture-only`, so no OpenAI API key is required.
- Later, when `OPENAI_API_KEY` is configured, the same generation command can use the live API path.

## 2. Product Parts / 产品组成

中文：

- Frontend/UI interface: `index.html`
  - 竖屏视频画面。
  - 包含安全区域、工作流卡片、模拟屏幕操作区、双语字幕、数字人开场/结尾占位。
- Backend/content generator: `scripts/generate-batch.mjs`
  - 生成脚本批次。
  - 没有 API key 时自动使用 fixture 数据。
- Content outputs:
  - `content/batches/batch-001.json`
  - `content/batches/batch-001.md`
- Packaged video:
  - `renders/batch-001-preview.mp4`

English:

- Frontend/UI interface: `index.html`
  - Vertical video composition.
  - Includes safe zones, workflow cards, screen-operation panel, bilingual captions, and avatar intro/outro placeholder.
- Backend/content generator: `scripts/generate-batch.mjs`
  - Generates script batches.
  - Automatically uses fixture data when no API key exists.
- Content outputs:
  - `content/batches/batch-001.json`
  - `content/batches/batch-001.md`
- Packaged video:
  - `renders/batch-001-preview.mp4`

## 3. First-Time Start / 第一次启动

Open a terminal and enter the project:

打开终端，进入项目目录：

```bash
cd /Users/chengneng/Project/Creative/ai-workflow-creator-system
```

Check Node:

检查 Node：

```bash
node -v
```

Expected: Node `22` or newer. This project was tested with Node `v24.15.0`.

预期：Node `22` 或更新。本项目测试时使用的是 Node `v24.15.0`。

## 4. Generate Video Ideas and Scripts / 生成视频选题和脚本

Run:

运行：

```bash
npm run generate:batch -- --days 7 --platform douyin --angle real-workflows
```

Expected output:

预期输出：

```text
Generated 7 scripts in fixture-only mode.
Wrote content/batches/batch-001.json
Wrote content/batches/batch-001.md
```

Use the Markdown file for human reading:

给人阅读用 Markdown 文件：

```text
/Users/chengneng/Project/Creative/ai-workflow-creator-system/content/batches/batch-001.md
```

Use the JSON file for automation:

给自动化或后续程序使用 JSON 文件：

```text
/Users/chengneng/Project/Creative/ai-workflow-creator-system/content/batches/batch-001.json
```

## 5. Read One Script / 阅读一条脚本

Open `content/batches/batch-001.md`.

打开 `content/batches/batch-001.md`。

Each day contains:

每一天包含：

- Chinese title / 中文标题
- English title / 英文标题
- Chinese spoken script / 中文口播
- English subtitle / 英文字幕
- On-screen text beats / 屏幕文字节奏
- Avatar cue / 数字人提示
- Screen cue / 屏幕操作提示
- CTA / 行动引导

Recommended daily workflow:

推荐日常流程：

1. Pick one day.
2. Read the Chinese spoken script out loud.
3. Edit any wording that does not sound like you.
4. Keep the English subtitle short.
5. Use the screen cue to decide what to show on screen.
6. Render or record the video.

## 6. Preview the Frontend/UI / 预览前端和 UI

Start HyperFrames Studio:

启动 HyperFrames Studio：

```bash
npm run dev
```

Open:

打开：

```text
http://localhost:3002/#project/ai-workflow-creator-system
```

If another HyperFrames server is already running, your actual port may be different. In the latest test, the project was reachable at:

如果已经有另一个 HyperFrames 服务在运行，实际端口可能不同。本次测试中项目可访问地址是：

```text
http://localhost:3017/#project/ai-workflow-creator-system
```

What to check in the preview:

预览时检查：

- The video canvas is vertical 1080x1920.
- The safe-zone frame is visible.
- The avatar intro card appears near the top.
- The workflow cards appear in the middle.
- The terminal/screen panel appears before captions.
- Chinese and English captions stay readable.
- The outro CTA card appears near the end.

## 7. Run Quality Checks / 运行质量检查

Run:

运行：

```bash
npm test
npm run check
```

Expected test result:

预期测试结果：

```text
pass 1
fail 0
```

Expected HyperFrames check:

预期 HyperFrames 检查：

```text
0 errors, 0 warnings
No console errors
115 text elements pass WCAG AA
0 layout issues
```

## 8. Render the Packaged MP4 / 渲染打包 MP4

Run:

运行：

```bash
npm run render
```

Output:

输出：

```text
/Users/chengneng/Project/Creative/ai-workflow-creator-system/renders/batch-001-preview.mp4
```

Current verified MP4 metadata:

当前已验证 MP4 信息：

- Size: 1080x1920
- FPS: 30
- Duration: 28 seconds
- File size: about 1.8 MB

## 9. Publish Workflow / 发布流程

中文：

1. 打开 `content/batches/batch-001.md`。
2. 选择当天脚本。
3. 根据 `spokenScriptZh` 录中文口播，或用它做字幕。
4. 根据 `englishSubtitle` 制作英文字幕。
5. 使用 `onScreenText` 作为大字卡或画面重点。
6. 使用 `caption.zh` 作为发布文案基础。
7. 使用 `hashtags` 作为 Douyin/TikTok 标签基础。
8. 上传 `renders/batch-001-preview.mp4`，或者把模板改成当天内容后重新渲染。

English:

1. Open `content/batches/batch-001.md`.
2. Pick the script for the day.
3. Use `spokenScriptZh` for Chinese narration or captions.
4. Use `englishSubtitle` for English subtitles.
5. Use `onScreenText` as large visual text beats.
6. Use `caption.zh` as the base publishing caption.
7. Use `hashtags` as the base Douyin/TikTok tags.
8. Upload `renders/batch-001-preview.mp4`, or edit the template for that day and render again.

## 10. Daily Production Routine / 日更生产流程

中文：

每天建议按这个顺序：

1. 运行脚本生成命令。
2. 从 7 条里选 1 条最想拍的。
3. 用 ChatGPT 润色口播，但保持短句。
4. 用 Codex 修改 `index.html` 里的标题、字幕和屏幕文字。
5. 运行 `npm run check`。
6. 运行 `npm run render`。
7. 检查 MP4。
8. 发布到 Douyin/TikTok。
9. 记录数据：完播率、评论、收藏、转发。
10. 第二天用表现最好的角度继续做。

English:

Recommended daily order:

1. Run the script-generation command.
2. Pick the strongest script from the 7 ideas.
3. Use ChatGPT to polish narration, keeping sentences short.
4. Use Codex to update `index.html` titles, captions, and screen text.
5. Run `npm run check`.
6. Run `npm run render`.
7. Review the MP4.
8. Publish to Douyin/TikTok.
9. Track retention, comments, saves, and shares.
10. Use the best-performing angle for the next day.

## 11. Optional Live OpenAI Mode / 可选 Live OpenAI 模式

中文：

当前项目不需要 API key。没有 `OPENAI_API_KEY` 时，生成器自动使用 fixture 数据。

以后如果你要启用 live API：

- 只把 key 放在本地环境变量或未提交的 `.env.local`。
- 不要把 key 写进 README、脚本、JSON、Markdown 或聊天消息。
- 设置 `OPENAI_MODEL` 可以覆盖默认模型。

English:

The current project does not require an API key. Without `OPENAI_API_KEY`, the generator automatically uses fixture data.

Later, if you enable live API mode:

- Keep the key only in a local environment variable or an untracked `.env.local`.
- Never put the key in README, scripts, JSON, Markdown, or chat messages.
- Set `OPENAI_MODEL` to override the default model.

## 12. Troubleshooting / 故障排查

### Preview server does not open / 预览打不开

中文：

检查是否有服务在运行：

```bash
lsof -iTCP -sTCP:LISTEN -n -P | grep 3017
```

如果没有，重新运行：

```bash
npm run dev
```

English:

Check whether a server is running:

```bash
lsof -iTCP -sTCP:LISTEN -n -P | grep 3017
```

If not, restart:

```bash
npm run dev
```

### Render says FFmpeg is missing / 渲染提示缺少 FFmpeg

中文：

本项目已经安装 `ffmpeg-static` 和 `ffprobe-static`，`npm run render` 会优先使用本地二进制文件。直接运行：

```bash
npm run render
```

English:

This project includes `ffmpeg-static` and `ffprobe-static`; `npm run render` uses local binaries first. Run:

```bash
npm run render
```

### Script generation does not use OpenAI / 脚本没有调用 OpenAI

中文：

这是正常现象。当前是 fixture-only 工作流。没有 `OPENAI_API_KEY` 时不会调用 live API。

English:

This is expected. The current workflow is fixture-only. Without `OPENAI_API_KEY`, it will not call the live API.

### HyperFrames check fails / HyperFrames 检查失败

中文：

先读错误信息。常见问题包括：

- 文本超出画面。
- 字幕进入动画把文字推到画布外。
- 对比度不足。
- timed element 缺少 `class="clip"`、`data-start`、`data-duration` 或 `data-track-index`。

修复后运行：

```bash
npm run check
```

English:

Read the error first. Common causes:

- Text outside the canvas.
- Caption entrance motion pushes text off-screen.
- Low contrast.
- Timed element missing `class="clip"`, `data-start`, `data-duration`, or `data-track-index`.

After fixing, run:

```bash
npm run check
```

## 13. Current Test Report / 当前测试报告

中文：

本次手动测试已完成：

- `npm run generate:batch -- --days 7 --platform douyin --angle real-workflows`
- `npm test`
- `npm run check`
- `npm run render`
- MP4 metadata check
- Studio route check

结果：

- 生成 7 条脚本。
- 单元测试通过。
- HyperFrames lint: 0 errors, 0 warnings。
- Console: no errors。
- Text: 115 elements pass WCAG AA。
- Layout inspect: 0 layout issues。
- MP4: 1080x1920, 30fps, 28 seconds。
- Studio route reachable.

English:

Manual test completed:

- `npm run generate:batch -- --days 7 --platform douyin --angle real-workflows`
- `npm test`
- `npm run check`
- `npm run render`
- MP4 metadata check
- Studio route check

Results:

- Generated 7 scripts.
- Unit test passed.
- HyperFrames lint: 0 errors, 0 warnings.
- Console: no errors.
- Text: 115 elements pass WCAG AA.
- Layout inspect: 0 layout issues.
- MP4: 1080x1920, 30fps, 28 seconds.
- Studio route reachable.
