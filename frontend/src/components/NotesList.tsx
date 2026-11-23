import React from "react";
import { Note } from "../types";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) {
    return <p className="empty-message">Заметок пока нет...</p>;
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};
