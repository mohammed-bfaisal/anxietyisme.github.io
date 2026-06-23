import Link from "next/link";

interface NoteCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
  href: string;
  category?: string;
}

export function NoteCard({ title, date, tags, href, category }: NoteCardProps) {
  const chip = category || (tags && tags[0]) || "";

  return (
    <div className="note-row">
      {chip && <span className="note-chip">{chip}</span>}
      <Link href={href} className="note-title">
        {title}
      </Link>
      <time className="note-date">{date}</time>
    </div>
  );
}
