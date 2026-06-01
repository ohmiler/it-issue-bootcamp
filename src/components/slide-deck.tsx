"use client";

import Link from "next/link";
import { Children, useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Presentation,
} from "lucide-react";

type SlideDeckProps = {
  children: React.ReactNode;
  documentHref: string;
  lessonLabel: string;
  lessonTitle: string;
  slideTitles: string[];
};

export function SlideDeck({
  children,
  documentHref,
  lessonLabel,
  lessonTitle,
  slideTitles,
}: SlideDeckProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTitle = slideTitles[activeIndex] ?? "Slide";
  const progressPercent =
    slides.length > 0 ? ((activeIndex + 1) / slides.length) * 100 : 0;

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (
        event.key === "ArrowRight" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        goToSlide(activeIndex + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goToSlide(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        goToSlide(slides.length - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goToSlide, slides.length]);

  return (
    <div className="slide-mode">
      <header className="slide-topbar">
        <div className="slide-topbar__title">
          <span className="slide-topbar__eyebrow">
            <Presentation size={16} aria-hidden="true" />
            {lessonLabel}
          </span>
          <h1>{lessonTitle}</h1>
        </div>
        <div className="slide-topbar__actions">
          <Link href={documentHref} className="slide-command">
            <BookOpen size={16} aria-hidden="true" />
            Document
          </Link>
          <span
            className="slide-counter"
            aria-label={`Slide ${activeIndex + 1} of ${slides.length}`}
          >
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </header>

      <main className="slide-stage" aria-live="polite">
        <section className="slide-frame" aria-label={activeTitle}>
          {slides[activeIndex]}
        </section>
      </main>

      <footer className="slide-controls" aria-label="Slide controls">
        <button
          type="button"
          className="slide-icon-button"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <div className="slide-progress" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <button
          type="button"
          className="slide-icon-button"
          onClick={() => goToSlide(activeIndex + 1)}
          disabled={activeIndex >= slides.length - 1}
          aria-label="Next slide"
          title="Next slide"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
        <div className="slide-control-hint">
          <ArrowLeft size={14} aria-hidden="true" />
          <ArrowRight size={14} aria-hidden="true" />
        </div>
      </footer>
    </div>
  );
}
