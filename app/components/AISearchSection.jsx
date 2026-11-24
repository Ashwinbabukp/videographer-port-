/* eslint-disable */
"use client";

import { useState, useRef } from "react";
import { Sparkles, MessageSquare, RotateCcw, ArrowRight } from "lucide-react";
import AIInputSearch from "./AIInputSearch";
import AILoadingState, { DEFAULT_AI_STEPS } from "./AILoadingState";
import AICitations from "./AICitations";
import { askPortfolioAI } from "../lib/portfolioAI";

const SAMPLE_QUESTIONS = [
  "What projects has Ashwin built with Next.js & React?",
  "Tell me about his experience at FaatLab Technologies",
  "What is his full technical stack and frontend skills?",
  "What are his academics and degree CGPA?",
  "Is Ashwin available for immediate hiring?",
];

export default function AISearchSection() {
  const [queryState, setQueryState] = useState({
    activeQuery: "",
    isLoading: false,
    result: null,
    error: null,
  });

  const [steps, setSteps] = useState(DEFAULT_AI_STEPS);
  const searchInputRef = useRef(null);

  const handleSearch = async (
    query,
    { tool, model, files, signal, onSource }
  ) => {
    setQueryState({
      activeQuery: query,
      isLoading: true,
      result: null,
      error: null,
    });

    // Animate the loading steps progressively
    setSteps([
      { ...DEFAULT_AI_STEPS[0], status: "running" },
      { ...DEFAULT_AI_STEPS[1], status: "pending" },
      { ...DEFAULT_AI_STEPS[2], status: "pending" },
      { ...DEFAULT_AI_STEPS[3], status: "pending" },
    ]);

    // Timer step simulator to make it feel natural
    const stepTimer1 = setTimeout(() => {
      setSteps((curr) => [
        { ...curr[0], status: "done" },
        { ...curr[1], status: "running" },
        { ...curr[2], status: "pending" },
        { ...curr[3], status: "pending" },
      ]);
    }, 450);

    const stepTimer2 = setTimeout(() => {
      setSteps((curr) => [
        { ...curr[0], status: "done" },
        { ...curr[1], status: "done" },
        { ...curr[2], status: "running" },
        { ...curr[3], status: "pending" },
      ]);
    }, 950);

    const stepTimer3 = setTimeout(() => {
      setSteps((curr) => [
        { ...curr[0], status: "done" },
        { ...curr[1], status: "done" },
        { ...curr[2], status: "done" },
        { ...curr[3], status: "running" },
      ]);
    }, 1450);

    try {
      const response = await askPortfolioAI(query, {
        signal,
        onSource: (source) => {
          if (onSource) {
            onSource({
              domain: source.site ? `${source.site.toLowerCase()}.ashwin.dev` : "ashwin.dev",
              title: source.title,
              color: "#10b981",
            });
          }
        },
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setSteps((curr) =>
        curr.map((s) => ({ ...s, status: "done" }))
      );

      setQueryState({
        activeQuery: query,
        isLoading: false,
        result: response,
        error: null,
      });
    } catch (err) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      if (signal?.aborted) {
        setQueryState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      setQueryState({
        activeQuery: query,
        isLoading: false,
        result: null,
        error: "Search interrupted or service temporarily unavailable. Please try again.",
      });
    }
  };

  const handleSampleClick = (sample) => {
    // Fill sample and trigger
    handleSearch(sample, {
      tool: null,
      model: "Mistral 7B (OpenSource)",
      files: [],
      signal: new AbortController().signal,
    });
  };

  const handleReset = () => {
    setQueryState({
      activeQuery: "",
      isLoading: false,
      result: null,
      error: null,
    });
    setSteps(DEFAULT_AI_STEPS);
  };

  return (
    <section
      id="ai-search"
      className="relative z-20 w-full border-t border-b border-white/[0.08] bg-[#070709] py-16 px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.04) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Section Heading */}
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          Ask Anything About My Work &amp; Stack
        </h2>
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-zinc-400">
          Instant answers powered by free open-source AI with direct
          portfolio-indexed citations, technical metrics, and code references.
        </p>

        {/* Search Input Box */}
        <div className="mt-8 w-full flex justify-center">
          <AIInputSearch
            onSearch={handleSearch}
            className="w-full max-w-2xl"
          />
        </div>

        {/* Sample Prompt Chips */}
        {!queryState.isLoading && !queryState.result && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
              <MessageSquare className="size-3" /> Quick prompts:
            </span>
            {SAMPLE_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSampleClick(q)}
                type="button"
                className="rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300 transition-all duration-150 hover:border-sky-400/40 hover:bg-zinc-800/80 hover:text-white hover:shadow-[0_0_12px_rgba(56,189,248,0.15)] active:scale-95 text-left cursor-pointer outline-none"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Live Loading State */}
        {queryState.isLoading && (
          <div className="mt-8 w-full max-w-2xl text-left">
            <AILoadingState
              active={true}
              steps={steps}
              title={`Synthesizing response for "${queryState.activeQuery}"`}
            />
          </div>
        )}

        {/* Results Card with Kokonut Citations */}
        {queryState.result && !queryState.isLoading && (
          <div className="mt-8 w-full max-w-2xl text-left animate-in fade-in-50 duration-300">
            <div className="rounded-2xl border border-white/15 bg-zinc-950/90 p-5 shadow-2xl backdrop-blur-md">
              {/* Question Bar & Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono">
                    AI
                  </span>
                  <span className="text-xs font-medium text-zinc-300 truncate">
                    &ldquo;{queryState.activeQuery}&rdquo;
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400">
                    OpenSource AI
                  </span>
                  <button
                    onClick={handleReset}
                    type="button"
                    title="Ask another question"
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="size-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              {/* Citations Renderer */}
              <AICitations
                parts={queryState.result.parts}
                sources={queryState.result.sources}
              />

              {/* Quick Jump Action */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                <span>Direct jump to verified portfolio section:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    Projects <ArrowRight className="size-3" />
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    Experience <ArrowRight className="size-3" />
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a
                    href="#skills"
                    className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    Skills <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Feedback */}
        {queryState.error && !queryState.isLoading && (
          <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-950/20 px-4 py-3 text-xs text-rose-300">
            {queryState.error}
          </div>
        )}
      </div>
    </section>
  );
}
