import React from "react";

export default function Navbar({ menuOpen, setMenuOpen, scrolled }) {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'open' : ''}`}>
      <a href="#home" className="logo" onClick={() => setMenuOpen(false)} aria-label="Home">Jairus Wong</a>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="/#art" onClick={() => setMenuOpen(false)}>Art & Designs</a>
        <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      <button
        className={`hamburger ${menuOpen ? "active" : ""}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
}

