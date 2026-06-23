import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search } from "@/components/Search";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { getRecentNotes } from "@/lib/mdx";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "anxiety — Notes",
    template: "%s | anxiety",
  },
  description:
    "Academic notes on mathematics, physics, and computer science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allNotes = getRecentNotes(1000).map((n) => ({
    slug: n.slug,
    category: n.category,
    title: n.frontmatter.title,
    description: n.frontmatter.description,
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <ScrollProgress />
          <BackToTop />
          <Search allNotes={allNotes} />
          <Navbar />
          <main
            style={{
              maxWidth: "var(--max)",
              margin: "0 auto",
              padding: "2.5rem 20px 0",
              minHeight: "calc(100vh - 48px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="fade-up" style={{ flex: 1 }}>
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
