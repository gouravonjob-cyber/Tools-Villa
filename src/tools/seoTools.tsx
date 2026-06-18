import React, { useState } from "react";

export const MetaTagGeneratorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [title, setTitle] = useState("Best Developer Utilities & Online Tools | OmniToolbox");
  const [desc, setDesc] = useState("Access 50+ professional browser-ready utilities including compressors, formatting, calculators and AI modules safely.");
  const [keywords, setKeywords] = useState("online tools, developers utility, image compressor, json validator");
  const [author, setAuthor] = useState("OmniToolbox Ops");
  const [compiled, setCompiled] = useState("");

  const handleCompile = () => {
    const tags = `<!-- Primary Essential Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="robots" content="index, follow">
<meta name="language" content="English">`;
    setCompiled(tags);
    onResult(tags);
  };

  return (
    <div id="comp-seo-meta" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs">
        <div className="flex flex-col">
          <label className="text-slate-500 mb-1">Document Search Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-slate-500 mb-1">Keywords (Comma separated)</label>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-slate-500 mb-1">Seo Description (Max 160 characters)</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
      </div>
      <button onClick={handleCompile} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Compile Seo Tags
      </button>

      {compiled && (
        <div className="p-3 bg-slate-900/60 border border-white/10 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono">Compiled Tags (Place in your index.html &lt;head&gt;):</span>
          <pre className="font-mono text-[11px] text-emerald-300 max-h-40 overflow-y-auto select-all">{compiled}</pre>
        </div>
      )}
    </div>
  );
};

export const RobotsTxtGeneratorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [allowGoogle, setAllowGoogle] = useState(true);
  const [sitemapUrl, setSitemapUrl] = useState("https://omnitoolbox.net/sitemap.xml");
  const [disallowPath, setDisallowPath] = useState("/admin/");
  const [compiled, setCompiled] = useState("");

  const handleCompile = () => {
    const code = `# robots.txt generated at OmniToolbox
User-agent: ${allowGoogle ? "*" : "Googlebot"}
Allow: /
Disallow: ${disallowPath}

Sitemap: ${sitemapUrl}`;
    setCompiled(code);
    onResult(code);
  };

  return (
    <div id="comp-seo-robots" className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs">
        <div className="flex flex-col justify-center">
          <label className="flex items-center gap-2 text-slate-300">
            <input type="checkbox" checked={allowGoogle} onChange={() => setAllowGoogle(!allowGoogle)} className="accent-emerald-500 rounded" />
            Allow all robots to crawl index directories
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-slate-500 mb-1">Sitemap Canonical Link</label>
          <input type="text" value={sitemapUrl} onChange={(e) => setSitemapUrl(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="text-slate-500 mb-1">Disallowed Directories (e.g. /private/ or /admin/)</label>
          <input type="text" value={disallowPath} onChange={(e) => setDisallowPath(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
      </div>
      <button onClick={handleCompile} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Compile robots.txt
      </button>

      {compiled && (
        <div className="p-3 bg-slate-900/60 border border-white/10 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono">Robots.txt Output:</span>
          <pre className="font-mono text-xs text-orange-200 select-all whitespace-pre">{compiled}</pre>
        </div>
      )}
    </div>
  );
};

export const SitemapGeneratorComponent: React.FC<{ onResult: (r: string) => void }> = ({ onResult }) => {
  const [domain, setDomain] = useState("https://omnitoolbox.net");
  const [freq, setFreq] = useState("daily");
  const [compiled, setCompiled] = useState("");

  const handleCompile = () => {
    const list = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>${domain}/tools/word-counter</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>${domain}/tools/image-compressor</loc>
    <lastmod>2026-06-18</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>0.80</priority>
  </url>
</urlset>`;
    setCompiled(list);
    onResult(list);
  };

  return (
    <div id="comp-seo-sitemap" className="space-y-4">
      <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs">
        <div className="flex flex-col">
          <label className="text-slate-500 mb-1">Sitemap target domain</label>
          <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/60 text-white" />
        </div>
        <div className="flex flex-col">
          <label className="text-slate-500 mb-1">Check frequency interval</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)} className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/40 text-slate-300">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <button onClick={handleCompile} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white text-sm font-medium transition">
        Compile XML Sitemap
      </button>

      {compiled && (
        <div className="p-3 bg-slate-900/60 border border-white/10 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono">XML Output Block:</span>
          <pre className="font-mono text-[10px] text-sky-200 select-all max-h-40 overflow-y-auto whitespace-pre">{compiled}</pre>
        </div>
      )}
    </div>
  );
};
