import { useState, useEffect, useCallback } from "react";
import {
  X,
  Copy,
  Download,
  Code2,
  FileText,
  Image as ImageIcon,
  Table2,
  Presentation,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownRenderer from "./markdown/MarkdownRenderer.jsx";

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

function ArtifactArea({ artifact, onClose }) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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

    switch (artifact.type) {
      case "code":
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
              {typeof artifact.content === "string"
                ? artifact.content
                : JSON.stringify(artifact.content, null, 2)}
            </SyntaxHighlighter>
          </div>
        );

      case "image":
        return (
          <div className="flex flex-1 items-center justify-center overflow-auto p-4">
            <img
              src={artifact.content || artifact.images?.[0]}
              alt={artifact.title || "Artifact"}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
          </div>
        );

      case "data":
        return (
          <div className="flex-1 overflow-auto p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#F3F4F6]">
              {typeof artifact.content === "string"
                ? artifact.content
                : JSON.stringify(artifact.content, null, 2)}
            </pre>
          </div>
        );

      case "presentation":
        return (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <Presentation size={32} className="text-[#A7ABB1]" />
            <p className="text-sm text-[#A7ABB1]">Presentation preview</p>
            {artifact.slides?.length ? (
              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-[#252A32] px-2 py-1 text-xs text-[#F3F4F6] hover:bg-[#191D24]">
                  Prev
                </button>
                <span className="text-xs text-[#A7ABB1]">
                  {artifact.currentSlide || 1} / {artifact.slides.length}
                </span>
                <button className="rounded-lg border border-[#252A32] px-2 py-1 text-xs text-[#F3F4F6] hover:bg-[#191D24]">
                  Next
                </button>
              </div>
            ) : null}
          </div>
        );

      case "research":
      case "markdown":
      case "document":
      case "html":
      default:
        return (
          <div className="flex-1 overflow-auto p-4">
            <MarkdownRenderer content={artifact.content || ""} />
          </div>
        );
    }
  };

  return (
    <aside
      className="relative flex h-screen shrink-0 flex-col overflow-hidden border-l border-[#24272C] bg-[#14171C] text-[#F3F4F6] transition-[width] duration-300 ease-in-out"
      style={{ width: collapsed ? 48 : width }}
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
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#252A32] bg-[#111316] text-[#A7ABB1] transition-colors hover:border-[#3A3D42] hover:bg-[#191D24] hover:text-white"
          >
            <ChevronsLeft size={18} />
          </button>
          <Icon size={18} className="text-[#A7ABB1]" />
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
                onClick={onClose}
                aria-label="Close artifact panel"
                title="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A7ABB1] transition-colors hover:bg-[#191D24] hover:text-white"
              >
                <X size={16} strokeWidth={2} />
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
