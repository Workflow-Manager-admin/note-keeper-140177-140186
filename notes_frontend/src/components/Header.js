import React from "react";

// PUBLIC_INTERFACE
function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <div style={{
        fontWeight: 700,
        fontSize: "1.16rem",
        color: "var(--primary)",
        marginRight: "24px",
        letterSpacing: "0.5px"
      }}>
        Notes App
      </div>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div style={{ width: 60, flex: "0 0 60px" }} />
    </header>
  );
}

export default Header;
