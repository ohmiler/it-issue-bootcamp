"use client";

import { useEffect, useRef, useState } from "react";
import type { SlideOutlineItem } from "@/lib/slides";

type LessonOutlineNavProps = {
  items: SlideOutlineItem[];
};

const clickScrollLockMs = 600;

function getScroller() {
  const panel = document.querySelector<HTMLElement>(".workbench-editor-panel");

  if (panel && panel.scrollHeight > panel.clientHeight + 1) {
    return panel;
  }

  return document.scrollingElement as HTMLElement;
}

function readActiveSlide(items: SlideOutlineItem[]) {
  const headings = items
    .map((item) => document.getElementById(`slide-${item.index}`))
    .filter((heading): heading is HTMLElement => heading !== null);
  const scroller = getScroller();
  const atBottom =
    scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;

  if (atBottom && scroller.scrollTop > 0 && headings.length > 0) {
    return Number(headings[headings.length - 1].id.replace("slide-", ""));
  }

  const limit = window.innerHeight * 0.35;
  let active = 0;

  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > limit) {
      break;
    }

    active = Number(heading.id.replace("slide-", ""));
  }

  return active;
}

// Scrolls only the sidebar, so the lesson content keeps its position.
function revealInSidebar(element: HTMLElement, align: "top" | "nearest") {
  const sidebar = element.closest<HTMLElement>(".workbench-sidebar");

  if (!sidebar) {
    return;
  }

  const sidebarRect = sidebar.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const isVisible =
    elementRect.top >= sidebarRect.top &&
    elementRect.bottom <= sidebarRect.bottom;

  if (align === "top") {
    const nearTop = elementRect.top - sidebarRect.top < sidebarRect.height * 0.3;

    if (!isVisible || !nearTop) {
      sidebar.scrollTop += elementRect.top - sidebarRect.top - 48;
    }

    return;
  }

  if (elementRect.top < sidebarRect.top) {
    sidebar.scrollTop -= sidebarRect.top - elementRect.top + 8;
  } else if (elementRect.bottom > sidebarRect.bottom) {
    sidebar.scrollTop += elementRect.bottom - sidebarRect.bottom + 8;
  }
}

export function LessonOutlineNav({ items }: LessonOutlineNavProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const lockUntilRef = useRef(0);

  useEffect(() => {
    const lessonLink = listRef.current?.previousElementSibling;

    if (lessonLink instanceof HTMLElement) {
      revealInSidebar(lessonLink, "top");
    }
  }, []);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;

      if (performance.now() < lockUntilRef.current) {
        return;
      }

      setActiveSlide(readActiveSlide(items));
    }

    function onScroll() {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    }

    onScroll();
    document.addEventListener("scroll", onScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, [items]);

  useEffect(() => {
    const activeLink = listRef.current?.querySelector<HTMLElement>(
      "[aria-current]",
    );

    if (activeLink) {
      revealInSidebar(activeLink, "nearest");
    }
  }, [activeSlide]);

  return (
    <ol
      ref={listRef}
      className="workbench-outline"
      aria-label="สไลด์ในชั่วโมงนี้"
    >
      {items.map((item) => (
        <li key={item.index}>
          <a
            href={`#slide-${item.index}`}
            aria-current={item.index === activeSlide ? "location" : undefined}
            onClick={() => {
              lockUntilRef.current = performance.now() + clickScrollLockMs;
              setActiveSlide(item.index);
            }}
          >
            <span>{item.index}</span>
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
