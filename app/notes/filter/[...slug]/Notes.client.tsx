"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ tag }),
  });

  const notes = data?.notes ?? [];

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;

  return (
    <div>
      <h1>Notes List</h1>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
