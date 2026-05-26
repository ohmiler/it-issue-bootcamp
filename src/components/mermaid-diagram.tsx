"use client";

import { useEffect, useId, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            padding: 16,
          },
          sequence: {
            actorMargin: 56,
            diagramMarginY: 16,
            messageMargin: 34,
            mirrorActors: false,
          },
          fontFamily:
            "IBM Plex Sans Thai, Segoe UI, Arial, Helvetica, sans-serif",
          themeVariables: {
            background: "#1e1e1e",
            primaryColor: "#252526",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#3c3c3c",
            secondaryColor: "#2a2d2e",
            secondaryTextColor: "#d4d4d4",
            secondaryBorderColor: "#3c3c3c",
            tertiaryColor: "#1e1e1e",
            tertiaryTextColor: "#d4d4d4",
            tertiaryBorderColor: "#3c3c3c",
            lineColor: "#3794ff",
            textColor: "#d4d4d4",
            mainBkg: "#252526",
            nodeBorder: "#3c3c3c",
            clusterBkg: "#252526",
            clusterBorder: "#3c3c3c",
            edgeLabelBackground: "#1e1e1e",
            actorBkg: "#252526",
            actorBorder: "#3c3c3c",
            actorTextColor: "#ffffff",
            actorLineColor: "#3c3c3c",
            labelBoxBkgColor: "#252526",
            labelBoxBorderColor: "#3c3c3c",
            signalColor: "#d4d4d4",
            activationBkgColor: "#264f78",
            activationBorderColor: "#3794ff",
            sequenceNumberColor: "#ffffff",
          },
        });

        const result = await mermaid.render(diagramId, chart);

        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      } catch (renderError) {
        if (!cancelled) {
          setSvg("");
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Unable to render diagram",
          );
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  return (
    <figure className="mermaid-diagram">
      {svg ? (
        <div
          className="mermaid-diagram__svg"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <pre className="mermaid-diagram__fallback">
          <code>{chart}</code>
        </pre>
      )}
      {error ? <figcaption>{error}</figcaption> : null}
    </figure>
  );
}
