/* eslint-disable */
"use client";

import { useState, useRef } from "react";
import { RotateCcw, ArrowRight } from "lucide-react";
import AIInputSearch from "./AIInputSearch";
import AILoadingState, { DEFAULT_AI_STEPS } from "./AILoadingState";
import AICitations from "./AICitations";
import { askPortfolioAI } from "../lib/portfolioAI";

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
        tool,
        model,
        files,
        onSource,
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
      className="relative z-20 w-full overflow-x-hidden border-t border-b border-white/[0.08] bg-[#070709] py-10 px-3 sm:px-6 md:px-8 box-border"
    >
      <div className="mx-auto flex w-full max-w-4xl min-w-0 flex-col items-center justify-center text-center">
        {/* Search Input Box */}
        <div className="w-full min-w-0 flex justify-center">
          <AIInputSearch
            onSearch={handleSearch}
            className="w-full max-w-2xl"
          />
        </div>

        {/* Live Loading State */}
        {queryState.isLoading && (
          <div className="mt-5 w-full max-w-2xl text-left">
            <AILoadingState
              active={true}
              steps={steps}
              title={`Synthesizing response for "${queryState.activeQuery}"`}
            />
          </div>
        )}

        {/* Results Card with Kokonut Citations (Green Background + Black Text) */}
        {queryState.result && !queryState.isLoading && (
          <div className="mt-6 w-full max-w-2xl text-left animate-in fade-in-50 duration-300">
            <div className="rounded-2xl border border-[#B4F435] bg-[#B4F435] text-[#0A0A0B] p-5 shadow-[0_20px_50px_rgba(180,244,53,0.2)]">
              {/* Question Bar & Controls */}
              <div className="flex items-center justify-between gap-2 border-b border-[#0A0A0B]/15 pb-3 mb-4">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0A0A0B] text-[#B4F435] text-xs font-mono font-bold">
                    AI
                  </span>
                  <span className="text-xs font-semibold text-[#0A0A0B] truncate">
                    &ldquo;{queryState.activeQuery}&rdquo;
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded border border-[#0A0A0B]/25 bg-[#0A0A0B]/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#0A0A0B]">
                    {queryState.result.modelLabel || "GPT-OSS 20B (OpenSource)"}
                  </span>
                  <button
                    onClick={handleReset}
                    type="button"
                    title="Ask another question"
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#0A0A0B]/75 hover:text-[#0A0A0B] transition-colors cursor-pointer"
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
                className="max-w-none py-0"
              />

              {/* Quick Jump Action */}
              <div className="mt-4 pt-3 border-t border-[#0A0A0B]/15 flex flex-wrap items-center justify-between gap-2 text-xs text-[#0A0A0B]/80">
                <span className="font-medium">Direct jump to verified portfolio section:</span>
                <div className="flex items-center gap-2 font-semibold">
                  <a
                    href="#work"
                    className="inline-flex items-center gap-1 text-[#0A0A0B] hover:underline"
                  >
                    Projects <ArrowRight className="size-3" />
                  </a>
                  <span className="text-[#0A0A0B]/40">·</span>
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-1 text-[#0A0A0B] hover:underline"
                  >
                    Experience <ArrowRight className="size-3" />
                  </a>
                  <span className="text-[#0A0A0B]/40">·</span>
                  <a
                    href="#skills"
                    className="inline-flex items-center gap-1 text-[#0A0A0B] hover:underline"
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
