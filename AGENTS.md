# AI Workflow Creator System

## Output Language

Project-facing results must be bilingual: Chinese first, then English. Include frontend, UI interface, backend, content system, and packaged video output when reporting work.

## Commands

```bash
npm run generate:batch -- --days 7 --platform douyin --angle real-workflows
npm test
npm run check
npm run render
```

## Project Rules

- Keep `OPENAI_API_KEY` out of tracked files and command output.
- Use fixture generation when no key is available.
- The video source is `index.html`; rendered MP4 files belong in `renders/`.
- After editing HyperFrames HTML, run `npm run check`.
- After completing a packaged-video change, run `npm run render`.
