import React, { useState } from "react";
import { Tool } from "../types";

// Helper for UI triggers
interface BaseToolProps {
  onProcess: (out: string) => void;
  lang: string;
}

export const textToolsRegistry: Tool[] = [
  {
    id: "word-counter",
    category: "text-tools",
    name: "Word & Character Counter",
    description: "Real-time statistics of words, characters, paragraphs, reading speed and density analysis.",
    icon: "FileText",
    seoDescription: "Free online word counter and character counter. Check paragraph limits, count whitespaces, and calculate average reading time in real-time.",
    seoKeywords: ["word counter", "character counter", "text length analyzer", "free paragraph count", "reading time calculator"],
    steps: [
      "Type or paste your text into the main editor area.",
      "View instant metrics about words, sentences, reading duration, and spaces in real-time.",
      "Check keyword frequency distributions below the inputs."
    ],
    examples: [
      { input: "The quick brown fox jumps over the lazy dog.", output: "Words: 9, Characters: 43" }
    ],
    faqs: [
      { question: "How is reading time calculated?", answer: "We assume an average reading speed of 200 words per minute of standard English text." }
    ]
  },
  {
    id: "case-converter",
    category: "text-tools",
    name: "Standard Case Converter",
    description: "Instantly transform word casings to UPPERCASE, lowercase, Title Case, camelCase, or Sentence case.",
    icon: "Type",
    seoDescription: "Convert document casings to uppercase, lowercase, camelcase, title case, snake_case, alternating case, or sentence format with a single click.",
    seoKeywords: ["case converter", "uppercase generator", "title case format", "camelcase online converter"],
    steps: [
      "Enter your target string in the converter interface.",
      "Select desired format transformation pill (e.g. UPPERCASE, camelCase).",
      "Copy or export the newly parsed string using the quick control."
    ]
  },
  {
    id: "remove-duplicates",
    category: "text-tools",
    name: "Remove Duplicate Lines",
    description: "Deduplicate document listings, purge empty margins, and sort text records simultaneously.",
    icon: "Layers",
    seoDescription: "Remove repeating duplicate lines of text online. Clean email lists, CSV list records, arrays, or text databases instantly with custom options.",
    seoKeywords: ["remove duplicates", "de-duplicate lines", "unique sorting", "text array cleaner"],
    steps: [
      "Paste your unsorted, redundant vertical listings.",
      "Toggle settings like keeping blank entries or trimming whitespaces.",
      "Click Process to retrieve the unique de-duplicated listings."
    ]
  },
  {
    id: "base64-text",
    category: "text-tools",
    name: "Base64 Text Encoder & Decoder",
    description: "Robust, safe binary encoding and decoding for web strings and token payloads.",
    icon: "ShieldAlert",
    seoDescription: "Encode text to Base64 or decode Base64 strings online. High performance UTF-8 web encoder/decoder tool with download option.",
    seoKeywords: ["base64 encode", "base64 decode", "ascii binary conversion", "jwt payload reader"],
    steps: [
      "Select either the Encode or Decode operation tabs.",
      "Input your base string or base64 hashed schema.",
      "Check direct feedback state immediately."
    ]
  },
  {
    id: "url-coder",
    category: "text-tools",
    name: "URL Encoder / Decoder",
    description: "Sanitizes link components for safe URI queries and handles percent encodings correctly.",
    icon: "Link",
    seoDescription: "Free online URL encoder and decoder. Convert special parameters and queries to safe percent encoder tags complying with standard server configurations.",
    seoKeywords: ["url encoder", "url decoder", "uri component sanitizer", "percent encoding", "http parameters query"],
    steps: [
      "Paste the address or custom route parameter.",
      "Select Encode to escape illegal link segments, or Decode to parse into a clean URL.",
      "Copy raw string dynamically."
    ]
  },
  {
    id: "lorem-ipsum",
    category: "text-tools",
    name: "Lorem Ipsum Placeholder Generator",
    description: "Produce structural mock placeholder texts by paragraphs, list items, sentences, or word limits.",
    icon: "FileCode",
    seoDescription: "Generate dummy placeholder text using lorem ipsum. Choose paragraphs format, word quantities, bullet counts, or custom text segments instantly.",
    seoKeywords: ["lorem ipsum generator", "dummy text generator", "mock copy creator", "developer lorem generator"],
    steps: [
      "Select desired mock block types (Paragraphs, Sentences, or Words).",
      "Enter the numeric count to generate.",
      "Copy the generated dummy copy with a single click."
    ]
  },
  {
    id: "markdown-editor",
    category: "text-tools",
    name: "Markdown Live Editor",
    description: "Write rich content in Markdown syntax and view high-contrast side-by-side HTML compiler previews.",
    icon: "Columns",
    seoDescription: "Free online markdown editor and viewer. High-fidelity compiler transforms markdown tables, bullet arrays, code blocks, and lists to live output HTML.",
    seoKeywords: ["markdown editor", "md live editor", "side by side markdown checker", "readme editor generator"],
    steps: [
      "Draft standard markdown symbols inside the text canvas on the left panel.",
      "See compiled rich HTML styles rendering instantaneously in the preview card on the right.",
      "Click Download to export your clean draft as a .md file or Copy HTML to convert it."
    ]
  },
  {
    id: "regex-tester",
    category: "text-tools",
    name: "Regex Expression Tester",
    description: "Evaluate regular expression patterns with flags, matching counts, and beautiful grouping highlights.",
    icon: "Filter",
    seoDescription: "Test regular expressions in real-time. Matches capture patterns and highlights group indexing directly in your testing body.",
    seoKeywords: ["regex tester", "regular expression online matching", "regex match highlighter", "javascript regex builder"],
    steps: [
      "Input a search regex pattern (without slashes. e.g. [a-zA-Z]+).",
      "Assign optional matching flags (like global 'g' or case insensitive 'i').",
      "Paste target testing paragraph below and review bright highlighted results."
    ]
  },
  {
    id: "text-diff",
    category: "text-tools",
    name: "Text Diff Side-by-Side Checker",
    description: "Compare two revisions of raw texts and observe highlighted inserted, deleted, or modified words.",
    icon: "Diff",
    seoDescription: "Compare differences between two text documents side-by-side. Highlights text drift, missing lines, word updates and edit insertions instantly.",
    seoKeywords: ["text diff", "side by side text comparison", "file differences checker", "revision comparison tool", "code diff online"],
    steps: [
      "Enter your starting base text in the Left panel.",
      "Enter the updated revision text on the Right panel.",
      "Observe marked deviations, where deleted words highlight red, and insert updates highlight green."
    ]
  }
];

export const WordCounterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.trim() === "" ? 0 : text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);

  // Simple Density analysis
  const getDensity = () => {
    if (words === 0) return [];
    const clean = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "");
    const list = clean.split(/\s+/).filter(w => w.length > 2);
    const m: Record<string, number> = {};
    list.forEach(w => {
      m[w] = (m[w] || 0) + 1;
    });
    return Object.entries(m)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  const handleClear = () => {
    setText("");
    onResult("");
  };

  return (
    <div id="comp-word-counter" className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div id="stat-words" className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-2xl border border-white/20 text-center">
          <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{words}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Words</p>
        </div>
        <div id="stat-chars" className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-2xl border border-white/20 text-center">
          <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{chars}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chars (Spaces)</p>
        </div>
        <div id="stat-charnospaces" className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-2xl border border-white/20 text-center">
          <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{charsNoSpaces}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Chars (No Space)</p>
        </div>
        <div id="stat-sentences" className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-2xl border border-white/20 text-center">
          <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{sentences}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sentences</p>
        </div>
        <div id="stat-read" className="p-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur rounded-2xl border border-white/20 text-center col-span-2 md:col-span-1">
          <p className="text-2xl font-bold font-mono text-slate-800 dark:text-white">~{readingTime}m</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Est. Reading</p>
        </div>
      </div>

      <div>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onResult(`Words: ${words}, Characters: ${chars}`);
          }}
          placeholder="Paste or type content here for analysis..."
          rows={8}
          className="w-full p-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur border border-white/10 rounded-2xl text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          id="btn-wc-clear"
          onClick={handleClear}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-medium transition"
        >
          Reset View
        </button>
      </div>

      {words > 0 && (
        <div className="p-4 bg-white/35 dark:bg-slate-800/35 rounded-2xl border border-white/10">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Top Keyword Frequencies (3+ letters)</h4>
          <div className="flex flex-wrap gap-2">
            {getDensity().map(([w, c]) => (
              <span key={w} className="px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-800 dark:text-emerald-300">
                {w} ({c})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CaseConverterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const transform = (mode: string) => {
    let out = "";
    switch (mode) {
      case "upper":
        out = text.toUpperCase();
        break;
      case "lower":
        out = text.toLowerCase();
        break;
      case "title":
        out = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
        break;
      case "sentence":
        out = text.split(". ").map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(". ");
        break;
      case "camel":
        out = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        break;
      default:
        out = text;
    }
    setOutput(out);
    onResult(out);
  };

  return (
    <div id="comp-case-converter" className="space-y-4">
      <textarea
        id="case-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Enter your text block for structural case formatting..."
        className="w-full p-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur border border-white/10 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex flex-wrap gap-2">
        <button id="btn-case-upper" onClick={() => transform("upper")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition">UPPERCASE</button>
        <button id="btn-case-lower" onClick={() => transform("lower")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition">lowercase</button>
        <button id="btn-case-title" onClick={() => transform("title")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition">Title Case</button>
        <button id="btn-case-sentence" onClick={() => transform("sentence")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition">Sentence case</button>
        <button id="btn-case-camel" onClick={() => transform("camel")} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white text-xs font-medium transition">camelCase</button>
      </div>
      {output && (
        <div className="p-4 bg-white/45 dark:bg-slate-800/45 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Formatted Output:</p>
          <p id="case-output-val" className="font-mono text-sm break-all select-all whitespace-pre-wrap text-slate-800 dark:text-slate-100">{output}</p>
        </div>
      )}
    </div>
  );
};

export const RemoveDuplicatesComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("");
  const [sortLines, setSortLines] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [output, setOutput] = useState("");

  const processLines = () => {
    let list = text.split("\n");
    if (trimLines) list = list.map(l => l.trim());
    const unique = Array.from(new Set(list));
    if (sortLines) unique.sort((a, b) => (a as string).localeCompare(b as string));
    const processed = unique.join("\n");
    setOutput(processed);
    onResult(processed);
  };

  return (
    <div id="comp-duplicates" className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste your lines list here (one item per line)..."
        className="w-full p-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur border border-white/10 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
          <input type="checkbox" checked={sortLines} onChange={() => setSortLines(!sortLines)} className="rounded text-emerald-500 accent-emerald-500" />
          Alphabetical Sort
        </label>
        <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
          <input type="checkbox" checked={trimLines} onChange={() => setTrimLines(!trimLines)} className="rounded text-emerald-500 accent-emerald-500" />
          Trim Whitespace
        </label>
        <button id="btn-dup-dedup" onClick={processLines} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium ml-auto transition">
          Process Clean
        </button>
      </div>
      {output && (
        <div className="p-4 bg-white/45 dark:bg-slate-800/45 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">De-duplicated Output:</p>
          <pre className="font-mono text-sm max-h-60 overflow-y-auto whitespace-pre-wrap text-slate-800 dark:text-slate-200 select-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const Base64TextComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [errorStr, setErrorStr] = useState("");

  const handleEncode = () => {
    setErrorStr("");
    try {
      const out = btoa(unescape(encodeURIComponent(text)));
      setOutput(out);
      onResult(out);
    } catch (e) {
      setErrorStr("Character mapping limits exceeded for base64 compilation.");
    }
  };

  const handleDecode = () => {
    setErrorStr("");
    try {
      const out = decodeURIComponent(escape(atob(text)));
      setOutput(out);
      onResult(out);
    } catch (e) {
      setErrorStr("Malformed Base64 payload schema. Please verify input data.");
    }
  };

  return (
    <div id="comp-base64" className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        placeholder="Paste text key or Base64 payload..."
        className="w-full p-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur border border-white/10 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex gap-2">
        <button id="btn-b64-enc" onClick={handleEncode} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">Encode to Base64</button>
        <button id="btn-b64-dec" onClick={handleDecode} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm font-medium transition">Decode Base64</button>
      </div>
      {errorStr && <p className="text-red-500 text-xs font-mono">{errorStr}</p>}
      {output && (
        <div className="p-4 bg-white/45 dark:bg-slate-800/45 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Processed Output:</p>
          <pre className="font-mono text-sm max-h-40 overflow-y-auto select-all text-slate-800 dark:text-slate-200 break-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const UrlCoderComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    const r = encodeURIComponent(text);
    setOutput(r);
    onResult(r);
  };

  const handleDecode = () => {
    try {
      const r = decodeURIComponent(text);
      setOutput(r);
      onResult(r);
    } catch {
      setOutput("Invalid percent ending sequences.");
    }
  };

  return (
    <div id="comp-url-coder" className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Paste raw URL links or querystring keys..."
        className="w-full p-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur border border-white/10 rounded-2xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <div className="flex gap-2">
        <button onClick={handleEncode} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">URL Encode</button>
        <button onClick={handleDecode} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm font-medium transition">URL Decode</button>
      </div>
      {output && (
        <div className="p-4 bg-white/45 dark:bg-slate-800/45 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Result URL Component:</p>
          <pre className="font-mono text-sm select-all text-slate-800 dark:text-slate-200 break-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const LoremIpsumComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [qty, setQty] = useState(3);
  const [type, setType] = useState("paragraphs");
  const [output, setOutput] = useState("");

  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque velit id risus finibus faucibus. Etiam ac tortor dolor. Morbi tempor aliquet eros, quis molestie ex facilisis quis.",
    "Aliquam pulvinar sem ipsum, ac efficitur elit commodo sit amet. Pellentesque ac leo pulvinar felis pulvinar viverra. Nunc finibus eros vel elementum aliquet. Vivamus interdum purus id tristique convallis.",
    "Nulla id sapien ac sem volutpat porta eu at quam. Aliquam elementum, urna ac tristique volutpat, sem nibh lacinia arcu, nec porttitor risus velit quis eros. Vivamus interdum lorem vel lectus auctor convallis.",
    "Phasellus in mi vel elit semper varius eu sit amet nisi. Morbi sed eros eu nunc auctor aliquam. Maecenas tempus rhoncus tristique. Donec feugiat pellentesque hendrerit.",
    "Fusce rhoncus ac turpis sit amet ultrices. Vestibulum congue feugiat feugiat. Nunc dictum convallis finibus. In sed libero quis neque congue interdum."
  ];

  const handleGenerate = () => {
    let result = [];
    if (type === "paragraphs") {
      for (let i = 0; i < qty; i++) {
        result.push(paragraphs[i % paragraphs.length]);
      }
    } else if (type === "sentences") {
      const allSentences = paragraphs.flatMap(p => p.split(". ").filter(s => s.length > 0));
      for (let i = 0; i < qty * 4; i++) {
        result.push(allSentences[i % allSentences.length] + ".");
      }
    } else {
      const words = paragraphs.join(" ").split(" ");
      result.push(words.slice(0, qty * 15).join(" "));
    }
    const final = result.join("\n\n");
    setOutput(final);
    onResult(final);
  };

  return (
    <div id="comp-lorem" className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-2xl">
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            max={50}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 px-3 py-1.5 rounded-lg border border-white/20 bg-transparent text-slate-700 dark:text-slate-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-slate-500 mb-1">Block Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/20 bg-transparent text-slate-700 dark:text-slate-200">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button id="btn-lor-gen" onClick={handleGenerate} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium ml-auto transition">
          Generate Dummy Mockup
        </button>
      </div>
      {output && (
        <div className="p-4 bg-white/45 dark:bg-slate-800/45 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Copy generated placeholder text:</p>
          <pre className="font-mono text-sm max-h-60 overflow-y-auto whitespace-pre-wrap text-slate-800 dark:text-slate-100 select-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const MarkdownEditorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [md, setMd] = useState("# Live Markdown Workspace\nWrite markdown symbols on the left text canvas and inspect the parsed standard styles.\n\n### Formatting List:\n* Bold strings like **Excellent design**\n* Code blocks using standard `backtick` syntax\n* Beautiful interactive layouts.");

  const compileToHtml = (markdown: string) => {
    // A lightweight simple md compiler for direct high-speed preview
    let html = markdown
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold border-b border-white/20 pb-2 mb-3 mt-4 text-emerald-500">$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2 text-indigo-400">$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-3 mb-2 text-slate-300">$1</h3>');
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/`(.*?)`/gim, '<code class="px-1.5 py-0.5 bg-slate-800/60 font-mono text-xs rounded text-rose-300">$1</code>');
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-200">$1</li>');
    html = html.replace(/\n$/gim, "<br />");
    return html;
  };

  return (
    <div id="comp-markdown" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase font-mono">Editor Panel (Markdown)</label>
        <textarea
          value={md}
          onChange={(e) => {
            setMd(e.target.value);
            onResult(e.target.value);
          }}
          rows={10}
          className="w-full p-4 bg-slate-900/60 font-mono text-xs text-rose-100 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs text-slate-400 uppercase font-mono">HTML Live Compile</label>
        <div className="p-4 bg-slate-900/30 border border-white/10 rounded-2xl h-[230px] md:h-[235px] overflow-y-auto text-slate-200 text-sm space-y-2" dangerouslySetInnerHTML={{ __html: compileToHtml(md) }} />
      </div>
    </div>
  );
};

export const RegexTesterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [expr, setExpr] = useState("\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b");
  const [flags, setFlags] = useState("g");
  const [body, setBody] = useState("Direct telemetry logs sent from user@example-domain.com and alternate engineering contact support@omnitoolbox.net.");
  const [matches, setMatches] = useState<string[]>([]);

  const handleTest = () => {
    try {
      const reg = new RegExp(expr, flags);
      const outputMatches = body.match(reg) || [];
      setMatches(outputMatches);
      onResult(`Count: ${outputMatches.length}`);
    } catch {
      setMatches([]);
      onResult("Error invalid regular expression.");
    }
  };

  return (
    <div id="comp-regex" className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <label className="text-xs text-slate-500">Expression (RegEx)</label>
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder="[a-zA-Z0-9]+"
            className="w-full px-3 py-1.5 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-lg text-slate-800 dark:text-slate-100 font-mono text-sm leading-tight"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g"
            className="w-full px-3 py-1.5 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-lg text-slate-800 dark:text-slate-100 font-mono text-sm"
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-slate-500">Testing string</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="w-full p-3 bg-white/10 dark:bg-slate-900/20 border border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-sm focus:outline-none"
        />
      </div>
      <button onClick={handleTest} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Execute Regex Target Pattern
      </button>
      {matches.length > 0 && (
        <div className="p-3 bg-white/40 dark:bg-slate-800/40 border border-white/10 rounded-xl">
          <p className="text-xs text-slate-500 uppercase font-mono mb-2">Matches Found Counter ({matches.length})</p>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {matches.map((m, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-yellow-500/20 text-yellow-800 dark:text-yellow-200 border border-yellow-500/30 rounded text-xs font-mono">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TextDiffComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [base, setBase] = useState("Launch our newly updated OmniToolbox portal for daily utility checks.");
  const [updated, setUpdated] = useState("Launch the revised OmniToolbox portal for top daily utility tasks.");
  const [diffRes, setDiffRes] = useState<string[]>([]);

  const handleDiff = () => {
    // Word-by-word quick difference engine
    const baseWords = base.split(/\s+/);
    const updatedWords = updated.split(/\s+/);
    const res: string[] = [];

    const maxLength = Math.max(baseWords.length, updatedWords.length);
    for (let i = 0; i < maxLength; i++) {
      const b = baseWords[i] || "";
      const u = updatedWords[i] || "";
      if (b === u) {
        res.push(`<span class="text-slate-800 dark:text-slate-200">${b}</span>`);
      } else {
        if (b) res.push(`<span class="px-1 bg-red-500/30 line-through text-red-700 dark:text-red-300 rounded">${b}</span>`);
        if (u) res.push(`<span class="px-1 bg-green-500/30 text-green-700 dark:text-green-300 rounded underline font-semibold">${u}</span>`);
      }
    }
    setDiffRes(res);
    onResult("Computed side by side diff.");
  };

  return (
    <div id="comp-diff" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-500">Original Text String Version A</label>
          <textarea
            value={base}
            onChange={(e) => setBase(e.target.value)}
            rows={4}
            className="w-full p-3 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Updated Text Revision Version B</label>
          <textarea
            value={updated}
            onChange={(e) => setUpdated(e.target.value)}
            rows={4}
            className="w-full p-3 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
          />
        </div>
      </div>
      <button onClick={handleDiff} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Compare Document Modifications
      </button>
      {diffRes.length > 0 && (
        <div className="p-4 bg-slate-900/80 border border-white/10 rounded-2xl">
          <p className="text-xs text-slate-400 font-mono pb-2 border-b border-white/10 mb-2">Live Text Drift Highlights:</p>
          <div className="text-sm leading-relaxed whitespace-normal gap-x-1.5 flex flex-wrap" dangerouslySetInnerHTML={{ __html: diffRes.join(" ") }} />
        </div>
      )}
    </div>
  );
};
