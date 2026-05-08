"use client";

import { useMemo, useState } from "react";

type Direction = "zh-en" | "en-zh";
type Mode = "General Biology" | "Academic Paper" | "Methods Section" | "Figure Legend" | "Presentation Slide" | "Email to Professor";
type Style = "Clear" | "Formal Academic" | "Nature/Cell Style";

const mockOutputs: Record<Direction, string> = {
  "zh-en": "The fluorescently labeled protein localized predominantly to the perinuclear region, suggesting active trafficking through the endomembrane system under stress conditions.",
  "en-zh": "荧光标记蛋白主要定位于核周区域，提示在应激条件下其通过内膜系统进行活跃转运。",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("zh-en");
  const [mode, setMode] = useState<Mode>("General Biology");
  const [style, setStyle] = useState<Style>("Clear");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("Mock output will appear here.");

  const modeHint = useMemo(() => `${mode} · ${style}`, [mode, style]);

  const handleTranslate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setOutput(`${mockOutputs[direction]}\n\n[Mode: ${mode} | Style: ${style}]`);
    setLoading(false);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg to-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-cyan/30 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold tracking-wide text-cyan">BioTranslate Pro</h1>
          <span className="rounded-full border border-green/40 px-3 py-1 text-sm text-green">Biomedical EN↔ZH</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan">Precision Biomedical Language</p>
          <h2 className="mt-3 text-4xl font-bold">Chinese ↔ English Translation for Research Excellence</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-300">Designed for biology, biomedical research, fluorescence imaging, molecular biology, and protein engineering communication.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-cyan/20 bg-panel p-5 shadow-2xl shadow-cyan/10">
            <h3 className="mb-4 text-lg font-semibold">Translation Panel</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="field" value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
                <option value="zh-en">Chinese → English</option>
                <option value="en-zh">English → Chinese</option>
              </select>
              <select className="field" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                {(["General Biology", "Academic Paper", "Methods Section", "Figure Legend", "Presentation Slide", "Email to Professor"] as Mode[]).map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <select className="field mt-3" value={style} onChange={(e) => setStyle(e.target.value as Style)}>
              {(["Clear", "Formal Academic", "Nature/Cell Style"] as Style[]).map((s) => <option key={s}>{s}</option>)}
            </select>
            <textarea className="field mt-3 h-44" placeholder="Paste scientific text..." value={input} onChange={(e) => setInput(e.target.value)} />
            <div className="mt-2 text-xs text-slate-400">Current setting: {modeHint}</div>
            <button onClick={handleTranslate} className="mt-4 w-full rounded-xl bg-cyan px-4 py-2 font-semibold text-slate-900 hover:bg-cyan/90">{loading ? "Translating..." : "Translate (Mock)"}</button>
          </div>

          <div className="rounded-2xl border border-green/20 bg-panel p-5 shadow-2xl shadow-green/10">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Output</h3>
              <button onClick={copyResult} className="rounded-lg border border-cyan/40 px-3 py-1 text-sm hover:bg-cyan/10">Copy</button>
            </div>
            <pre className="min-h-64 whitespace-pre-wrap rounded-xl bg-slate-900/50 p-4 text-sm leading-relaxed text-slate-100">{loading ? "Generating translation..." : output}</pre>
          </div>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-panel p-5">
            <h3 className="mb-3 text-lg font-semibold">Core Biomedical Terminology</h3>
            <table className="w-full text-left text-sm">
              <thead className="text-cyan"><tr><th>English</th><th>中文</th></tr></thead>
              <tbody className="text-slate-200">
                <tr><td>Fluorescence intensity</td><td>荧光强度</td></tr>
                <tr><td>Protein engineering</td><td>蛋白质工程</td></tr>
                <tr><td>Gene expression profile</td><td>基因表达谱</td></tr>
                <tr><td>Signal transduction pathway</td><td>信号转导通路</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Methods polishing for reproducibility",
              "Figure legends with concise terminology",
              "Professional email drafts to PI",
              "Slide-friendly bilingual summaries",
            ].map((item) => (
              <article key={item} className="rounded-2xl border border-cyan/20 bg-panel p-4">
                <h4 className="text-base font-semibold text-green">Use Case</h4>
                <p className="mt-2 text-sm text-slate-300">{item}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
