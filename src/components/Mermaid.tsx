"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        background: "#1a1a18",
        primaryColor: "#222220",
        primaryBorderColor: "#c9b97a",
        primaryTextColor: "#edece8",
        lineColor: "#6b6a66",
        edgeLabelBackground: "#1a1a18",
        tertiaryColor: "#222220",
        ...(currentTheme === "light" ? {
          background: "#f3f3f0",
          primaryColor: "#eaeae6",
          primaryBorderColor: "#8b6914",
          primaryTextColor: "#1a1a18",
          lineColor: "#8a8a82",
          edgeLabelBackground: "#f3f3f0",
          tertiaryColor: "#eaeae6",
        } : {}),
      },
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
          const { svg: renderedSvg } = await mermaid.render(id, chart);
          setSvg(renderedSvg);
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        setSvg(`<div class="text-red-500 bg-red-500/10 p-4 rounded-md">Error rendering diagram</div>`);
      }
    };

    renderChart();
  }, [chart, theme, systemTheme]);

  return (
    <div
      className="mermaid-panel"
      style={{ display: "flex", justifyContent: "center", padding: "1.5rem" }}
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg || "<div style='color:var(--text3);font-size:13px'>Rendering diagram…</div>" }}
    />
  );
}
