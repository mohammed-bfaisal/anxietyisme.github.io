"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/math",     label: "Math" },
  { href: "/physics",  label: "Physics" },
  { href: "/cs",       label: "CS" },
  { href: "/projects", label: "Projects" },
  { href: "/tags",     label: "Tags" },
  { href: "/about",    label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0 20px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            color: "var(--text)",
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "-0.02em",
            borderBottom: "none",
            flexShrink: 0,
          }}
        >
          anxiety
          <span style={{ color: "var(--text3)", fontWeight: 400, marginLeft: "0.35em" }}>
            / academic notebook
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: active ? "var(--text)" : "var(--text3)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  borderBottom: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = active ? "var(--text)" : "var(--text3)"; }}
              >
                {link.label}
              </Link>
            );
          })}
          <span style={{ marginLeft: "0.5rem" }}>
            <ThemeToggle />
          </span>
        </nav>

        {/* Mobile controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="show-mobile">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text3)",
              padding: "4px 7px",
              borderRadius: "4px",
              cursor: "pointer",
              lineHeight: 1,
              fontSize: "13px",
            }}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="show-mobile"
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--bg2)",
            padding: "0.75rem 20px 1rem",
          }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "0.5rem 0",
                  fontSize: "14px",
                  color: active ? "var(--text)" : "var(--text3)",
                  borderBottom: "none",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile   { display: none; }
        @media (max-width: 600px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
