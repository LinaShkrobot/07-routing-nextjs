"use client";

import css from "./Notes.client.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteList from "../../components/NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { toast, Toaster } from "react-hot-toast";
import ErrorPage from "./error";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const perPage = 12;

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
  });

  const notes = data?.notes ?? [];

  useEffect(() => {
    if (
      isSuccess &&
      !isLoading &&
      notes.length === 0 &&
      debouncedSearch.trim() !== ""
    ) {
      toast.error("No notes found for your request.");
    }
  }, [isSuccess, isLoading, notes.length, debouncedSearch]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox value={search} onChange={setSearch} />}
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
          {
            <button className={css.button} onClick={() => setIsModalOpen(true)}>
              Create note +
            </button>
          }
        </header>
        <Toaster />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {notes.length > 0 && <NoteList notes={notes} />}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onCancel={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </div>
    </>
  );
}
