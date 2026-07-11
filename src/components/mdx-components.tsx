import type { MDXComponents } from "mdx/types";
import { codeToTokens } from "shiki";
import { BoxModelDiagram } from "@/components/box-model-diagram";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import {
  TeachingFlowDiagram,
  type TeachingFlowDiagramVariant,
} from "@/components/teaching-flow-diagram";

type CodeChangeProps = {
  code?: string;
  highlightLines?: string;
};

async function CodeChange({ code = "", highlightLines = "" }: CodeChangeProps) {
  const normalizedCode = code.replaceAll("\\n", "\n");
  const lines = normalizedCode.split("\n");
  const highlightedLines = new Set(
    highlightLines
      .split(",")
      .map((line) => Number.parseInt(line, 10))
      .filter(Number.isFinite),
  );
  const { tokens } = await codeToTokens(normalizedCode, {
    lang: "tsx",
    theme: "dark-plus",
  });

  return (
    <pre className="lesson-code-change">
      <code>
        {lines.map((line, index) => {
          const isAdded = highlightedLines.has(index + 1);
          const lineTokens = tokens[index] ?? [];

          return (
            <span
              className={`lesson-code-change__line${
                isAdded ? " lesson-code-change__line--added" : ""
              }`}
              key={`${index}-${line}`}
              style={{
                background: isAdded
                  ? "rgba(115, 201, 145, 0.18)"
                  : undefined,
                display: "grid",
                gridTemplateColumns: "1.25rem max-content",
                minWidth: "100%",
              }}
            >
              <span
                aria-hidden="true"
                className="lesson-code-change__marker"
                style={{
                  color: isAdded ? "var(--success)" : "transparent",
                  fontWeight: isAdded ? 700 : undefined,
                  userSelect: "none",
                }}
              >
                {isAdded ? "+" : " "}
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
