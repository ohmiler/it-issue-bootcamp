"use client";

import Link from "next/link";
import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Presentation,
} from "lucide-react";

type SlideDeckProps = {
  children: React.ReactNode;
  documentHref: string;
  lessonLabel: string;
  lessonTitle: string;
  nextLesson?: {
    href: string;
    label: string;
    title: string;
  };
  slideTitles: string[];
};

function readSlideIndexFromHash(slideCount: number) {
  const match = window.location.hash.match(/^#slide-(\d+)$/);
  const requestedSlide = Number.parseInt(match?.[1] ?? "", 10);

  if (!Number.isInteger(requestedSlide)) {
    return 0;
  }

  return Math.max(0, Math.min(requestedSlide - 1, slideCount - 1));
}

export function SlideDeck({
  children,
  documentHref,
  lessonLabel,
  lessonTitle,
  nextLesson,
  slideTitles,
}: SlideDeckProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasReadHash, setHasReadHash] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const slideFrameRef = useRef<HTMLElement>(null);
  const pickerButtonRef = useRef<HTMLButtonElement>(null);
  const pickerPanelRef = useRef<HTMLDivElement>(null);
  const activeTitle = slideTitles[activeIndex] ?? "Slide";
  const isLastSlide = activeIndex >= slides.length - 1;
  const progressPercent =
    slides.length > 0 ? ((activeIndex + 1) / slides.length) * 100 : 0;

  const goToSlide = useCallback(
    (index: number) => {
      slideFrameRef.current?.scrollTo({ left: 0, top: 0 });
      setActiveIndex(Math.max(0, Math.min(index, slides.length - 1)));
    },
    [slides.length],
  );

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      setActiveIndex(readSlideIndexFromHash(slides.length));
      setHasReadHash(true);
    });

    function onHashChange() {
      slideFrameRef.current?.scrollTo({ left: 0, top: 0 });
      setActiveIndex(readSlideIndexFromHash(slides.length));
    }

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [slides.length]);

  useEffect(() => {
    if (!hasReadHash) {
      return;
    }

    slideFrameRef.current?.scrollTo({ left: 0, top: 0 });

    const url = new URL(window.location.href);
    url.hash = `slide-${activeIndex + 1}`;
    window.history.replaceState(null, "", url);
  }, [activeIndex, hasReadHash]);

  const closePicker = useCallback((returnFocus: boolean) => {
    setIsPickerOpen(false);

    if (returnFocus) {
      pickerButtonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!isPickerOpen) {
      return;
    }

    pickerPanelRef.current
      ?.querySelector<HTMLButtonElement>("[aria-current]")
      ?.focus();

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        !pickerPanelRef.current?.contains(target) &&
        !pickerButtonRef.current?.contains(target)
      ) {
        closePicker(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [closePicker, isPickerOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isPickerOpen) {
        if (event.key === "Escape") {
          event.preventDefault();
          closePicker(true);
        }

        return;
      }

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Let a focused button or link handle its own Space and Enter.
      if (
        (event.key === " " || event.key === "Enter") &&
        (event.target instanceof HTMLButtonElement ||
          event.target instanceof HTMLAnchorElement)
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
  }, [activeIndex, closePicker, goToSlide, isPickerOpen, slides.length]);

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
          <Link
            href={`${documentHref}#slide-${activeIndex + 1}`}
            className="slide-command"
          >
            <BookOpen size={16} aria-hidden="true" />
            Document
          </Link>
          <div className="slide-picker">
            <button
              ref={pickerButtonRef}
              type="button"
              className="slide-counter"
              aria-label={`สไลด์ ${activeIndex + 1} จาก ${slides.length} เปิดรายชื่อสไลด์`}
              aria-expanded={isPickerOpen}
              aria-controls="slide-picker-panel"
              onClick={() => setIsPickerOpen((open) => !open)}
            >
              {activeIndex + 1} / {slides.length}
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {isPickerOpen ? (
              <div
                ref={pickerPanelRef}
                id="slide-picker-panel"
                className="slide-picker__panel"
              >
                <p className="slide-picker__title">สไลด์ในชั่วโมงนี้</p>
                <ol>
                  {slideTitles.map((title, index) => (
                    <li key={`${index}-${title}`}>
                      <button
                        type="button"
                        aria-current={index === activeIndex ? "true" : undefined}
                        onClick={() => {
                          goToSlide(index);
                          closePicker(true);
                        }}
                      >
                        <span>{index + 1}</span>
                        <span>{title.replace(/[`*]/g, "")}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="slide-stage" aria-live="polite">
        <section
          className="slide-frame"
          aria-label={activeTitle}
          ref={slideFrameRef}
        >
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
        {isLastSlide && nextLesson ? (
          <Link
            href={nextLesson.href}
            className="slide-command slide-next-lesson"
            title={nextLesson.title}
          >
            ต่อ {nextLesson.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            className="slide-icon-button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={isLastSlide}
            aria-label="Next slide"
            title="Next slide"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        )}
        <p className="slide-control-hint">กด ← → เพื่อเปลี่ยนสไลด์</p>
      </footer>
    </div>
  );
}
