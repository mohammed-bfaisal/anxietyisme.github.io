export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        marginTop: "4rem",
        padding: "1.5rem 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "12px",
        fontFamily: "var(--mono)",
        color: "var(--text3)",
      }}
    >
      <span>© {new Date().getFullYear()} Aniket</span>
      <div style={{ display: "flex", gap: "1rem" }}>
        <a
          href="https://github.com/anxietyisme"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          github
        </a>
      </div>
    </footer>
  );
}
