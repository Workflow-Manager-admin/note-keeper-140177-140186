import React from "react";

function getFirstLine(text) {
  if (!text) return "";
  return text.split("\n")[0];
}

function getTimeAgo(dateStr) {
  if (!dateStr) return "";
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000); // seconds
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

// PUBLIC_INTERFACE
function NoteListItem({ note, selected, onClick }) {
  const snippet = note.content
    ? note.content.split("\n")[0].slice(0, 32) + (note.content.length > 32 ? "…" : "")
    : "";

  return (
    <li
      className={`note-list-item${selected ? " selected" : ""}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      aria-label={note.title}
      style={{ userSelect: "none" }}
    >
      <div className="note-title">{note.title || <span style={{ color: "#c8c8c8" }}>Untitled</span>}</div>
      <span className="note-snippet">{snippet}</span>
      <span className="note-time">{getTimeAgo(note.updated_at || note.created_at)}</span>
    </li>
  );
}

export default NoteListItem;
