
import { useState, useRef, useCallback, useEffect } from "react";

const ELEMENTS = [
  { type: "heading", label: "Heading", icon: "H1", color: "#6366f1" },
  { type: "paragraph", label: "Paragraph", icon: "¶", color: "#8b5cf6" },
  { type: "button", label: "Button", icon: "⬡", color: "#ec4899" },
  { type: "image", label: "Image", icon: "⬚", color: "#f59e0b" },
  { type: "video", label: "Video", icon: "▶", color: "#10b981" },
  { type: "webview", label: "WebView", icon: "⊞", color: "#3b82f6" },
  { type: "divider", label: "Divider", icon: "—", color: "#6b7280" },
  { type: "card", label: "Card", icon: "▭", color: "#14b8a6" },
  { type: "navbar", label: "NavBar", icon: "≡", color: "#f97316" },
  { type: "footer", label: "Footer", icon: "⊟", color: "#a855f7" },
  { type: "input", label: "Input", icon: "▱", color: "#06b6d4" },
  { type: "columns", label: "2 Columns", icon: "⫿", color: "#84cc16" },
];

const defaultProps = {
  heading: { text: "Hello World", fontSize: 32, color: "#111827", align: "left" },
  paragraph: { text: "Click to edit this paragraph. Lorem ipsum dolor sit amet.", fontSize: 16, color: "#374151", align: "left" },
  button: { text: "Click Me", bgColor: "#6366f1", textColor: "#fff", radius: 8, fontSize: 16 },
  image: { src: "", alt: "Image", width: 200, height: 140, radius: 8 },
  video: { src: "", width: 280, height: 160, radius: 8 },
  webview: { src: "https://example.com", width: 280, height: 180, radius: 8 },
  divider: { color: "#e5e7eb", thickness: 2, width: 280 },
  card: { title: "Card Title", body: "Card content goes here.", bgColor: "#fff", radius: 12, shadow: true },
  navbar: { title: "My Site", bgColor: "#1e293b", textColor: "#fff", links: "Home, About, Contact" },
  footer: { text: "© 2024 My Website", bgColor: "#1e293b", textColor: "#9ca3af" },
  input: { placeholder: "Enter text...", label: "Label", radius: 8, width: 240 },
  columns: { col1: "Column 1 content", col2: "Column 2 content", gap: 16 },
};

let idCounter = 1;

function generateId() { return `el_${idCounter++}`; }

function renderElementPreview(el) {
  const p = el.props;
  switch (el.type) {
    case "heading":
      return <div style={{ fontSize: p.fontSize, color: p.color, textAlign: p.align, fontWeight: 700, lineHeight: 1.2, fontFamily: "'Syne', sans-serif", wordBreak: "break-word" }}>{p.text}</div>;
    case "paragraph":
      return <div style={{ fontSize: p.fontSize, color: p.color, textAlign: p.align, lineHeight: 1.6, wordBreak: "break-word" }}>{p.text}</div>;
    case "button":
      return <button style={{ background: p.bgColor, color: p.textColor, borderRadius: p.radius, fontSize: p.fontSize, padding: "10px 22px", border: "none", cursor: "pointer", fontWeight: 600, letterSpacing: "0.02em" }}>{p.text}</button>;
    case "image":
      return p.src
        ? <img src={p.src} alt={p.alt} style={{ width: p.width, height: p.height, borderRadius: p.radius, objectFit: "cover", display: "block" }} />
        : <div style={{ width: p.width, height: p.height, borderRadius: p.radius, background: "linear-gradient(135deg,#e0e7ff,#f3e8ff)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#6366f1", fontSize: 13, gap: 6, border: "2px dashed #c4b5fd" }}>
            <span style={{ fontSize: 28 }}>⬚</span><span>Image</span>
          </div>;
    case "video":
      return p.src
        ? <video src={p.src} style={{ width: p.width, height: p.height, borderRadius: p.radius }} controls />
        : <div style={{ width: p.width, height: p.height, borderRadius: p.radius, background: "linear-gradient(135deg,#dcfce7,#d1fae5)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", color: "#10b981", fontSize: 13, gap: 6, border: "2px dashed #6ee7b7" }}>
            <span style={{ fontSize: 28 }}>▶</span><span>Video</span>
          </div>;
    case "webview":
      return <div style={{ width: p.width, height: p.height, borderRadius: p.radius, overflow: "hidden", border: "2px solid #e0e7ff", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#1e293b", padding: "6px 10px", fontSize: 11, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#10b981" }}>⬡</span> {p.src}
        </div>
        <div style={{ flex: 1, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 12 }}>WebView Preview</div>
      </div>;
    case "divider":
      return <hr style={{ width: p.width, border: "none", borderTop: `${p.thickness}px solid ${p.color}`, margin: "8px 0" }} />;
    case "card":
      return <div style={{ background: p.bgColor, borderRadius: p.radius, padding: "16px 20px", boxShadow: p.shadow ? "0 4px 20px rgba(0,0,0,0.10)" : "none", border: "1px solid #e5e7eb", minWidth: 200 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{p.title}</div>
        <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>{p.body}</div>
      </div>;
    case "navbar":
      return <nav style={{ background: p.bgColor, color: p.textColor, padding: "10px 16px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 260 }}>
        <span style={{ fontWeight: 700, fontSize: 15, fontFamily: "'Syne',sans-serif" }}>{p.title}</span>
        <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
          {p.links.split(",").map((l, i) => <span key={i} style={{ opacity: 0.8, cursor: "pointer" }}>{l.trim()}</span>)}
        </div>
      </nav>;
    case "footer":
      return <footer style={{ background: p.bgColor, color: p.textColor, padding: "12px 16px", borderRadius: 8, textAlign: "center", fontSize: 13, minWidth: 260 }}>{p.text}</footer>;
    case "input":
      return <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{p.label}</label>
        <input placeholder={p.placeholder} style={{ width: p.width, padding: "8px 12px", borderRadius: p.radius, border: "1.5px solid #d1d5db", fontSize: 14, outline: "none", background: "#f9fafb" }} readOnly />
      </div>;
    case "columns":
      return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: p.gap, minWidth: 260 }}>
        <div style={{ background: "#f0f9ff", padding: "12px", borderRadius: 8, fontSize: 13, color: "#0369a1", border: "1px dashed #7dd3fc" }}>{p.col1}</div>
        <div style={{ background: "#fdf4ff", padding: "12px", borderRadius: 8, fontSize: 13, color: "#7c3aed", border: "1px dashed #d8b4fe" }}>{p.col2}</div>
      </div>;
    default:
      return <div>{el.type}</div>;
  }
}

function PropsEditor({ el, onChange }) {
  const p = el.props;
  const field = (label, key, type = "text", extra = {}) => (
    <div key={key} style={{ marginBottom: 10 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 3 }}>{label}</label>
      {type === "color"
        ? <input type="color" value={p[key] || "#000"} onChange={e => onChange(key, e.target.value)} style={{ width: "100%", height: 32, border: "none", borderRadius: 6, cursor: "pointer" }} />
        : type === "checkbox"
        ? <input type="checkbox" checked={!!p[key]} onChange={e => onChange(key, e.target.checked)} style={{ width: 16, height: 16 }} />
        : <input type={type} value={p[key] ?? ""} onChange={e => onChange(key, type === "number" ? Number(e.target.value) : e.target.value)}
            style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1.5px solid #e5e7eb", fontSize: 13, background: "#f9fafb", boxSizing: "border-box" }} {...extra} />}
    </div>
  );

  const fields = {
    heading: [field("Text", "text"), field("Font Size", "fontSize", "number"), field("Color", "color", "color"), field("Align (left/center/right)", "align")],
    paragraph: [field("Text", "text"), field("Font Size", "fontSize", "number"), field("Color", "color", "color"), field("Align", "align")],
    button: [field("Text", "text"), field("Bg Color", "bgColor", "color"), field("Text Color", "textColor", "color"), field("Border Radius", "radius", "number"), field("Font Size", "fontSize", "number")],
    image: [field("Image URL", "src"), field("Alt Text", "alt"), field("Width", "width", "number"), field("Height", "height", "number"), field("Border Radius", "radius", "number")],
    video: [field("Video URL", "src"), field("Width", "width", "number"), field("Height", "height", "number"), field("Border Radius", "radius", "number")],
    webview: [field("URL", "src"), field("Width", "width", "number"), field("Height", "height", "number"), field("Border Radius", "radius", "number")],
    divider: [field("Color", "color", "color"), field("Thickness", "thickness", "number"), field("Width", "width", "number")],
    card: [field("Title", "title"), field("Body", "body"), field("Bg Color", "bgColor", "color"), field("Border Radius", "radius", "number"), field("Shadow", "shadow", "checkbox")],
    navbar: [field("Site Title", "title"), field("Links (comma sep)", "links"), field("Bg Color", "bgColor", "color"), field("Text Color", "textColor", "color")],
    footer: [field("Text", "text"), field("Bg Color", "bgColor", "color"), field("Text Color", "textColor", "color")],
    input: [field("Label", "label"), field("Placeholder", "placeholder"), field("Width", "width", "number"), field("Border Radius", "radius", "number")],
    columns: [field("Column 1", "col1"), field("Column 2", "col2"), field("Gap (px)", "gap", "number")],
  };
  return <div style={{ padding: "0 4px" }}>{fields[el.type] || <p style={{ color: "#9ca3af", fontSize: 13 }}>No properties</p>}</div>;
}

function generateHTML(elements) {
  const body = elements.map(el => {
    const p = el.props;
    const pos = `position:absolute;left:${el.x}px;top:${el.y}px;`;
    switch (el.type) {
      case "heading": return `<h1 style="${pos}font-size:${p.fontSize}px;color:${p.color};text-align:${p.align};font-weight:700;margin:0;">${p.text}</h1>`;
      case "paragraph": return `<p style="${pos}font-size:${p.fontSize}px;color:${p.color};text-align:${p.align};margin:0;max-width:320px;">${p.text}</p>`;
      case "button": return `<button style="${pos}background:${p.bgColor};color:${p.textColor};border-radius:${p.radius}px;font-size:${p.fontSize}px;padding:10px 22px;border:none;cursor:pointer;font-weight:600;">${p.text}</button>`;
      case "image": return p.src ? `<img src="${p.src}" alt="${p.alt}" style="${pos}width:${p.width}px;height:${p.height}px;border-radius:${p.radius}px;object-fit:cover;" />` : `<div style="${pos}width:${p.width}px;height:${p.height}px;border-radius:${p.radius}px;background:#e0e7ff;display:flex;align-items:center;justify-content:center;">Image</div>`;
      case "button": return `<button style="${pos}background:${p.bgColor};color:${p.textColor};border-radius:${p.radius}px;font-size:${p.fontSize}px;padding:10px 22px;border:none;cursor:pointer;">${p.text}</button>`;
      case "divider": return `<hr style="${pos}width:${p.width}px;border:none;border-top:${p.thickness}px solid ${p.color};" />`;
      case "navbar": return `<nav style="${pos}background:${p.bgColor};color:${p.textColor};padding:10px 16px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;min-width:260px;"><span style="font-weight:700;">${p.title}</span><div>${p.links.split(",").map(l=>`<a href="#" style="color:${p.textColor};margin-left:12px;text-decoration:none;">${l.trim()}</a>`).join("")}</div></nav>`;
      case "footer": return `<footer style="${pos}background:${p.bgColor};color:${p.textColor};padding:12px 16px;border-radius:8px;text-align:center;">${p.text}</footer>`;
      case "card": return `<div style="${pos}background:${p.bgColor};border-radius:${p.radius}px;padding:16px 20px;box-shadow:${p.shadow?"0 4px 20px rgba(0,0,0,0.1)":"none"};border:1px solid #e5e7eb;"><h3 style="margin:0 0 8px;font-size:16px;">${p.title}</h3><p style="margin:0;font-size:14px;color:#6b7280;">${p.body}</p></div>`;
      case "input": return `<div style="${pos}display:flex;flex-direction:column;gap:4px;"><label style="font-size:12px;font-weight:600;">${p.label}</label><input placeholder="${p.placeholder}" style="width:${p.width}px;padding:8px 12px;border-radius:${p.radius}px;border:1.5px solid #d1d5db;font-size:14px;" /></div>`;
      case "columns": return `<div style="${pos}display:grid;grid-template-columns:1fr 1fr;gap:${p.gap}px;min-width:260px;"><div style="background:#f0f9ff;padding:12px;border-radius:8px;">${p.col1}</div><div style="background:#fdf4ff;padding:12px;border-radius:8px;">${p.col2}</div></div>`;
      default: return "";
    }
  }).join("\n    ");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Website</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; min-height: 100vh; background: #fff; }
    .workspace { position: relative; width: 100%; min-height: 800px; }
  </style>
</head>
<body>
  <div class="workspace">
    ${body}
  </div>
</body>
</html>`;
}

async function downloadZip(elements) {
  const html = generateHTML(elements);
  const JSZip = (await import("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js")).default || window.JSZip;
  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file("README.txt", "Website created with Taiman-Developer No-Code Builder\n\nOpen index.html in your browser.");
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "my-website.zip"; a.click();
  URL.revokeObjectURL(url);
}

export default function TaimanBuilder() {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [activeTab, setActiveTab] = useState("elements"); // elements | props | layers
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [panelOpen, setPanelOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const workspaceRef = useRef();
  const jsZipLoaded = useRef(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    s.onload = () => { jsZipLoaded.current = true; };
    document.head.appendChild(s);
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap";
    document.head.appendChild(font);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const addElement = useCallback((type) => {
    const newEl = {
      id: generateId(), type,
      x: 40 + Math.random() * 60,
      y: 40 + elements.length * 30,
      props: { ...defaultProps[type] },
    };
    setElements(prev => [...prev, newEl]);
    setSelected(newEl.id);
    setActiveTab("props");
    showToast(`${type} qo'shildi`);
  }, [elements.length]);

  const onMouseDown = useCallback((e, id) => {
    e.stopPropagation();
    setSelected(id);
    const el = elements.find(x => x.id === id);
    const rect = workspaceRef.current.getBoundingClientRect();
    setDragging(id);
    setDragOffset({ x: e.clientX - rect.left - el.x, y: e.clientY - rect.top - el.y });
  }, [elements]);

  const onMouseMove = useCallback((e) => {
    if (!dragging) return;
    const rect = workspaceRef.current.getBoundingClientRect();
    const nx = e.clientX - rect.left - dragOffset.x;
    const ny = e.clientY - rect.top - dragOffset.y;
    setElements(prev => prev.map(el => el.id === dragging ? { ...el, x: Math.max(0, nx), y: Math.max(0, ny) } : el));
  }, [dragging, dragOffset]);

  const onMouseUp = useCallback(() => setDragging(null), []);

  const onTouchStart = useCallback((e, id) => {
    e.stopPropagation();
    const t = e.touches[0];
    setSelected(id);
    const el = elements.find(x => x.id === id);
    const rect = workspaceRef.current.getBoundingClientRect();
    setDragging(id);
    setDragOffset({ x: t.clientX - rect.left - el.x, y: t.clientY - rect.top - el.y });
  }, [elements]);

  const onTouchMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    const t = e.touches[0];
    const rect = workspaceRef.current.getBoundingClientRect();
    const nx = t.clientX - rect.left - dragOffset.x;
    const ny = t.clientY - rect.top - dragOffset.y;
    setElements(prev => prev.map(el => el.id === dragging ? { ...el, x: Math.max(0, nx), y: Math.max(0, ny) } : el));
  }, [dragging, dragOffset]);

  const deleteSelected = () => {
    if (!selected) return;
    setElements(prev => prev.filter(e => e.id !== selected));
    setSelected(null);
    showToast("O'chirildi");
  };

  const updateProp = (key, value) => {
    setElements(prev => prev.map(el => el.id === selected ? { ...el, props: { ...el.props, [key]: value } } : el));
  };

  const handleDownload = async () => {
    if (elements.length === 0) { showToast("Avval element qo'shing!"); return; }
    try {
      if (!window.JSZip) { showToast("JSZip yuklanmoqda..."); return; }
      const html = generateHTML(elements);
      const zip = new window.JSZip();
      zip.file("index.html", html);
      zip.file("README.txt", "Created with Taiman-Developer No-Code Builder\n\nOpen index.html in your browser.");
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "my-website.zip"; a.click();
      URL.revokeObjectURL(url);
      showToast("ZIP yuklab olindi! ✓");
    } catch (err) { showToast("Xato: " + err.message); }
  };

  const selectedEl = elements.find(e => e.id === selected);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0f0f13", minHeight: "100vh", display: "flex", flexDirection: "column", userSelect: "none" }}>
      {/* TOPBAR */}
      <div style={{ background: "linear-gradient(90deg,#13131a,#1a1a2e)", borderBottom: "1px solid #1e1e2e", padding: "0 16px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 900, color: "#fff", fontFamily: "'Syne',sans-serif", letterSpacing: "-0.02em" }}>T</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#e2e8f0", fontFamily: "'Syne',sans-serif", letterSpacing: "0.01em", lineHeight: 1 }}>Taiman</div>
            <div style={{ fontSize: 9, color: "#6366f1", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Developer</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 11, color: "#4b5563", background: "#1e1e2e", padding: "3px 8px", borderRadius: 6 }}>{elements.length} el</div>
          {selected && (
            <button onClick={deleteSelected} style={{ background: "#ff4458", border: "none", borderRadius: 6, color: "#fff", padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>✕ Del</button>
          )}
          <button onClick={handleDownload} style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", border: "none", borderRadius: 8, color: "#fff", padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'Syne',sans-serif" }}>
            <span>↓</span> ZIP
          </button>
          <button onClick={() => setPanelOpen(v => !v)} style={{ background: "#1e1e2e", border: "1px solid #2d2d3e", borderRadius: 8, color: "#94a3b8", padding: "6px 10px", fontSize: 14, cursor: "pointer" }}>
            {panelOpen ? "◀" : "▶"}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* SIDE PANEL */}
        {panelOpen && (
          <div style={{ width: 200, background: "#13131a", borderRight: "1px solid #1e1e2e", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #1e1e2e" }}>
              {["elements", "props", "layers"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "9px 0", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", border: "none", cursor: "pointer", background: activeTab === tab ? "#1a1a2e" : "transparent", color: activeTab === tab ? "#818cf8" : "#4b5563", borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent", transition: "all 0.15s" }}>
                  {tab === "elements" ? "⊞" : tab === "props" ? "⚙" : "≡"} {tab.slice(0,3)}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
              {activeTab === "elements" && (
                <div>
                  <div style={{ fontSize: 10, color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Elements</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {ELEMENTS.map(el => (
                      <button key={el.type} onClick={() => addElement(el.type)}
                        style={{ background: "#1a1a2e", border: "1px solid #2d2d3e", borderRadius: 8, padding: "10px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = el.color; e.currentTarget.style.background = "#1e1e35"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2d2d3e"; e.currentTarget.style.background = "#1a1a2e"; }}>
                        <div style={{ width: 28, height: 28, borderRadius: 7, background: el.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: el.color, fontWeight: 700 }}>{el.icon}</div>
                        <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 500 }}>{el.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "props" && (
                <div>
                  <div style={{ fontSize: 10, color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Properties</div>
                  {selectedEl
                    ? <>
                        <div style={{ background: "#1a1a2e", borderRadius: 8, padding: "8px 10px", marginBottom: 10, border: "1px solid #2d2d3e", display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 22, height: 22, borderRadius: 5, background: (ELEMENTS.find(e=>e.type===selectedEl.type)?.color||"#6366f1")+"33", display:"flex",alignItems:"center",justifyContent:"center", fontSize:11, color: ELEMENTS.find(e=>e.type===selectedEl.type)?.color||"#6366f1", fontWeight:700 }}>{ELEMENTS.find(e=>e.type===selectedEl.type)?.icon||"?"}</div>
                          <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600, textTransform: "capitalize" }}>{selectedEl.type}</span>
                        </div>
                        <PropsEditor el={selectedEl} onChange={updateProp} />
                      </>
                    : <div style={{ color: "#4b5563", fontSize: 12, textAlign: "center", paddingTop: 20 }}>Select an element</div>}
                </div>
              )}

              {activeTab === "layers" && (
                <div>
                  <div style={{ fontSize: 10, color: "#4b5563", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Layers</div>
                  {elements.length === 0
                    ? <div style={{ color: "#4b5563", fontSize: 12, textAlign: "center", paddingTop: 20 }}>No layers yet</div>
                    : [...elements].reverse().map(el => (
                      <div key={el.id} onClick={() => { setSelected(el.id); setActiveTab("props"); }}
                        style={{ background: selected === el.id ? "#1e1e35" : "#1a1a2e", border: `1px solid ${selected === el.id ? "#6366f1" : "#2d2d3e"}`, borderRadius: 7, padding: "7px 10px", marginBottom: 5, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
                        <span style={{ fontSize: 11, color: ELEMENTS.find(e=>e.type===el.type)?.color||"#6366f1" }}>{ELEMENTS.find(e=>e.type===el.type)?.icon||"?"}</span>
                        <span style={{ fontSize: 11, color: "#9ca3af", textTransform: "capitalize" }}>{el.type}</span>
                        <button onClick={e => { e.stopPropagation(); setElements(prev=>prev.filter(x=>x.id!==el.id)); if(selected===el.id) setSelected(null); }}
                          style={{ marginLeft: "auto", background: "none", border: "none", color: "#4b5563", cursor: "pointer", fontSize: 12 }}>✕</button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* WORKSPACE */}
        <div style={{ flex: 1, overflow: "auto", background: "#0f0f13", display: "flex", flexDirection: "column" }}>
          {/* Workspace header bar */}
          <div style={{ background: "#13131a", borderBottom: "1px solid #1e1e2e", padding: "6px 14px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            </div>
            <div style={{ fontSize: 11, color: "#4b5563", background: "#1a1a2e", padding: "2px 10px", borderRadius: 5, flex: 1, maxWidth: 200 }}>workspace.html</div>
            <div style={{ fontSize: 10, color: "#4b5563", marginLeft: "auto" }}>Drag elements freely</div>
          </div>

          {/* Canvas */}
          <div
            ref={workspaceRef}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
            onClick={() => setSelected(null)}
            style={{ flex: 1, minHeight: 600, position: "relative", backgroundImage: "radial-gradient(circle, #1e1e2e 1px, transparent 1px)", backgroundSize: "24px 24px", overflow: "hidden" }}>

            {elements.length === 0 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, pointerEvents: "none" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#6366f133,#a855f733)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, border: "1px dashed #6366f155" }}>⬡</div>
                <div style={{ color: "#2d2d3e", fontSize: 14, fontWeight: 600, textAlign: "center" }}>Panel'dan element tanlang<br/><span style={{ fontSize: 12, fontWeight: 400, color: "#1e1e2e" }}>Drag qilib istalgan joyga ko'chiring</span></div>
              </div>
            )}

            {elements.map(el => (
              <div key={el.id}
                style={{ position: "absolute", left: el.x, top: el.y, cursor: dragging === el.id ? "grabbing" : "grab", outline: selected === el.id ? "2px solid #6366f1" : "2px solid transparent", outlineOffset: 4, borderRadius: 6, transition: dragging === el.id ? "none" : "outline 0.15s", zIndex: selected === el.id ? 10 : 1 }}
                onMouseDown={e => onMouseDown(e, el.id)}
                onTouchStart={e => onTouchStart(e, el.id)}
                onClick={e => { e.stopPropagation(); setSelected(el.id); setActiveTab("props"); }}>
                {selected === el.id && (
                  <div style={{ position: "absolute", top: -22, left: 0, background: "#6366f1", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: "4px 4px 0 0", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{el.type} · drag to move</div>
                )}
                {renderElementPreview(el)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 8px 30px rgba(99,102,241,0.4)", whiteSpace: "nowrap", animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateX(-50%) translateY(8px);} to { opacity:1; transform:translateX(-50%) translateY(0);} }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #13131a; }
        ::-webkit-scrollbar-thumb { background: #2d2d3e; border-radius: 4px; }
      `}</style>
    </div>
  );
}
