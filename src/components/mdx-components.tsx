import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  p: (props) => <p {...props} />,
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  table: (props) => <table {...props} />,
  th: (props) => <th {...props} />,
  td: (props) => <td {...props} />,
  blockquote: (props) => <blockquote {...props} />,
};
