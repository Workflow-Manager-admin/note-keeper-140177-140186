import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";

const API_BASE_URL = "http://localhost:3001/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch all notes, optionally by search
  const fetchNotes = useCallback(async (search = "") => {
    setIsLoadingNotes(true);
    setError(null);
    try {
      const resp = await axios.get(`${API_BASE_URL}/notes/`, { params: search ? { search } : {} });
      setNotes(resp.data);
      if (resp.data.length > 0) {
        // Keep selection if still valid, else select first note
        if (!resp.data.some(n => n.id === selectedId)) {
          setSelectedId(resp.data[0].id);
        }
      } else {
        setSelectedId(null);
      }
    } catch (e) {
      setError("Error loading notes.");
    } finally {
      setIsLoadingNotes(false);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchNotes(searchTerm);
  }, [fetchNotes, searchTerm]);

  // CRUD operations
  const handleSelectNote = (id) => {
    setSelectedId(id);
  };

  const handleCreateNote = async () => {
    setSaving(true);
    try {
      const resp = await axios.post(`${API_BASE_URL}/notes/`, {
        title: "Untitled Note",
        content: ""
      });
      await fetchNotes(searchTerm);
      setSelectedId(resp.data.id);
    } catch {
      setError("Failed to create note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (id) => {
    setSaving(true);
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}/`);
      await fetchNotes(searchTerm);
      // On delete, if selected, move to first note
      if (selectedId === id && notes.length > 1) {
        const idx = notes.findIndex(n => n.id === id);
        if (notes[idx + 1]) setSelectedId(notes[idx + 1].id);
        else if (notes[idx - 1]) setSelectedId(notes[idx - 1].id);
        else setSelectedId(null);
      } else if (notes.length === 1) {
        setSelectedId(null);
      }
    } catch {
      setError("Failed to delete note.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateNote = async (id, data) => {
    setSaving(true);
    try {
      await axios.put(`${API_BASE_URL}/notes/${id}/`, data);
      await fetchNotes(searchTerm);
    } catch {
      setError("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
  };

  const selectedNote = notes.find(note => note.id === selectedId);

  return (
    <div className="app-container">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div className="sidebar-main-wrapper">
        <Sidebar
          notes={notes}
          selectedId={selectedId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
          isLoading={isLoadingNotes}
          saving={saving}
        />
        <main className="main">
          <div className="main-inner">
            <NoteEditor
              note={selectedNote}
              onDelete={handleDeleteNote}
              onSave={handleUpdateNote}
              saving={saving}
              isEmptyList={notes.length === 0}
            />
            {error && (
              <div style={{ color: "#ff4081", marginTop: 10, fontWeight: 500 }}>
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
