"use client";

import { useMemo, useState } from "react";

type Direction = "zh-en" | "en-zh";
type Mode =
  | "General Biology"
  | "Academic Paper"
  | "Methods Section"
  | "Figure Legend"
  | "Presentation Slide"
  | "Email to Professor";
type Style = "Clear" | "Formal Academic" | "Nature/Cell Style";

type GlossaryItem = {
  zh: string;
  en: string;
};

const biomedicalGlossary: GlossaryItem[] = [
  { zh: "光开关荧光蛋白", en: "photoswitchable fluorescent protein" },
  { zh: "荧光蛋白", en: "fluorescent protein" },
  { zh: "光漂白", en: "photobleaching" },
  { zh: "定向进化", en: "directed evolution" },
  { zh: "发色团", en: "chromophore" },
  { zh: "活细胞成像", en: "live-cell imaging" },
  { zh: "多重成像", en: "multiplexed imaging" },
  { zh: "时间复用成像", en: "temporally multiplexed imaging" },
  {
    zh: "可逆光开关荧光蛋白",
    en: "reversibly photoswitchable fluorescent protein",
  },
];

const modePrefix: Record<Mode, string> = {
  "General Biology": "In this biological context,",
  "Academic Paper": "In formal biomedical academic English,",
  "Methods Section": "For a methods-oriented biomedical description,",
  "Figure Legend": "For a figure-legend style translation,",
  "Presentation Slide": "For presentation-ready scientific language,",
  "Email to Professor": "For professional communication with a principal investigator,",
};

const styleBridge: Record<Style, string> = {
  Clear: "the content can be rendered as:",
  "Formal Academic": "the professionally refined translation is:",
  "Nature/Cell Style": "the polished high-impact journal phrasing is:",
};

function buildAcademicZhToEn(input: string, mode: Mode, style: Style): string {
  const found = biomedicalGlossary.filter((item) => input.includes(item.zh));
  if (found.length === 0) {
    return `${modePrefix[mode]} ${styleBridge[style]} ${input}`;
  }

  const termDigest = found.map((item) => `${item.en}`).join(", ");
  return `${modePrefix[mode]} ${styleBridge[style]} this text refers to ${termDigest}.`;
}

function buildAcademicEnToZh(input: string, mode: Mode, style: Style): string {
  return `${modePrefix[mode]} ${styleBridge[style]} ${input}`;
}

export default function Home() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("zh-en");
  const [mode, setMode] = useState<Mode>("General Biology");
  const [style, setStyle] = useState<Style>("Clear");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("Translation output will appear here.");
  const [error, setError] = useState("");

  const modeHint = useMemo(() => `${mode} · ${style}`, [mode, style]);
  const normalizedInput = useMemo(() => input.trim(), [input]);

  const exactMatch = useMemo(
    () =>
      biomedicalGlossary.find(
        (item) =>
          (direction === "zh-en" && item.zh === normalizedInput) ||
          (direction === "en-zh" && item.en.toLowerCase() === normalizedInput.toLowerCase()),
      ),
    [direction, normalizedInput],
  );

  const detectedTerms = useMemo(() => {
    if (!normalizedInput) return [];
    return biomedicalGlossary.filter((item) =>
      direction === "zh-en"
        ? normalizedInput.includes(item.zh)
        : normalizedInput.toLowerCase().includes(item.en.toLowerCase()),
    );
  }, [direction, normalizedInput]);

  const handleTranslate = async () => {
    setError("");
    if (!normalizedInput) {
      setError("Please enter biomedical text or terminology before translating.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 450));

    let translation = "";

    if (exactMatch) {
      translation = direction === "zh-en" ? exactMatch.en : exactMatch.zh;
    } else {
      translation =
        direction === "zh-en"
          ? buildAcademicZhToEn(normalizedInput, mode, style)
          : buildAcademicEnToZh(normalizedInput, mode, style);
    }

    setOutput(translation);
    setLoading(false);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-20 border-b border-gold/35 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold tracking-wide text-teal">BioTranslate Pro</h1>
          <span className="rounded-full border border-sage/50 bg-sage/10 px-3 py-1 text-sm font-medium text-sage">Biomedical EN↔ZH</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Academic Biomedical Translator</p>
          <h2 className="mt-3 text-4xl font-bold">Chinese ↔ English Terminology and Scientific Translation</h2>
        </div>

        <div className="rounded-3xl border border-beige bg-cream p-6 shadow-xl">
          <h3 className="mb-4 text-2xl font-semibold text-teal">Translator Panel</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                <select className="field" value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
                  <option value="zh-en">Chinese → English</option>
                  <option value="en-zh">English → Chinese</option>
                </select>
                <select className="field" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                  {(["General Biology", "Academic Paper", "Methods Section", "Figure Legend", "Presentation Slide", "Email to Professor"] as Mode[]).map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <select className="field mt-3" value={style} onChange={(e) => setStyle(e.target.value as Style)}>
                {(["Clear", "Formal Academic", "Nature/Cell Style"] as Style[]).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <textarea
                className="field mt-3 h-48"
                placeholder="输入中文术语或粘贴科研段落 / Enter biomedical terminology or text..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="mt-2 text-xs text-stone-500">Current setting: {modeHint}</div>
              {error && <p className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button onClick={handleTranslate} className="btn-primary">{loading ? "Translating..." : "Translate"}</button>
                <button onClick={() => { setInput(""); setOutput("Translation output will appear here."); setError(""); }} className="btn-secondary">Clear</button>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Output</h3>
                <button onClick={copyResult} className="btn-copy">Copy</button>
              </div>
              <pre className="output-panel">{loading ? "Preparing professional biomedical translation..." : output}</pre>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-beige bg-cream p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-teal">Detected Biomedical Terminology</h3>
          <table className="w-full overflow-hidden rounded-xl text-left text-sm">
            <thead className="bg-beige/70 text-stone-700">
              <tr><th className="px-3 py-2">中文术语</th><th className="px-3 py-2">English</th></tr>
            </thead>
            <tbody>
              {detectedTerms.length > 0 ? (
                detectedTerms.map((item) => (
                  <tr key={item.zh} className="border-t border-beige/80">
                    <td className="px-3 py-2">{item.zh}</td>
                    <td className="px-3 py-2">{item.en}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-beige/80">
                  <td className="px-3 py-3 text-stone-500" colSpan={2}>No glossary terms detected in the current input.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}
