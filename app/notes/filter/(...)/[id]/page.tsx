import { fetchNoteById } from "@/lib/api";
import InterceptedNote from "./InterceptedNote.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const normalizedId = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
  const tags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  if (tags.includes(normalizedId) || id === "all") {
    return null;
  }
  const note = await fetchNoteById(id);
  return <InterceptedNote note={note} />;
}
