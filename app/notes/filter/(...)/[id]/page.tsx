import { fetchNoteById } from "@/lib/api";
import InterceptedNote from "./InterceptedNote.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log("🔍 Intercepting route - ID:", id);
  const tags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  if (tags.includes(id)) {
    return null;
  }
  const note = await fetchNoteById(id);
  return <InterceptedNote note={note} />;
}
