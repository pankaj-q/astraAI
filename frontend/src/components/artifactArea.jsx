import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Code2,
  Eye,
  FileText,
  Image as ImageIcon,
  Table2,
  Presentation,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const artifactMeta = {
  code: { label: "Code", icon: Code2 },
  document: { label: "Document", icon: FileText },
  markdown: { label: "Markdown", icon: FileText },
  html: { label: "HTML", icon: Code2 },
  research: { label: "Research", icon: FileText },
  image: { label: "Image", icon: ImageIcon },
  data: { label: "Data", icon: Table2 },
  presentation: { label: "Presentation", icon: Presentation },
};

const PREVIEW_FILE = /\.(html?|css|m?js|jsx)$/i;

// Preview only makes sense for web output (HTML / CSS / JS).
function isPreviewArtifact(artifact) {
  if (!artifact) return false;
  if (artifact.type === "html") return true;

  const lang = String(artifact.language || "").toLowerCase();
  if (["html", "css", "javascript", "js", "jsx"].includes(lang)) return true;

  if (
    Array.isArray(artifact.files) &&
    artifact.files.some((f) => PREVIEW_FILE.test(f.name || f.path || f.filename || ""))
  ) {
    return true;
  }

  const content = typeof artifact.content === "string" ? artifact.content : "";
  return (
    /```\s*(html|css|javascript|js|jsx)\b/i.test(content) ||
    /<!doctype\s+html|<html[\s>]/i.test(content)
  );
}

// Merge the artifact's html/css/js into a single document for the iframe.
function buildPreviewDocument(artifact) {
  let html = "";
  let css = "";
  let js = "";

  const addFile = (name, code) => {
    if (!code) return;
    const n = String(name || "").toLowerCase();
    if (n.endsWith(".css")) css += `\n${code}`;
    else if (n.endsWith(".js") || n.endsWith(".mjs") || n.endsWith(".jsx")) js += `\n${code}`;
    else if (n.endsWith(".html") || n.endsWith(".htm")) html += `\n${code}`;
  };

  const files = Array.isArray(artifact.files) ? artifact.files : [];
  files.forEach((f) =>
    addFile(f.name || f.filename || f.path, f.content ?? f.code ?? ""),
  );

  if (!files.length) {
    const content = typeof artifact.content === "string" ? artifact.content : "";
    const fenced = [
      ...content.matchAll(/```(html|css|javascript|js|jsx)\s*\n([\s\S]*?)```/gi),
    ];

    if (fenced.length) {
      fenced.forEach(([, lang, code]) => {
        const l = lang.toLowerCase();
        if (l === "css") css += `\n${code}`;
        else if (l === "js" || l === "javascript" || l === "jsx") js += `\n${code}`;
        else html += `\n${code}`;
      });
    } else {
      // The model may have been cut off before closing the fence.
      const open = content.match(/```(html|css|javascript|js|jsx)\s*\n([\s\S]*)$/i);
      if (open) {
        const l = open[1].toLowerCase();
        if (l === "css") css = open[2];
        else if (l === "js" || l === "javascript" || l === "jsx") js = open[2];
        else html = open[2];
      } else {
        const lang = String(artifact.language || "").toLowerCase();
        if (lang === "css") css = content;
        else if (lang === "js" || lang === "javascript" || lang === "jsx") js = content;
        else html = content;
      }
    }
  }

  const styleTag = css ? `<style>\n${css}\n</style>` : "";
  const scriptTag = js ? `<script>\n${js}\n</script>` : "";

  if (/<html[\s>]/i.test(html)) {
    let doc = html;
    if (css) {
      doc = /<\/head>/i.test(html)
        ? doc.replace(/<\/head>/i, `${styleTag}</head>`)
        : `${styleTag}${doc}`;
    }
    if (js) {
      doc = /<\/body>/i.test(html)
        ? doc.replace(/<\/body>/i, `${scriptTag}</body>`)
        : `${doc}${scriptTag}`;
    }
    return doc;
  }

  return `<!doctype html><html><head><meta charset="utf-8" />${styleTag}</head><body>${html}${scriptTag}</body></html>`;
}

function ArtifactArea({ artifact }) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("code");
  const [width, setWidth] = useState(440);
  const [dragging, setDragging] = useState(false);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const next = window.innerWidth - e.clientX;
      setWidth(Math.min(Math.max(next, 320), window.innerWidth * 0.6));
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  // Hidden completely until an agent produces an artifact.
  if (!artifact) return null;

  const meta = artifactMeta[artifact.type] || artifactMeta.code;
  const Icon = meta.icon;

  const handleCopy = async () => {
    try {
      const text =
        typeof artifact.content === "string"
          ? artifact.content
          : JSON.stringify(artifact.content, null, 2);
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = () => {
    const text =
      typeof artifact.content === "string"
        ? artifact.content
        : JSON.stringify(artifact.content, null, 2);
    const blob = new Blob([text || ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${artifact.title || "artifact"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const contentText =
    typeof artifact.content === "string"
      ? artifact.content
      : JSON.stringify(artifact.content, null, 2) || "";

  // Pull fenced code blocks out of an agent reply so the "Code" tab shows
  // just the code, while "Preview" renders the full formatted answer.
  const extractCode = (text) => {
    if (typeof text !== "string") return "";
    const blocks = [...text.matchAll(/```[a-zA-Z0-9+#_.-]*\n([\s\S]*?)```/g)].map(
      (m) => m[1],
    );
    if (blocks.length) return blocks.join("\n\n");
    // Fallback for responses cut off before the closing fence.
    const open = text.match(/```[a-zA-Z0-9+#_.-]*\n([\s\S]*)$/);
    return open ? open[1] : text;
  };

  const canPreview = isPreviewArtifact(artifact);
  const previewDoc = canPreview ? buildPreviewDocument(artifact) : "";
  const activeView = canPreview ? view : "code";

  const renderImage = () => (
    <div className="flex flex-1 items-center justify-center overflow-auto p-4">
      <img
        src={artifact.content || artifact.images?.[0]}
        alt={artifact.title || "Artifact"}
        className="max-h-full max-w-full rounded-lg object-contain"
      />
    </div>
  );

  const renderCodeView = () => {
    if (artifact.type === "image") return renderImage();

    return (
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={artifact.language || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "1rem",
            fontSize: "0.85rem",
          }}
          showLineNumbers
          wrapLongLines
        >
          {artifact.type === "code" ? extractCode(contentText) : contentText}
        </SyntaxHighlighter>
      </div>
    );
  };

  const renderPreviewView = () => (
    <iframe
      title={artifact.title || "Artifact preview"}
      srcDoc={previewDoc}
      sandbox="allow-scripts allow-forms allow-modals allow-popups"
      className="h-full w-full flex-1 border-0 bg-white"
    />
  );

  const renderBody = () => {
    if (artifact.loading) {
      return (
        <div className="flex-1 space-y-3 p-4">
          <div className="h-4 w-1/3 animate-pulse rounded bg-[#252A32]" />
          <div className="h-3 w-full animate-pulse rounded bg-[#1E2228]" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#1E2228]" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-[#1E2228]" />
        </div>
      );
    }

    if (artifact.error) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-sm text-[#F87171]">{artifact.error}</p>
          {artifact.onRetry && (
            <button
              onClick={artifact.onRetry}
              className="rounded-lg border border-[#252A32] px-3 py-1.5 text-xs text-[#F3F4F6] hover:bg-[#191D24]"
            >
              Retry
            </button>
          )}
        </div>
      );
    }

    if (!artifact.content && !artifact.images?.length && !artifact.slides?.length) {
      return (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-[#A7ABB1]">
          No artifact content available.
        </div>
      );
    }

    return activeView === "preview" ? renderPreviewView() : renderCodeView();
  };

  return (
    <aside
      className="relative flex h-screen shrink-0 flex-col overflow-hidden border-l border-[#24272C] bg-[#14171C] text-[#F3F4F6] transition-[width] duration-300 ease-in-out"
      style={{ width: collapsed ? 48 : width, maxWidth: collapsed ? 48 : "65vw" }}
    >
      {/* Resize handle between chat area and artifact area */}
      {!collapsed && (
        <div
          onMouseDown={startDrag}
          className="absolute left-0 top-0 z-20 h-full w-1 cursor-col-resize bg-transparent transition-colors hover:bg-[#5B8CFF]/40"
        />
      )}

      {collapsed ? (
        <div className="flex h-full w-full flex-col items-center gap-4 py-3">
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Open artifact panel"
            title="Open artifact panel"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#252A32] bg-[#111316] text-[#A7ABB1] transition-colors hover:border-[#3A3D42] hover:bg-[#191D24] hover:text-white"
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            onClick={() => setCollapsed(false)}
            title={artifact.title || "Artifact"}
            className="flex min-h-0 flex-1 items-center justify-center overflow-hidden hover:text-white"
          >
            <span className="max-h-[70vh] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-[#A7ABB1] [writing-mode:vertical-rl] rotate-180">
              {artifact.title || "Artifact"}
            </span>
          </button>
        </div>
      ) : (
        <>
          {/* Header: right panel toggle sits at the top-right corner */}
          <div className="flex shrink-0 items-start justify-between gap-2 border-b border-[#24272C] bg-[#111316] px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <Icon size={16} strokeWidth={2} className="shrink-0 text-[#A7ABB1]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[#F3F4F6]">
                  {artifact.title || "Artifact"}
                </p>
                <p className="text-[11px] capitalize text-[#A7ABB1]">
                  {meta.label}
                  {artifact.updatedAt
                    ? ` · ${new Date(artifact.updatedAt).toLocaleTimeString()}`
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={handleCopy}
                aria-label="Copy artifact"
                title={copied ? "Copied!" : "Copy"}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A7ABB1] transition-colors hover:bg-[#191D24] hover:text-white"
              >
                {copied ? (
                  <span className="text-[11px] font-medium text-[#22C55E]">Copied</span>
                ) : (
                  <Copy size={16} strokeWidth={2} />
                )}
              </button>
              <button
                onClick={handleDownload}
                aria-label="Download artifact"
                title="Download"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A7ABB1] transition-colors hover:bg-[#191D24] hover:text-white"
              >
                <Download size={16} strokeWidth={2} />
              </button>
              <button
                onClick={() => setCollapsed(true)}
                aria-label="Collapse artifact panel"
                title="Collapse"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#252A32] bg-[#14171C] text-[#A7ABB1] transition-colors hover:border-[#3A3D42] hover:bg-[#191D24] hover:text-white"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>

          {/* Code / Preview switch */}
          <div className="flex shrink-0 items-center gap-1 border-b border-[#24272C] bg-[#111316] px-2 py-1.5">
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                activeView === "code"
                  ? "bg-[#191D24] text-[#F3F4F6]"
                  : "text-[#A7ABB1] hover:text-white"
              }`}
            >
              <Code2 size={14} strokeWidth={2} />
              Code
            </button>
            {canPreview && (
              <button
                onClick={() => setView("preview")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  activeView === "preview"
                    ? "bg-[#191D24] text-[#F3F4F6]"
                    : "text-[#A7ABB1] hover:text-white"
                }`}
              >
                <Eye size={14} strokeWidth={2} />
                Preview
              </button>
            )}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{renderBody()}</div>

          <div className="shrink-0 border-t border-[#24272C] bg-[#111316] px-4 py-2.5">
            <p className="text-center text-[11px] text-[#A7ABB1]">
              Generated by AstraAI — verify important information.
            </p>
          </div>
        </>
      )}
    </aside>
  );
}

export default ArtifactArea;
