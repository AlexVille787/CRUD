import React from "react";
import { Note } from "../types";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  return (
    <div className="note-card">
      <button
        className="delete-btn"
        onClick={() => onDelete(note.id)}
        aria-label="Удалить заметку"
      >
        ✕
      </button>
      <p>{note.content}</p>
    </div>
  );
};
