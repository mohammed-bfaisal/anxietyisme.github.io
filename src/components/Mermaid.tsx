"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>("");
  const idRef = useRef(`mermaid-${Math.random().toString(36).substring(2, 9)}`);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme !== "light";

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      themeVariables: isDark
        ? {
            background: "#1a1a18",
            primaryColor: "#222220",
            primaryBorderColor: "#c9b97a",
            primaryTextColor: "#edece8",
            lineColor: "#6b6a66",
            edgeLabelBackground: "#1a1a18",
          }
        : {
            background: "#f3f3f0",
            primaryColor: "#eaeae6",
            primaryBorderColor: "#8b6914",
            primaryTextColor: "#1a1a18",
            lineColor: "#8a8a82",
            edgeLabelBackground: "#f3f3f0",
          },
      securityLevel: "loose",
    });

    let cancelled = false;

    const renderChart = async () => {
      try {
        const id = `${idRef.current}-${Date.now()}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(renderedSvg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        if (!cancelled) setSvg(`<p style="color:var(--text3);font-size:13px">Could not render diagram.</p>`);
      }
    };

    renderChart();
    return () => { cancelled = true; };
  }, [chart, theme, systemTheme]);

  return (
    <div
      className="mermaid-panel"
      style={{ display: "flex", justifyContent: "center", padding: "1.5rem", overflowX: "auto" }}
      dangerouslySetInnerHTML={{ __html: svg || "<p style='color:var(--text3);font-size:13px'>Rendering diagram…</p>" }}
    />
  );
}
