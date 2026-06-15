import type { MDXComponents } from "mdx/types";
import { BoxModelDiagram } from "@/components/box-model-diagram";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import {
  TeachingFlowDiagram,
  type TeachingFlowDiagramVariant,
} from "@/components/teaching-flow-diagram";

export const mdxComponents: MDXComponents = {
  BoxModelDiagram: () => <BoxModelDiagram />,
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
