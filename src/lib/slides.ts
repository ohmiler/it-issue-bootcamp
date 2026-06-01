import matter from "gray-matter";

export type LessonSlideSource = {
  index: number;
  title: string;
  markdown: string;
  notes: string;
};

type SlideDraft = {
  index: number;
  title: string;
  lines: string[];
};

const slideHeadingPattern = /^##\s+Slide\s+(\d+):?\s*(.+)?$/;

export function splitLessonSlides(raw: string): LessonSlideSource[] {
  const { content } = matter(raw);
  const lines = content.split(/\r?\n/);
  const drafts: SlideDraft[] = [];
  let current: SlideDraft | null = null;
  let inFence = false;
  let fenceMarker = "";
  let fenceLength = 0;

  for (const line of lines) {
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);

    if (fenceMatch) {
      const fence = fenceMatch[2];
      const marker = fence[0];

      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
        fenceLength = fence.length;
      } else if (marker === fenceMarker && fence.length >= fenceLength) {
        inFence = false;
        fenceMarker = "";
        fenceLength = 0;
      }
    }

    const slideMatch = !inFence ? line.match(slideHeadingPattern) : null;

    if (slideMatch) {
      current = {
        index: Number(slideMatch[1]),
        title: slideMatch[2]?.trim() ?? `Slide ${slideMatch[1]}`,
        lines: [line],
      };
      drafts.push(current);
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  return drafts.map((draft) => {
    const { markdown, notes } = splitSpeakerNotes(
      trimSectionBreaks(draft.lines).join("\n").trim(),
    );

    return {
      index: draft.index,
      title: draft.title,
      markdown,
      notes,
    };
  });
}

function splitSpeakerNotes(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;
  let fenceMarker = "";
  let fenceLength = 0;
  let notesIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);

    if (fenceMatch) {
      const fence = fenceMatch[2];
      const marker = fence[0];

      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
        fenceLength = fence.length;
      } else if (marker === fenceMarker && fence.length >= fenceLength) {
        inFence = false;
        fenceMarker = "";
        fenceLength = 0;
      }
    }

    if (!inFence && /^###\s+Speaker Notes\b/.test(line)) {
      notesIndex = index;
      break;
    }
  }

  if (notesIndex === -1) {
    return {
      markdown: trimSectionBreaks(lines).join("\n").trim(),
      notes: "",
    };
  }

  return {
    markdown: trimSectionBreaks(lines.slice(0, notesIndex)).join("\n").trim(),
    notes: trimSectionBreaks(lines.slice(notesIndex + 1)).join("\n").trim(),
  };
}

function trimSectionBreaks(lines: string[]) {
  const next = [...lines];

  while (next.length > 0 && isTrimmedLineEmptyOrBreak(next[0])) {
    next.shift();
  }

  while (next.length > 0 && isTrimmedLineEmptyOrBreak(next[next.length - 1])) {
    next.pop();
  }

  return next;
}

function isTrimmedLineEmptyOrBreak(line: string) {
  const trimmed = line.trim();
  return trimmed === "" || trimmed === "---";
}
