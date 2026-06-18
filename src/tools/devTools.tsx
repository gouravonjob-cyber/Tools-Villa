import React, { useState } from "react";

export const JsonFormatterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [input, setInput] = useState('{\n  "name": "OmniToolbox",\n  "status": "active",\n  "count": 50,\n  "supportedList": ["Text", "Dev", "Image", "Math"]\n}');
  const [output, setOutput] = useState("");
  const [errorStr, setErrorStr] = useState("");

  const handleFormat = () => {
    setErrorStr("");
    try {
      const parsed = JSON.parse(input);
      const out = JSON.stringify(parsed, null, 2);
      setOutput(out);
      onResult(out);
    } catch (e: any) {
      setErrorStr(`JSON Syntax Error: ${e.message}`);
    }
  };

  const handleMinify = () => {
    setErrorStr("");
    try {
      const parsed = JSON.parse(input);
      const out = JSON.stringify(parsed);
      setOutput(out);
      onResult(out);
    } catch (e: any) {
      setErrorStr(`JSON Syntax Error: ${e.message}`);
    }
  };

  return (
    <div id="comp-json-formatter" className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        placeholder="Paste your JSON string here..."
        className="w-full p-4 bg-slate-900/60 font-mono text-xs text-emerald-300 border border-white/10 rounded-2xl focus:outline-none"
      />
      <div className="flex gap-2">
        <button id="btn-json-beautify" onClick={handleFormat} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">Beautify Format</button>
        <button id="btn-json-minify" onClick={handleMinify} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm font-medium transition">Minify JSON</button>
      </div>
      {errorStr && <p className="text-rose-400 text-xs font-mono">{errorStr}</p>}
      {output && (
        <div className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl space-y-2">
          <p className="text-xs text-slate-400 font-mono">Processed Output:</p>
          <pre className="font-mono text-xs text-indigo-300 max-h-60 overflow-y-auto select-all whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const XmlFormatterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [input, setInput] = useState('<root><site name="OmniToolbox"><status>Active</status><tools>50</tools></site></root>');
  const [output, setOutput] = useState("");

  const handleFormat = () => {
    // Elegant regex-based XML formatter for previewing
    let formatted = "";
    const reg = /(>)(<)(\/*)/g;
    let xml = input.replace(reg, "$1\r\n$2$3");
    let pad = 0;
    xml.split("\r\n").forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      formatted += "  ".repeat(pad) + node + "\r\n";
      pad += indent;
    });
    const final = formatted.trim();
    setOutput(final);
    onResult(final);
  };

  return (
    <div id="comp-xml-formatter" className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder="Enter XML payload..."
        className="w-full p-4 bg-slate-900/60 font-mono text-xs text-sky-300 border border-white/10 rounded-2xl focus:outline-none"
      />
      <button onClick={handleFormat} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">Format XML</button>
      {output && (
        <div className="p-4 bg-slate-950/80 border border-white/10 rounded-2xl">
          <pre className="font-mono text-xs text-indigo-300 max-h-60 overflow-y-auto select-all whitespace-pre">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const CodeMinifierComponent: React.FC<{ type: "html" | "css" | "javascript"; onResult: (r: string) => void }> = ({ type, onResult }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const compressCode = () => {
    let result = "";
    if (type === "html") {
      result = input
        .replace(/<!--[\s\S]*?-->/g, "") // remove comments
        .replace(/\s+/g, " ")             // replace whitespace
        .replace(/>\s+</g, "><")          // remove space between tags
        .trim();
    } else if (type === "css") {
      result = input
        .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
        .replace(/\s*([{\};:,])\s*/g, "$1") // spaces around chars
        .replace(/\s+/g, " ")             // double spaces
        .trim();
    } else {
      result = input
        .replace(/\/\/.*$/gm, "")           // single line comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // block comments
        .replace(/\s+/g, " ")             // reduce whitespace
        .trim();
    }
    setOutput(result);
    onResult(result);
  };

  return (
    <div id={`comp-minifier-${type}`} className="space-y-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        placeholder={`Paste absolute raw ${type.toUpperCase()} codes here for instant compression...`}
        className="w-full p-4 bg-slate-900/60 font-mono text-xs text-violet-200 border border-white/10 rounded-2xl focus:outline-none"
      />
      <button onClick={compressCode} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Compress {type.toUpperCase()} Codes
      </button>
      {output && (
        <div className="p-4 bg-slate-905/70 border border-white/10 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Compression Done: {Math.ceil(((input.length - output.length) / input.length) * 100)}% weight reduced</span>
          </div>
          <pre className="font-mono text-xs text-yellow-200 max-h-40 overflow-y-auto select-all whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
};

export const EpochConverterComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [epoch, setEpoch] = useState(Math.floor(Date.now() / 1000).toString());
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    try {
      const num = Number(epoch);
      const multiply = num < 99999999999 ? 1000 : 1; // ms or seconds
      const d = new Date(num * multiply);
      const res = `UTC Standard: ${d.toUTCString()}\nLocalized Standard: ${d.toLocaleString()}`;
      setOutput(res);
      onResult(res);
    } catch {
      setOutput("Invalid input epoch string.");
    }
  };

  return (
    <div id="comp-epoch" className="space-y-4">
      <div className="flex flex-col gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <label className="text-xs text-slate-400 font-mono">Input Unix Time (Seconds / Milliseconds):</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={epoch}
            onChange={(e) => setEpoch(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-900/60 font-mono text-sm border border-white/10 rounded-xl text-emerald-300 focus:outline-none"
          />
          <button onClick={() => setEpoch(Math.floor(Date.now() / 1000).toString())} className="px-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-mono">Now</button>
        </div>
      </div>
      <button onClick={handleConvert} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">Convert Epoch</button>
      {output && (
        <div className="p-4 bg-slate-900/40 border border-white/10 rounded-2xl">
          <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};
