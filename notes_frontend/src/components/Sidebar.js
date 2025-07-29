import React from "react";
import NoteListItem from "./NoteListItem";

// PUBLIC_INTERFACE
function Sidebar({ notes, selectedId, onSelectNote, onCreateNote, isLoading, saving }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        My Notes
      </div>
      <ul className="note-list" aria-label="List of notes">
        {isLoading ? (
          <li style={{ padding: "18px 12px", color: "#bbb" }}>Loading...</li>
        ) : notes.length === 0 ? (
          <li style={{ padding: "18px 12px", color: "#bbb" }}>No notes found.</li>
        ) : notes.map(note =>
          <NoteListItem
            key={note.id}
            note={note}
            selected={note.id === selectedId}
            onClick={() => onSelectNote(note.id)}
          />
        )}
      </ul>
      <div className="sidebar-footer">
        <button
          className="add-btn"
          onClick={onCreateNote}
          disabled={saving}
          title="Add a new note"
        >
          + New Note
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
