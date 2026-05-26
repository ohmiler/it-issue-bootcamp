type ParentNode = {
  children?: MarkdownNode[];
};

type MarkdownNode = ParentNode & {
  type: string;
  lang?: string;
  value?: string;
};

type MdxAttribute = {
  type: "mdxJsxAttribute";
  name: string;
  value: string;
};

type MdxJsxFlowElement = {
  type: "mdxJsxFlowElement";
  name: "MermaidDiagram";
  attributes: MdxAttribute[];
  children: [];
};

const separatorLines = new Set(["|", "v", "V"]);

export function remarkDiagrams() {
  return (tree: MarkdownNode) => {
    visit(tree);
  };
}

function visit(node: MarkdownNode) {
  if (!node.children) {
    return;
  }

  node.children = node.children.map((child) => {
    if (child.type === "code" && typeof child.value === "string") {
      const chart = chartFromCodeFence(child);

      if (chart) {
        return createMermaidNode(chart);
      }
    }

    visit(child);
    return child;
  });
}

function chartFromCodeFence(node: MarkdownNode) {
  const language = node.lang?.toLowerCase();

  if (language === "mermaid") {
    return node.value?.trim() ?? "";
  }

  if (language !== "text" && language !== "txt" && language !== undefined) {
    return null;
  }

  const steps = parseFlowSteps(node.value ?? "");
  return steps ? stepsToMermaid(steps) : null;
}

function parseFlowSteps(value: string) {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const arrowLine = lines.find((line) => line.includes("->"));

  if (arrowLine) {
    const parts = arrowLine
      .split(/\s*->\s*/)
      .map((part) => part.trim())
      .filter(Boolean);

    return parts.length >= 2 ? parts : null;
  }

  if (!lines.some((line) => separatorLines.has(line))) {
    return null;
  }

  const steps = lines.filter((line) => !separatorLines.has(line));
  return steps.length >= 2 ? steps : null;
}

function stepsToMermaid(steps: string[]) {
  const nodeLines = steps.map(
    (step, index) => `  step${index}["${escapeMermaidLabel(step)}"]`,
  );
  const edgeLines = steps.slice(1).map((_, index) => `  step${index} --> step${index + 1}`);

  return ["flowchart LR", ...nodeLines, ...edgeLines].join("\n");
}

function escapeMermaidLabel(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function createMermaidNode(chart: string): MdxJsxFlowElement {
  return {
    type: "mdxJsxFlowElement",
    name: "MermaidDiagram",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "chart",
        value: chart,
      },
    ],
    children: [],
  };
}
