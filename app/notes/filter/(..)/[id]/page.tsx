import { fetchNoteById } from "@/lib/api";
import InterceptedNote from "./InterceptedNote.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  console.log(3333333);
  const { id } = await params;
  console.log(id);
  const normalizedId = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
  const tags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  if (tags.includes(normalizedId) || id === "all") {
    return null;
  }

  console.log(4444444);
  const note = await fetchNoteById(id);
  return <InterceptedNote note={note} />;
}
