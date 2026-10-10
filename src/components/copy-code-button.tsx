"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyCodeButtonProps = {
  code?: string;
};

function readCodeFromBlock(button: HTMLButtonElement) {
  const code = button.closest(".code-block")?.querySelector("code");

  if (!code) {
    return "";
  }

  const lines = code.querySelectorAll("[data-line]");
  const text =
    lines.length === 0
      ? (code.textContent ?? "").split("\n")
      : Array.from(lines, (line) => line.textContent ?? "");

  return text.map((line) => line.trimEnd()).join("\n");
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const text = code ?? readCodeFromBlock(event.currentTarget);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className="code-copy-button"
      onClick={handleClick}
      aria-label={copied ? "คัดลอกโค้ดแล้ว" : "คัดลอกโค้ด"}
    >
      {copied ? (
        <Check size={14} aria-hidden="true" />
      ) : (
        <Copy size={14} aria-hidden="true" />
      )}
      <span>{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
    </button>
  );
}
