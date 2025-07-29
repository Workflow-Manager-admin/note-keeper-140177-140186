import React, { useState, useEffect } from "react";

// PUBLIC_INTERFACE
function NoteEditor({ note, onDelete, onSave, saving, isEmptyList }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setEdited(false);
  }, [note?.id]);

  if (isEmptyList) {
    return <div style={{
      marginTop: 54,
      textAlign: "center",
      color: "#888",
      fontSize: "1.18rem"
    }}>No note selected.<br />Click <span style={{ color: "var(--primary)" }}>+ New Note</span> to create your first note.</div>;
  }

  if (!note) {
    return <div style={{ marginTop: 54, textAlign: "center", color: "#aaa" }}>Select a note from the list.</div>;
  }

  const handleSave = () => {
    if (!onSave || !note.id) return;
    if (!title.trim()) {
      alert("Title cannot be empty.");
      return;
    }
    onSave(note.id, { title: title.trim(), content });
    setEdited(false);
  };

  const handleDelete = () => {
    if (!onDelete || !note.id) return;
    if (window.confirm("Delete this note permanently?")) {
      onDelete(note.id);
    }
  };

  const onChange = setter => e => {
    setter(e.target.value);
    setEdited(true);
  };

  return (
    <div>
      <div className="note-detail-header">
        <input
          className="note-title-input"
          value={title}
          placeholder="Note title"
          maxLength={255}
          onChange={onChange(setTitle)}
          disabled={saving}
          autoFocus
        />
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving || (!edited && (title === note.title && content === note.content))}
          >{saving ? "Saving..." : "Save"}</button>
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={saving}
            tabIndex={-1}
          >Delete</button>
        </div>
      </div>
      <textarea
        className="note-content-edit"
        value={content}
        onChange={onChange(setContent)}
        placeholder="Write your note here…"
        disabled={saving}
        rows={14}
        spellCheck={true}
      />
    </div>
  );
}

export default NoteEditor;
