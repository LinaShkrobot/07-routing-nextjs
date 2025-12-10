import { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

type Props = {
  content: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

const NotesLayout = ({ content, sidebar, children }: Props) => {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{content}</div>
      {children}
    </div>
  );
};

export default NotesLayout;
