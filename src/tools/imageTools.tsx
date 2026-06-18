import React, { useState, useRef } from "react";

export const ImageCompressorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(800);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOrigSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageSrc(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCompress = () => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const scaleFactor = width / img.width;
      const targetHeight = img.height * scaleFactor;
      canvas.width = width;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = "image/jpeg";
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);
      setDownloadUrl(dataUrl);

      // Estimate compressed size
      const stringLength = dataUrl.length - `data:${mimeType};base64,`.length;
      const sizeInBytes = Math.ceil(stringLength * 0.75);
      setCompSize(sizeInBytes);

      onResult(`Success: Compressed from ${(origSize / 1024).toFixed(1)} KB to ${(sizeInBytes / 1024).toFixed(1)} KB`);
    };
  };

  return (
    <div id="comp-image-compressor" className="space-y-4">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer relative">
        <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        <span className="text-sm text-slate-300">Drag or drop image or click to choose from directory</span>
        <span className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</span>
      </div>

      {imageSrc && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="space-y-2">
            <p className="text-xs text-slate-400">Dimensions & Scaling Configuration</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 flex justify-between">
                  <span>Compression Quality:</span> <span>{quality}%</span>
                </label>
                <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              </div>
              <div>
                <label className="text-xs text-slate-500 flex justify-between">
                  <span>Target Pixel Width:</span> <span>{width}px</span>
                </label>
                <input type="range" min="200" max="2500" step="50" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              </div>
              <button id="btn-img-compress" onClick={handleCompress} className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-xs font-bold transition">
                Start Client Compression
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center space-y-2 border-l border-white/10 pl-4">
            <p className="text-xs text-slate-400">Payload Diagnostics</p>
            <div className="space-y-1 text-sm">
              <p className="text-slate-300">Original Size: <span className="font-mono text-slate-200">{(origSize / 1024).toFixed(1)} KB</span></p>
              {compSize > 0 && (
                <>
                  <p className="text-emerald-400 font-bold">Optimized Size: <span className="font-mono">{(compSize / 1024).toFixed(1)} KB</span></p>
                  <p className="text-xs text-slate-500">Savings: <span className="text-emerald-400 font-semibold">{(((origSize - compSize) / origSize) * 100).toFixed(1)}%</span></p>
                </>
              )}
            </div>
            {downloadUrl && (
              <a href={downloadUrl} download="omni_optimized.jpg" className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-xs font-bold transition block mt-2">
                Download Compressed JPEG
              </a>
            )}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export const ColorPalettePickerComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [color, setColor] = useState("#10b981");

  const toRgb = (hex: string) => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div id="comp-color-picker" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl justify-center">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              onResult(e.target.value);
            }}
            className="w-24 h-24 bg-transparent border-0 rounded-2xl cursor-pointer"
          />
          <div className="space-y-1">
            <span className="text-xs text-slate-400">Current Hex Value</span>
            <p className="text-2xl font-bold font-mono text-white tracking-widest">{color.toUpperCase()}</p>
          </div>
        </div>
        <div className="space-y-2 p-4 bg-slate-900/40 border border-white/10 rounded-2xl">
          <p className="text-xs text-slate-400 uppercase font-mono">Conversion Nodes</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
              <span className="text-slate-500">HEX</span>
              <span className="font-mono text-emerald-400 font-bold select-all">{color.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-b border-white/5 pb-1">
              <span className="text-slate-500">RGB</span>
              <span className="font-mono text-white select-all">{toRgb(color)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">CSS Parameter</span>
              <span className="font-mono text-indigo-300 select-all">color: {color};</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GradientCreatorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(135);

  const cssCode = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  return (
    <div id="comp-gradient" className="space-y-4">
      <div className="h-28 w-full rounded-2xl border border-white/10 shadow-2xl transition" style={{ background: cssCode }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex flex-col p-3 bg-white/5 border border-white/10 rounded-xl">
          <label className="text-xs text-slate-500 mb-1">Color Block A</label>
          <input type="color" value={color1} onChange={(e) => { setColor1(e.target.value); onResult(cssCode); }} className="w-full bg-transparent border-0 cursor-pointer h-8" />
        </div>
        <div className="flex flex-col p-3 bg-white/5 border border-white/10 rounded-xl">
          <label className="text-xs text-slate-500 mb-1">Color Block B</label>
          <input type="color" value={color2} onChange={(e) => { setColor2(e.target.value); onResult(cssCode); }} className="w-full bg-transparent border-0 cursor-pointer h-8" />
        </div>
        <div className="flex flex-col p-3 bg-white/5 border border-white/10 rounded-xl justify-between">
          <label className="text-xs text-slate-500 font-mono">Rotation Angle: {angle}°</label>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => { setAngle(Number(e.target.value)); onResult(cssCode); }} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
        </div>
      </div>
      <div className="p-3 bg-slate-900/60 border border-white/10 rounded-2xl">
        <p className="text-xs text-slate-400 font-mono pb-1">Copy Styles Code:</p>
        <code className="font-mono text-xs text-emerald-300 select-all break-all">background: {cssCode};</code>
      </div>
    </div>
  );
};

export const ContrastCheckerComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [bg, setBg] = useState("#0f172a");
  const [fg, setFg] = useState("#38bdf8");

  const hexToLuminance = (hex: string) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) clean = clean.split("").map(c => c + c).join("");
    const bigint = parseInt(clean, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  const getContrast = () => {
    try {
      const l1 = hexToLuminance(bg);
      const l2 = hexToLuminance(fg);
      const bright = Math.max(l1, l2);
      const dark = Math.min(l1, l2);
      return ((bright + 0.05) / (dark + 0.05));
    } catch {
      return 1;
    }
  };

  const ratio = getContrast();
  const aaNormal = ratio >= 4.5 ? "PASS" : "FAIL";
  const aaLarge = ratio >= 3 ? "PASS" : "FAIL";
  const aaaNormal = ratio >= 7 ? "PASS" : "FAIL";

  return (
    <div id="comp-contrast" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-2xl gap-3">
          <div>
            <label className="text-xs text-slate-500">Backdrop Hex:</label>
            <input type="color" value={bg} onChange={(e) => { setBg(e.target.value); onResult(`Ratio: ${ratio.toFixed(2)}`); }} className="w-full bg-transparent border-0 cursor-pointer h-7" />
          </div>
          <div>
            <label className="text-xs text-slate-500">Foreground Text Hex:</label>
            <input type="color" value={fg} onChange={(e) => { setFg(e.target.value); onResult(`Ratio: ${ratio.toFixed(2)}`); }} className="w-full bg-transparent border-0 cursor-pointer h-7" />
          </div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col justify-center space-y-3">
          <div className="text-center">
            <span className="text-xs text-slate-500 uppercase font-mono">Contrast Ratio</span>
            <p className="text-3xl font-extrabold text-emerald-400 font-mono">{ratio.toFixed(2)}:1</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2 rounded-lg ${aaNormal === "PASS" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
              <p className="font-bold">AA Normal</p>
              <p className="font-mono font-bold">{aaNormal}</p>
            </div>
            <div className={`p-2 rounded-lg ${aaLarge === "PASS" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
              <p className="font-bold">AA Headers</p>
              <p className="font-mono font-bold">{aaLarge}</p>
            </div>
            <div className={`p-2 rounded-lg ${aaaNormal === "PASS" ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
              <p className="font-bold">AAA compliance</p>
              <p className="font-mono font-bold">{aaaNormal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl text-center font-semibold text-sm transition transition-all duration-300" style={{ backgroundColor: bg, color: fg }}>
        Awesome accessibility contrast sandbox preview matches completely.
      </div>
    </div>
  );
};
