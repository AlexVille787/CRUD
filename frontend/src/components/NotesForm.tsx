import React, { useState } from "react";

interface NotesFormProps {
  onAdd: (content: string) => void;
}

export const NotesForm: React.FC<NotesFormProps> = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Текст заметки не может быть пустым");
      return;
    }
    onAdd(content.trim());
    setContent("");
    setError("");
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <label htmlFor="note-input">New Note</label>
      <div className="form-input-wrapper">
        <textarea
          id="note-input"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError("");
          }}
          placeholder="Введите текст заметки..."
        />
        <button type="submit" className="submit-btn" aria-label="Добавить">
          ➤
        </button>
      </div>
      {error && <span className="error-text">{error}</span>}
    </form>
  );
};
