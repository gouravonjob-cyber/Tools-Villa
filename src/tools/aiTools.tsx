import React, { useState } from "react";

export const AiGrammarComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("We has many tools online that works very fast but we needs to make sure they is fully secure.");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStr, setErrorStr] = useState("");

  const handleExecute = async () => {
    setLoading(true);
    setErrorStr("");
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "grammar",
          text,
          tone
        })
      });
      const data = await res.json();
      if (data.error) {
        setErrorStr(data.error);
      } else {
        setOutput(data.result);
        onResult(data.result);
      }
    } catch (e) {
      setErrorStr("Failed to contact Gemini proxy endpoint. Make sure GEMINI_API_KEY is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="comp-ai-grammar" className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400">Pasted Draft:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Paste or type content to refine..."
          className="w-full p-3 bg-slate-900/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Target Tone:</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/40 text-slate-300 text-xs">
            <option value="professional">Professional / Corporate</option>
            <option value="casual">Casual / Friendly</option>
            <option value="creator">Creative / Viral blog style</option>
            <option value="formal">Academia / Clear scientific</option>
          </select>
        </div>
        <button
          onClick={handleExecute}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl text-white text-xs font-bold font-mono tracking-widest uppercase ml-auto transition animate-all disabled:opacity-50"
        >
          {loading ? "Polishing with Gemini AI..." : "Enhance with Gemini AI"}
        </button>
      </div>

      {errorStr && <p className="text-xs text-rose-400 font-mono italic">{errorStr}</p>}
      {output && (
        <div className="p-4 bg-slate-950/80 border border-indigo-500/20 rounded-2xl space-y-2">
          <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Optimized Output:</span>
          <p className="text-sm font-mono text-slate-100 whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
};

export const AiSummarizeComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("Security operations centers (SOC) are continually tasked with monitoring complex logs for potential intrusions. Finding anomalous actions inside database connections or file uploads is extremely challenging given sheer logs velocity. Moving configurations locally in browser memory represents a paradigm shift, eliminating standard cloud transport latency bounds and restoring sovereign browser data safeguards.");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStr, setErrorStr] = useState("");

  const handleExecute = async () => {
    setLoading(true);
    setErrorStr("");
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summarize",
          text
        })
      });
      const data = await res.json();
      if (data.error) {
        setErrorStr(data.error);
      } else {
        setOutput(data.result);
        onResult(data.result);
      }
    } catch {
      setErrorStr("Failed to contact Gemini proxy endpoint. Configure GEMINI_API_KEY inside secrets panel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="comp-ai-summarize" className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs text-slate-400">Paste Long Essay or Tech Log:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-3 bg-slate-900/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
        />
      </div>

      <button
        onClick={handleExecute}
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-xs font-bold font-mono tracking-wider uppercase disabled:opacity-50"
      >
        {loading ? "Compiling digest summaries..." : "Generate Gemini Summary Highlights"}
      </button>

      {errorStr && <p className="text-xs text-rose-400 font-mono italic">{errorStr}</p>}
      {output && (
        <div className="p-4 bg-slate-950/80 border border-indigo-500/20 rounded-2xl space-y-2">
          <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Abstract Digest Highlights:</span>
          <p className="text-xs font-mono text-slate-100 whitespace-pre-wrap leading-relaxed">{output}</p>
        </div>
      )}
    </div>
  );
};

export const AiTranslatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("Hello! Welcome to OmniToolbox, your favorite online utilities workshop.");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorStr, setErrorStr] = useState("");

  const handleExecute = async () => {
    setLoading(true);
    setErrorStr("");
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "translate",
          text,
          targetLang
        })
      });
      const data = await res.json();
      if (data.error) {
        setErrorStr(data.error);
      } else {
        setOutput(data.result);
        onResult(data.result);
      }
    } catch {
      setErrorStr("Failed to contact backend translate proxy service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="comp-ai-translator" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400">Pasted Base Content:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full p-3 bg-slate-900/60 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-col justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex flex-col">
            <label className="text-xs text-slate-500 mb-1">Target Language Dialect:</label>
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-905/60 text-slate-300 text-xs">
              <option value="Spanish">Spanish (Español)</option>
              <option value="French">French (Français)</option>
              <option value="German">German (Deutsch)</option>
              <option value="Japanese">Japanese (日本語)</option>
              <option value="Portuguese">Portuguese (Português)</option>
              <option value="Chinese">Chinese (中文)</option>
              <option value="Hindi">Hindi (हिन्दी)</option>
            </select>
          </div>
          <button
            onClick={handleExecute}
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-xs font-bold transition disabled:opacity-50"
          >
            {loading ? "Translating sentence dialect..." : "Execute Polyglot Translation"}
          </button>
        </div>
      </div>

      {errorStr && <p className="text-xs text-rose-400 font-mono italic">{errorStr}</p>}
      {output && (
        <div className="p-4 bg-slate-950/80 border border-indigo-500/20 rounded-2xl">
          <pre className="font-mono text-sm text-yellow-100 whitespace-pre-wrap select-all">{output}</pre>
        </div>
      )}
    </div>
  );
};
