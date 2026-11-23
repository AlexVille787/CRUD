import { useState, useEffect, useCallback } from "react";
import { Note } from "./types";
import { NotesList } from "./components/NotesList";
import { NotesForm } from "./components/NotesForm";
import "./App.css";

const API_URL = "http://localhost:7070/notes";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (content: string) => {
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: 0, content }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении заметки");
      }

      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  const handleDeleteNote = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении заметки");
      }

      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Notes</h1>
        <button
          className="refresh-btn"
          onClick={fetchNotes}
          disabled={isLoading}
          aria-label="Обновить список"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
        </button>
      </header>

      {error && <div className="error-banner">Ошибка: {error}</div>}

      {isLoading && notes.length === 0 ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <NotesList notes={notes} onDelete={handleDeleteNote} />
      )}

      <NotesForm onAdd={handleAddNote} />
    </div>
  );
}

export default App;
