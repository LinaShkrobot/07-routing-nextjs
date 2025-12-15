"use client";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { Note } from "@/types/note";

interface InterceptedNoteProps {
  note: Note;
}

export default function InterceptedNote({ note }: InterceptedNoteProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  console.log(11111);

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}
