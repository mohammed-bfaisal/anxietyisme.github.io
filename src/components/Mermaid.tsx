"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "light" ? "default" : "dark",
      securityLevel: "loose",
    });

    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    mermaid
      .render(id, chart)
      .then(({ svg: renderedSvg }) => {
        if (!cancelled) setSvg(renderedSvg);
      })
      .catch((err) => {
        console.error("Mermaid rendering error:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  return (
    <div
      className="mermaid-panel"
      style={{ display: "flex", justifyContent: "center", padding: "1.5rem", overflowX: "auto" }}
      dangerouslySetInnerHTML={{
        __html: svg || "<p style='color:var(--text3);font-size:13px'>Rendering diagram…</p>",
      }}
    />
  );
}
