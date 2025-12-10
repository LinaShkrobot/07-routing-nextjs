import { fetchNoteById } from "@/lib/api";
import InterceptedNote from "./InterceptedNote.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log("🔍 Intercepted route - ID:", id);
  const note = await fetchNoteById(id);

  return <InterceptedNote note={note} />;
}
