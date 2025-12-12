import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;
  const rawTag = slug[0];
  const normalizedTag = rawTag === "all"
    ? undefined
    : rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();
  const response = await fetchNotes({ tag: normalizedTag });

  return (
    <div>
      <h1>Notes List</h1>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};

export default NotesByTag;
