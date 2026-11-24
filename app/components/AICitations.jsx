/* eslint-disable */
"use client";

/**
 * @author: @kokonutui
 * @description: AI Inline Citations
 * @version: 1.0.0
 * @license: MIT
 */

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1];
const CARD_WIDTH = 300;
const OPEN_DELAY_MS = 100;
const CLOSE_DELAY_MS = 100;

const MONOGRAM_TINTS = [
  "bg-sky-400/20 text-sky-200 border border-sky-400/30",
  "bg-emerald-400/20 text-emerald-200 border border-emerald-400/30",
  "bg-violet-400/20 text-violet-200 border border-violet-400/30",
  "bg-orange-400/20 text-orange-200 border border-orange-400/30",
  "bg-rose-400/20 text-rose-200 border border-rose-400/30",
];

function siteTints(sources) {
  const tints = new Map();
  sources.forEach((source, index) => {
    const site = source.site || source.id;
    if (!tints.has(site)) {
      tints.set(site, MONOGRAM_TINTS[index % MONOGRAM_TINTS.length]);
    }
  });
  return tints;
}

function Monogram({ source, tint, className = "" }) {
  const site = source.site || source.id || "S";
  return (
    <span
      aria-hidden="true"
      className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] font-semibold text-[9px] uppercase ${tint} ${className}`}
    >
      {site.charAt(0)}
    </span>
  );
}

export default function AICitations({
  parts = [],
  sources = [],
  className = "",
}) {
  const rootRef = useRef(null);
  const [activePreview, setActivePreview] = useState(null);
  const [listOpen, setListOpen] = useState(false);
  const timerRef = useRef(null);

  const byId = new Map(sources.map((source) => [source.id, source]));
  const tints = siteTints(sources);

  const order = [];
  parts.forEach((part) => {
    (part.cite || []).forEach((id) => {
      if (!order.includes(id) && byId.has(id)) {
        order.push(id);
      }
    });
  });

  const cited = order.map((id) => byId.get(id)).filter(Boolean);

  const showPreview = (index, chip) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const rootRect = rootRef.current?.getBoundingClientRect();
      const chipRect = chip.getBoundingClientRect();
      if (!rootRect) return;

      const left = chipRect.left - rootRect.left;
      const top = chipRect.bottom - rootRect.top + 8;

      setActivePreview({
        index,
        x: Math.max(0, Math.min(left, rootRect.width - CARD_WIDTH)),
        y: top,
      });
    }, OPEN_DELAY_MS);
  };

  const hidePreview = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActivePreview(null);
    }, CLOSE_DELAY_MS);
  };

  const activePart = activePreview ? parts[activePreview.index] : null;
  const activeSources = (activePart?.cite || []).map((id) => byId.get(id)).filter(Boolean);

  return (
    <MotionConfig reducedMotion="user">
      <div className={`relative w-full max-w-lg mx-auto py-2 text-left ${className}`} ref={rootRef}>
        <div className="rounded-2xl bg-zinc-900/90 border border-white/10 p-5 shadow-2xl backdrop-blur-md">
          {/* Answer Text with Inline Citations */}
          <p className="text-[15px] leading-relaxed text-zinc-200">
            {parts.map((part, index) => {
              const partSources = (part.cite || [])
                .map((id) => byId.get(id))
                .filter(Boolean);

              if (partSources.length === 0) {
                return <span key={index}>{part.text}</span>;
              }

              const first = partSources[0];
              const isHovered = activePreview?.index === index;

              return (
                <span key={index}>
                  <span
                    className={`rounded-[3px] transition-colors duration-150 ${
                      isHovered ? "bg-sky-400/20 text-sky-100" : ""
                    }`}
                  >
                    {part.text}
                  </span>
                  {" "}
                  <button
                    className={`inline-flex h-5 items-center gap-1.5 rounded-full py-0 pr-2 pl-1 align-baseline font-medium text-[11px] outline-none transition-all duration-150 ${
                      isHovered
                        ? "bg-white text-zinc-950 scale-105"
                        : "bg-white/10 text-zinc-300 hover:bg-white/15"
                    }`}
                    onClick={(e) => showPreview(index, e.currentTarget)}
                    onMouseEnter={(e) => showPreview(index, e.currentTarget)}
                    onMouseLeave={hidePreview}
                    type="button"
                  >
                    <Monogram
                      className="size-3.5 rounded-full"
                      source={first}
                      tint={tints.get(first.site || first.id)}
                    />
                    <span>{first.site || first.id}</span>
                    {partSources.length > 1 && (
                      <span className="opacity-60 text-[10px]">+{partSources.length - 1}</span>
                    )}
                  </button>
                  {" "}
                </span>
              );
            })}
          </p>

          {/* Floating Hover Card for Citations */}
          <AnimatePresence>
            {activePreview && activeSources.length > 0 && (
              <motion.div
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="absolute z-30 pointer-events-none"
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                style={{
                  top: activePreview.y,
                  left: activePreview.x,
                  width: CARD_WIDTH,
                }}
                transition={{ duration: 0.16, ease: EASE_OUT }}
              >
                <div className="rounded-xl bg-zinc-950/95 p-3.5 shadow-2xl border border-white/15 backdrop-blur-xl">
                  {activeSources.map((source) => (
                    <div key={source.id} className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <Monogram source={source} tint={tints.get(source.site || source.id)} />
                        <span className="font-semibold text-zinc-200">{source.site || source.id}</span>
                        <span className="text-[10px] text-zinc-500">• Verified</span>
                      </div>
                      <p className="font-medium text-xs text-white leading-snug">
                        {source.title}
                      </p>
                      {source.snippet && (
                        <p className="text-[11px] line-clamp-3 text-zinc-400 leading-relaxed bg-white/5 p-2 rounded-md">
                          “{source.snippet}”
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapsible Source Drawer */}
          {cited.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                onClick={() => setListOpen(!listOpen)}
                type="button"
              >
                <span className="flex -space-x-1">
                  {cited.slice(0, 3).map((source) => (
                    <Monogram
                      className="size-4 rounded-full ring-2 ring-zinc-900"
                      key={source.id}
                      source={source}
                      tint={tints.get(source.site || source.id)}
                    />
                  ))}
                </span>
                <span>{cited.length} website sources cited</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    listOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {listOpen && (
                  <motion.ol
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden space-y-1.5 mt-2"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  >
                    {cited.map((source, index) => (
                      <li key={source.id}>
                        <a
                          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-zinc-300 hover:bg-white/5 transition-colors group"
                          href={source.url}
                        >
                          <span className="w-3 text-zinc-500 tabular-nums">{index + 1}</span>
                          <Monogram source={source} tint={tints.get(source.site || source.id)} />
                          <span className="flex-1 truncate">{source.title}</span>
                          <ArrowUpRight className="size-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                        </a>
                      </li>
                    ))}
                  </motion.ol>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
