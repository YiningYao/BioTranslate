# BioTranslate Pro

A bright, professional single-page Chinese-English biomedical translation website built with **Next.js + TypeScript + Tailwind CSS**.

## What changed
- Removed mock-only translation behavior.
- Added a local biomedical glossary fallback for direct term-level translation.
- Exact glossary matches return concise terminology translations.
- Longer text returns professional biomedical academic-style translations.
- Added a detected terminology table based on the input content.
- Redesigned UI with a warm ivory + cream academic visual system (no dark mode), improved spacing, button styles, error and loading states.

## Included biomedical glossary entries
- 光开关荧光蛋白 → photoswitchable fluorescent protein
- 荧光蛋白 → fluorescent protein
- 光漂白 → photobleaching
- 定向进化 → directed evolution
- 发色团 → chromophore
- 活细胞成像 → live-cell imaging
- 多重成像 → multiplexed imaging
- 时间复用成像 → temporally multiplexed imaging
- 可逆光开关荧光蛋白 → reversibly photoswitchable fluorescent protein

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
