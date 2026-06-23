"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "next-themes";

interface DataChartProps {
  data: any[];
  type?: "line" | "bar" | "area";
  xKey: string;
  yKey: string;
  height?: number;
  color?: string;
}

export function DataChart({
  data,
  type = "line",
  xKey,
  yKey,
  height = 300,
  color,
}: DataChartProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        style={{
          height: `${height}px`,
          minHeight: 300,
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          margin: "1.5rem 0",
        }}
      />
    );
  }
  const isDark = resolvedTheme !== "light";

  const lineColor   = color ?? (isDark ? "#c9b97a" : "#8b6914");
  const gridColor   = isDark ? "#2e2e2c" : "#d4d4ce";
  const textColor   = isDark ? "#6b6a66" : "#8a8a82";
  const tooltipBg   = isDark ? "#1a1a18" : "#f3f3f0";
  const tooltipBorder = isDark ? "#2e2e2c" : "#d4d4ce";
  const tooltipText = isDark ? "#edece8" : "#1a1a18";

  const commonProps = {
    data,
    margin: { top: 4, right: 4, left: -16, bottom: 0 },
  };

  const axisStyle = { stroke: textColor, tick: { fill: textColor, fontSize: 12 } };

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      color: tooltipText,
      fontSize: 12,
      borderRadius: 6,
    },
  };

  return (
    <div
      style={{
        height: `${height}px`,
        minHeight: 300,
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1rem",
        margin: "1.5rem 0",
      }}
    >
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        {type === "line" ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip {...tooltipStyle} />
            <Line
              type="monotone"
              dataKey={yKey}
              stroke={lineColor}
              strokeWidth={2}
              dot={{ r: 3, fill: lineColor }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        ) : type === "area" ? (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip {...tooltipStyle} />
            <Area
              type="monotone"
              dataKey={yKey}
              stroke={lineColor}
              fill={lineColor}
              fillOpacity={0.15}
            />
          </AreaChart>
        ) : (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} {...axisStyle} />
            <YAxis {...axisStyle} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey={yKey} fill={lineColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
