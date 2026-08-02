import type { MDXComponents } from "mdx/types";
import { codeToTokens } from "shiki";
import { BoxModelDiagram } from "@/components/box-model-diagram";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import {
  TeachingFlowDiagram,
  type TeachingFlowDiagramVariant,
} from "@/components/teaching-flow-diagram";

type CodeChangeProps = {
  addedLines?: string;
  code?: string;
  highlightLines?: string;
  removedLines?: string;
};

type LessonCalloutType = "action" | "check" | "concept" | "review";

type LessonCalloutProps = {
  children?: React.ReactNode;
  type?: LessonCalloutType;
};

const lessonCalloutLabels: Record<LessonCalloutType, string> = {
  action: "ลงมือทำ",
  check: "ตรวจผล",
  concept: "ทำความเข้าใจ",
  review: "ทบทวน",
};

function parseLineNumbers(...values: string[]) {
  return new Set(
    values
      .flatMap((value) => value.split(","))
      .map((line) => Number.parseInt(line, 10))
      .filter(Number.isFinite),
  );
}

function LessonCallout({
  children,
  type = "concept",
}: LessonCalloutProps) {
  return (
    <aside className={`lesson-callout lesson-callout--${type}`}>
      <strong className="lesson-callout__label">
        {lessonCalloutLabels[type]}
      </strong>
      <div className="lesson-callout__content">{children}</div>
    </aside>
  );
}

async function CodeChange({
  addedLines = "",
  code = "",
  highlightLines = "",
  removedLines = "",
}: CodeChangeProps) {
  const normalizedCode = code.replaceAll("\\n", "\n");
  const lines = normalizedCode.split("\n");
  const addedLineNumbers = parseLineNumbers(highlightLines, addedLines);
  const removedLineNumbers = parseLineNumbers(removedLines);
  const { tokens } = await codeToTokens(normalizedCode, {
    lang: "tsx",
    theme: "dark-plus",
  });

  return (
    <pre className="lesson-code-change">
      <code>
        {lines.map((line, index) => {
          const isAdded = addedLineNumbers.has(index + 1);
          const isRemoved = removedLineNumbers.has(index + 1);
          const changeType = isRemoved ? "removed" : isAdded ? "added" : null;
          const lineTokens = tokens[index] ?? [];

          return (
            <span
              className={`lesson-code-change__line${
                changeType ? ` lesson-code-change__line--${changeType}` : ""
              }`}
              key={`${index}-${line}`}
            >
              <span
                aria-hidden="true"
                className="lesson-code-change__marker"
              >
                {changeType === "added"
                  ? "+"
                  : changeType === "removed"
                    ? "−"
                    : " "}
              </span>
              <span>
                {lineTokens.length > 0
                  ? lineTokens.map((token, tokenIndex) => (
                      <span
                        key={`${tokenIndex}-${token.content}`}
                        style={{
                          color: token.color,
                          fontStyle:
                            (token.fontStyle ?? 0) & 1
                              ? "italic"
                              : undefined,
                          fontWeight:
                            (token.fontStyle ?? 0) & 2 ? 700 : undefined,
                          textDecoration:
                            (token.fontStyle ?? 0) & 4
                              ? "underline"
                              : undefined,
                        }}
                      >
                        {token.content}
                      </span>
                    ))
                  : line || " "}
              </span>
            </span>
          );
        })}
      </code>
    </pre>
  );
}

export const mdxComponents: MDXComponents = {
  BoxModelDiagram: () => <BoxModelDiagram />,
  CodeChange,
  LessonCallout: (props) => (
    <LessonCallout
      type={String(props.type ?? "concept") as LessonCalloutType}
    >
      {props.children}
    </LessonCallout>
  ),
  MermaidDiagram: (props) => (
    <MermaidDiagram chart={String(props.chart ?? "")} />
  ),
  TeachingFlowDiagram: (props) => (
    <TeachingFlowDiagram
      variant={String(props.variant ?? "") as TeachingFlowDiagramVariant}
    />
  ),
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  table: (props) => (
    <div className="lesson-table-scroll">
      <table {...props} />
    </div>
  ),
  th: (props) => <th {...props} />,
  td: (props) => <td {...props} />,
  blockquote: (props) => <blockquote {...props} />,
};
