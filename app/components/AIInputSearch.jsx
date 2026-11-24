/* eslint-disable */
"use client";

/**
 * @author: @kokonutui
 * @description: AI Input Search
 * @version: 4.0.0
 * @license: MIT
 */

import {
  Braces,
  Check,
  ChevronDown,
  CornerDownLeft,
  FileText,
  Globe,
  ImageIcon,
  Lightbulb,
  Plus,
  Settings2,
  Telescope,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const EASE_OUT = [0.23, 1, 0.32, 1];

export const DEFAULT_TOOLS = [
  {
    id: "browse",
    label: "Browse Portfolio",
    hint: "Answers with links & portfolio citations",
    icon: Globe,
    color: "#0ea5e9",
    activity: "Browsing portfolio records",
    placeholder: "Ask about Ashwin's projects, skills or background...",
    readsSources: true,
  },
  {
    id: "investigate",
    label: "Deep Technical Analysis",
    hint: "Examines architecture, code & performance",
    icon: Telescope,
    color: "#8b5cf6",
    activity: "Analyzing architecture",
    placeholder: "Ask about 30% performance speedup, WebGL, Next.js 16...",
    readsSources: true,
    limit: 5,
  },
  {
    id: "code",
    label: "Code & Stack",
    hint: "Evaluates React 19, TypeScript, Tailwind v4",
    icon: Braces,
    color: "#10b981",
    activity: "Auditing frontend stack",
    placeholder: "Ask about state management, API integration, hooks...",
  },
  {
    id: "reason",
    label: "Reasoning & Rationale",
    hint: "Explains engineering decisions & design systems",
    icon: Lightbulb,
    color: "#f43f5e",
    activity: "Synthesizing rationale",
    placeholder: "Why choose Next.js App Router or Supabase?",
  },
];

export const DEFAULT_MODELS = [
  "Mistral 7B (OpenSource)",
  "Llama 3.3 (Free)",
  "DeepSeek R1 (OpenSource)",
  "Gemini 2.5 Flash",
];

const fileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;
const seconds = (ms) => `${(ms / 1000).toFixed(1)}s`;

function SourceAvatar({ source, size = "sm" }) {
  const name = source.domain || "ashwin.dev";
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white ${
        size === "md" ? "size-6 text-[11px]" : "size-5 text-[10px]"
      }`}
      style={{
        backgroundColor: source.color || "#0ea5e9",
      }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function SourceStack({ sources }) {
  const shown = sources.slice(-5);
  if (shown.length === 0) {
    return (
      <span className="size-5 shrink-0 rounded-full border border-white/20 border-dashed" />
    );
  }
  return (
    <span className="flex shrink-0 items-center">
      <AnimatePresence initial={false} mode="popLayout">
        {shown.map((source, i) => (
          <motion.span
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            className={i > 0 ? "-ml-1.5" : ""}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, x: -6, filter: "blur(2px)" }}
            key={source.domain}
            layout="position"
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <SourceAvatar source={source} />
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}

function SourceList({ id, sources }) {
  return (
    <motion.div
      animate={{ height: "auto", opacity: 1 }}
      className="overflow-hidden"
      exit={{ height: 0, opacity: 0 }}
      id={id}
      initial={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
    >
      <ol className="max-h-60 overflow-y-auto rounded-[18px] bg-zinc-900 py-1 shadow-2xl border border-white/10 mt-1">
        {sources.map((source, i) => (
          <motion.li
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="mx-1 flex h-9 items-center gap-2.5 rounded-xl px-2.5 text-xs transition-colors hover:bg-white/5"
            initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
            key={source.domain}
            transition={{
              duration: 0.2,
              ease: EASE_OUT,
              delay: Math.min(i, 8) * 0.03,
            }}
          >
            <SourceAvatar size="md" source={source} />
            <span className="min-w-0 flex-1 truncate text-white/80">
              {source.title}
            </span>
            <span className="hidden shrink-0 text-white/40 sm:block">
              {source.domain}
            </span>
            <span className="w-5 shrink-0 text-right text-[11px] text-white/30 tabular-nums">
              {i + 1}
            </span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

function Trace({
  phase,
  tool,
  sources,
  elapsed,
  expanded,
  onToggle,
  listId,
}) {
  const finished = phase === "done" || phase === "stopped";
  const canOpen = finished && sources.length > 0;
  const ToolIcon = tool?.icon;

  let label = "Working...";
  if (phase === "working") {
    label = sources.length > 0 ? "Reading sources" : (tool?.activity ?? "Synthesizing answer");
  } else if (phase === "stopped") {
    label = "Stopped";
  } else {
    label = sources.length > 0 ? `Read ${sources.length} sources` : "Done";
  }

  return (
    <div className="pt-2">
      <div className="flex h-9 items-center gap-2.5 pr-2 pl-3 text-xs rounded-xl bg-white/5 border border-white/10">
        {tool?.readsSources || !ToolIcon ? (
          <SourceStack sources={sources} />
        ) : (
          <span
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-white"
            style={{ color: tool?.color ?? "currentColor" }}
          >
            <ToolIcon aria-hidden="true" className="size-3" />
          </span>
        )}
        <span className="relative min-w-0 flex-1">
          <span className="block truncate text-white/70">
            {label}
            {phase === "working" && sources.length > 0 && (
              <span className="text-white/40 tabular-nums"> · {sources.length}</span>
            )}
          </span>
        </span>
        <span className="shrink-0 text-white/40 tabular-nums">
          {seconds(elapsed)}
        </span>
        {canOpen && (
          <button
            aria-controls={listId}
            aria-expanded={expanded}
            className="flex h-6 items-center gap-1.5 rounded-md bg-zinc-800 px-2 font-medium text-[11px] text-white hover:bg-zinc-700 transition-colors"
            onClick={onToggle}
            type="button"
          >
            {expanded ? "Hide" : "Sources"}
            <ChevronDown
              aria-hidden="true"
              className={`size-3 opacity-60 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && <SourceList id={listId} sources={sources} />}
      </AnimatePresence>
    </div>
  );
}

export default function AIInputSearch({
  placeholder = "Ask anything about Ashwin, or type / for tools",
  tools = DEFAULT_TOOLS,
  defaultTool = "browse",
  models = DEFAULT_MODELS,
  defaultModel = "Mistral 7B (OpenSource)",
  onSearch,
  className = "",
}) {
  const [value, setValue] = useState("");
  const [toolId, setToolId] = useState(defaultTool);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState(defaultModel);
  const [files, setFiles] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [runTool, setRunTool] = useState(null);
  const [sources, setSources] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const abortRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const listId = useId();

  const tool = tools.find((t) => t.id === toolId) ?? null;
  const running = phase === "working";

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const timer = setInterval(() => setElapsed(performance.now() - start), 100);
    return () => clearInterval(timer);
  }, [running]);

  const submit = async () => {
    const query = value.trim();
    if (!query || running) return;

    const controller = new AbortController();
    abortRef.current = controller;
    const attached = files;
    setValue("");
    setFiles([]);
    setSources([]);
    setElapsed(0);
    setExpanded(false);
    setRunTool(tool);
    setPhase("working");

    const onSource = (source) => {
      if (controller.signal.aborted) return;
      setSources((current) => [
        ...current.filter((s) => s.domain !== source.domain),
        source,
      ]);
    };

    try {
      if (onSearch) {
        await onSearch(query, {
          tool,
          model,
          files: attached,
          signal: controller.signal,
          onSource,
        });
      }
      if (!controller.signal.aborted) {
        setPhase("done");
      }
    } catch {
      if (!controller.signal.aborted) {
        setPhase("stopped");
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }
    }
  };

  const stop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setPhase("stopped");
    textareaRef.current?.focus();
  };

  const canSubmit = value.trim().length > 0 && !running;

  return (
    <MotionConfig reducedMotion="user">
      <div className={`mx-auto w-full max-w-lg ${className}`}>
        {/* Soft Frame Card */}
        <div className="relative w-full rounded-[22px] bg-white/[0.04] p-1.5 border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Tool Header Banner */}
          <div className="flex h-9 items-center justify-between px-3 text-xs text-white/60">
            <span className="flex items-center gap-2 truncate">
              {tool ? (
                <>
                  <tool.icon className="size-3.5" style={{ color: tool.color }} />
                  <span className="truncate text-white/80">{tool.hint || tool.label}</span>
                </>
              ) : (
                <span>No tool picked, direct answering active</span>
              )}
            </span>
            <button
              className="flex items-center gap-1.5 rounded-md bg-white/[0.08] hover:bg-white/[0.14] px-2 py-1 text-[11px] font-medium text-white/90 border border-white/10 transition-colors shadow-sm outline-none cursor-pointer"
              onClick={() => setToolsOpen(!toolsOpen)}
              type="button"
            >
              <span>{tool ? "Change" : "Pick tool"}</span>
              <kbd className="rounded bg-black/40 px-1 font-mono text-[9px] text-white/60 border border-white/5">/</kbd>
            </button>
          </div>

          {/* Tools Dropdown Menu */}
          <AnimatePresence>
            {toolsOpen && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-2 right-2 top-11 z-50 rounded-xl bg-zinc-900/95 border border-white/15 p-1.5 shadow-2xl backdrop-blur-2xl"
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16 }}
              >
                <div className="flex justify-between px-2 py-1 text-[11px] text-white/40">
                  <span>Tools</span>
                  <span>Select 1–{tools.length}</span>
                </div>
                {tools.map((t) => {
                  const Icon = t.icon;
                  const isSelected = t.id === tool?.id;
                  return (
                    <button
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors cursor-pointer border-0 outline-none ${
                        isSelected ? "bg-white/[0.08]" : "bg-transparent hover:bg-white/[0.05]"
                      }`}
                      key={t.id}
                      onClick={() => {
                        setToolId(t.id === tool?.id ? null : t.id);
                        setToolsOpen(false);
                        textareaRef.current?.focus();
                      }}
                      type="button"
                    >
                      <Icon className="size-4 shrink-0" style={{ color: t.color }} />
                      <div className="flex-1 min-w-0 truncate">
                        <div className="text-xs font-medium text-white">{t.label}</div>
                        <div className="text-[11px] text-zinc-400">{t.hint}</div>
                      </div>
                      {isSelected && <Check className="size-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Card Body */}
          <div className="flex flex-col rounded-[18px] bg-zinc-950/90 border border-white/10 shadow-inner">
            {/* Attached Files List */}
            {files.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 px-3 pt-3">
                {files.map((file) => (
                  <li
                    className="flex h-7 items-center gap-1.5 rounded-lg bg-white/10 pr-1 pl-2 text-xs text-white"
                    key={fileKey(file)}
                  >
                    <FileText className="size-3.5" />
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    <button
                      className="flex size-5 items-center justify-center rounded-full text-white/50 hover:text-white"
                      onClick={() => setFiles(files.filter((f) => f !== file))}
                      type="button"
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* Textarea */}
            <textarea
              className="min-h-[56px] w-full resize-none rounded-none border-none bg-transparent px-4 pt-3 pb-1 text-[14.5px] text-white leading-relaxed placeholder:text-white/35 focus:outline-none"
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                } else if (e.key === "/" && value === "") {
                  e.preventDefault();
                  setToolsOpen(true);
                }
              }}
              placeholder={tool?.placeholder ?? placeholder}
              ref={textareaRef}
              rows={2}
              value={value}
            />

            {/* Controls Row */}
            <div className="flex items-center gap-1.5 px-3 pb-2.5 pt-1 relative">
              {/* Plus Button */}
              <button
                aria-label="Attach files"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors border border-white/10 cursor-pointer outline-none bg-transparent"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Plus className="size-4" />
              </button>
              <input
                className="hidden"
                multiple
                onChange={(e) => {
                  const picked = Array.from(e.target.files ?? []);
                  setFiles([...files, ...picked]);
                  e.target.value = "";
                }}
                ref={fileInputRef}
                type="file"
              />

              {/* Tool Pill */}
              <button
                className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer border-0 outline-none bg-transparent"
                onClick={() => setToolsOpen(!toolsOpen)}
                type="button"
              >
                {tool ? (
                  <>
                    <tool.icon className="size-3.5" style={{ color: tool.color }} />
                    <span>{tool.label}</span>
                  </>
                ) : (
                  <>
                    <Settings2 className="size-3.5 text-white/60" />
                    <span>Tools</span>
                  </>
                )}
                <ChevronDown className="size-3 opacity-60" />
              </button>

              <div className="flex-1" />

              {/* Model Menu Button */}
              <div className="relative">
                <button
                  className="flex h-8 items-center gap-1 rounded-full px-2.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer border-0 outline-none bg-transparent"
                  onClick={() => setModelOpen(!modelOpen)}
                  type="button"
                >
                  <span className="truncate max-w-[130px]">{model}</span>
                  <ChevronDown className="size-3 opacity-60" />
                </button>

                <AnimatePresence>
                  {modelOpen && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 bottom-10 z-50 w-48 rounded-xl bg-zinc-900 border border-white/15 p-1 shadow-2xl"
                      exit={{ opacity: 0, y: 4 }}
                      initial={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                    >
                      {models.map((m) => (
                        <button
                          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left cursor-pointer border-0 outline-none ${
                            m === model
                              ? "bg-white/10 text-white font-medium"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          }`}
                          key={m}
                          onClick={() => {
                            setModel(m);
                            setModelOpen(false);
                          }}
                          type="button"
                        >
                          <span className="truncate">{m}</span>
                          {m === model && <Check className="size-3.5 text-emerald-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Send / Stop Button */}
              <button
                aria-label={running ? "Stop" : "Ask"}
                className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-all border-0 outline-none cursor-pointer ${
                  canSubmit || running
                    ? "bg-white text-zinc-950 shadow-md hover:bg-zinc-200"
                    : "bg-white/10 text-white/35 cursor-not-allowed"
                }`}
                disabled={!canSubmit && !running}
                onClick={running ? stop : submit}
                type="button"
              >
                {running ? (
                  <>
                    <span>Stop</span>
                    <span className="size-2 rounded-[2px] bg-current" />
                  </>
                ) : (
                  <>
                    <span>Ask</span>
                    <CornerDownLeft className="size-3.5 opacity-70" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trace Live Feed */}
          <AnimatePresence initial={false}>
            {phase !== "idle" && (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <Trace
                  elapsed={elapsed}
                  expanded={expanded}
                  listId={listId}
                  onToggle={() => setExpanded(!expanded)}
                  phase={phase}
                  sources={sources}
                  tool={runTool}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
