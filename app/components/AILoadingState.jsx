/* eslint-disable */
"use client";

/**
 * @author: @kokonutui
 * @description: AI Loading State
 * @version: 2.0.0
 * @license: MIT
 */

import { ChevronDown } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1];
const LINE_HEIGHT = 24;
const VISIBLE_LINES = 3;

export const DEFAULT_AI_STEPS = [
  {
    id: "search",
    label: "Searching portfolio sources",
    detail: [
      "query: frontend engineer competencies",
      "visiting ashwin.dev/projects",
      "reading commercial milestones & metrics",
      "reading academics & certifications",
    ],
  },
  {
    id: "read",
    label: "Reading 4 website sections",
    detail: [
      "extracting Figma design system handoffs",
      "analyzing Next.js 16 & React 19 stack",
      "ranking technical accomplishments",
    ],
  },
  {
    id: "compare",
    label: "Synthesizing answer",
    detail: [
      "verifying 8+ production web applications",
      "verifying 30% performance speedup",
      "formatting inline source citations",
    ],
  },
  {
    id: "write",
    label: "Writing response",
    detail: ["generating concise answer with citations"],
  },
];

function StepIcon({ status }) {
  return (
    <span className="relative flex size-4 shrink-0 items-center justify-center">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="absolute inset-0 flex items-center justify-center"
          exit={{ opacity: 0, filter: "blur(2px)" }}
          initial={{ opacity: 0, filter: "blur(2px)" }}
          key={status}
          transition={{ duration: 0.18, ease: EASE_OUT }}
        >
          {status === "pending" && (
            <span className="size-1.5 rounded-full bg-zinc-600" />
          )}
          {status === "running" && (
            <svg
              aria-hidden="true"
              className="size-3.5 motion-safe:animate-spin text-[#B4F435]"
              fill="none"
              style={{ animationDuration: "0.8s" }}
              viewBox="0 0 16 16"
            >
              <circle
                className="stroke-zinc-700"
                cx="8"
                cy="8"
                r="6.25"
                strokeWidth="1.5"
              />
              <path
                className="stroke-[#B4F435]"
                d="M8 1.75a6.25 6.25 0 0 1 6.25 6.25"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          )}
          {status === "done" && (
            <svg
              aria-hidden="true"
              className="size-3.5 text-[#B4F435]"
              fill="none"
              viewBox="0 0 16 16"
            >
              <motion.path
                animate={{ pathLength: 1 }}
                d="M3.5 8.5 6.5 11.5 12.5 4.5"
                initial={{ pathLength: 0 }}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.05 }}
              />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StepLog({ lines }) {
  const offset = Math.max(0, lines.length - VISIBLE_LINES);
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden font-mono text-xs"
      style={{
        height: LINE_HEIGHT * Math.min(lines.length, VISIBLE_LINES),
        transition: "height 240ms cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      <div
        className="transition-transform duration-300 ease-out"
        style={{ transform: `translateY(${-offset * LINE_HEIGHT}px)` }}
      >
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-zinc-400"
            initial={{ opacity: 0 }}
            key={`${index}-${line}`}
            style={{ height: LINE_HEIGHT }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <span className="w-4 select-none text-right text-zinc-600 tabular-nums">
              {index + 1}
            </span>
            <span className="truncate">{line}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const formatDuration = (seconds) =>
  seconds < 60
    ? `${seconds}s`
    : `${Math.floor(seconds / 60)}m ${(seconds % 60).toString().padStart(2, "0")}s`;

function useElapsed(active, done) {
  const [seconds, setSeconds] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = startRef.current ?? Date.now();
    startRef.current = start;
    const tick = () => setSeconds(Math.floor((Date.now() - start) / 1000));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [active]);

  return seconds;
}

function WaveText({ text }) {
  return (
    <span className="inline-flex">
      {Array.from(text).map((char, i) => (
        <span
          className="kokonut-ai-wave whitespace-pre"
          key={i}
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function StepRow({ step, isLast }) {
  const isRunning = step.status === "running";
  const isDone = step.status === "done";

  return (
    <li className="relative flex gap-3 pt-3.5">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute top-[34px] bottom-[-10px] left-[7.5px] w-px overflow-hidden bg-zinc-800"
        >
          <span
            className="block h-full w-full origin-top bg-emerald-400/50 transition-transform duration-500 ease-out"
            style={{ transform: isDone ? "scaleY(1)" : "scaleY(0)" }}
          />
        </span>
      )}
      <StepIcon status={step.status} />
      <div className="-mt-0.5 min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p
            className={`min-w-0 truncate text-sm transition-colors duration-200 ${
              isRunning
                ? "text-zinc-100 font-medium"
                : isDone
                ? "text-zinc-400"
                : "text-zinc-500"
            }`}
          >
            {isRunning ? <WaveText text={step.label} /> : step.label}
          </p>
        </div>
        {isRunning && step.detail?.length ? (
          <div className="mt-1">
            <StepLog lines={step.detail} />
          </div>
        ) : null}
      </div>
    </li>
  );
}

function ThinkingWave({ text }) {
  return (
    <span className="inline-flex items-center font-medium">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          animate={{
            opacity: [0.45, 1, 0.45],
            color: ["#a1a1aa", "#B4F435", "#a1a1aa"],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function AILoadingState({
  steps = DEFAULT_AI_STEPS,
  collapseWhenDone = true,
  className = "",
}) {
  const listId = useId();
  const running = steps.find((step) => step.status === "running");
  const isDone = steps.length > 0 && steps.every((step) => step.status === "done");
  const isActive = Boolean(running);
  const seconds = useElapsed(isActive, isDone);

  const shouldCollapse = isDone && collapseWhenDone;
  const [isOpen, setIsOpen] = useState(!shouldCollapse);

  useEffect(() => {
    if (shouldCollapse) {
      setIsOpen(false);
    } else if (isActive) {
      setIsOpen(true);
    }
  }, [shouldCollapse, isActive]);

  let title = "Getting ready";
  if (isDone) {
    title = seconds > 0 ? `Worked for ${formatDuration(seconds)}` : "Done";
  } else if (running) {
    title = running.label;
  }

  return (
    <div className={`flex w-full items-center justify-center py-3 ${className}`}>
      <MotionConfig reducedMotion="user">
        <div className="w-full max-w-lg rounded-2xl bg-zinc-900/80 border border-white/10 p-4 shadow-xl">
          <button
            aria-controls={listId}
            aria-expanded={isOpen}
            className="flex w-full items-center gap-2 py-1 text-left font-medium text-sm text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="min-w-0 truncate">
              {isActive ? <ThinkingWave text={`${title}...`} /> : title}
            </span>
            {isActive && (
              <span className="text-[#B4F435]/80 text-xs font-mono tabular-nums">
                {formatDuration(seconds)}
              </span>
            )}
            {isDone && (
              <span className="text-zinc-400">· {steps.length} steps</span>
            )}
            <ChevronDown
              aria-hidden="true"
              className={`ml-auto size-4 text-zinc-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.ol
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                id={listId}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                {steps.map((step, i) => (
                  <StepRow
                    isLast={i === steps.length - 1}
                    key={step.id}
                    step={step}
                  />
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
}
