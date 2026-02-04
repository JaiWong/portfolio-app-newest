import React, { useEffect, useRef, useState } from "react";
import "./App.css";



import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ArtDesigns from "./components/ArtDesigns";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";


export default function App() {
  const [mode, setMode] = useState("good"); // good | evil | very-evil
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const [shaking, setShaking] = useState(false);
  const canvasRef = useRef(null);
  const speedRef = useRef(0.6);

  const cycleMode = () => {
    setMode(m => (m === "good" ? "evil" : m === "evil" ? "very-evil" : "good"));
  };

  const triggerEyes = () => {
    setShowEyes(true);
    setShaking(true);
    setTimeout(() => {
      setShowEyes(false);
      setShaking(false);
      setMode("very-evil");
    }, 2000);
  };

  // Canvas code rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(0).map(() => Math.random() * height);

    let running = true;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * height);
    }
    window.addEventListener("resize", resize);

    function draw() {
      if (!running) return;
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i];
        ctx.fillStyle = mode === "good"
  ? "rgba(120,180,120,0.35)"
  : "rgba(255,80,80,0.35)";
        const chr = String.fromCharCode(33 + Math.floor(Math.random() * 90));
        ctx.fillText(chr, x, y);
        drops[i] = y > height ? 0 : y + speedRef.current + Math.random() * 1.3;
      }
      requestAnimationFrame(draw);
    }

    const onMouseDown = (e) => { if (e.shiftKey) speedRef.current = 8; };
    const onMouseUp = () => { speedRef.current = 2; };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    draw();

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mode]);

  const themeClass = mode === "very-evil" ? "very-evil-mode" : mode === "evil" ? "evil-mode" : "good-mode";
  const eyeUrl = "https://th.bing.com/th/id/OIP.9ZMPRIBfEY-QMWTMKj_WZgAAAA?w=186&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

  return (
  <div className={`app ${themeClass} ${shaking ? "shaking" : ""}`}>

    {showEyes && (
      <div className="eyes-overlay">
        <img className="eye-img" src={eyeUrl} alt="eye" />
      </div>
    )}

    <canvas ref={canvasRef} className="code-rain-canvas" />

    <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

    <Routes>
      <Route
        path="/"
        element={
          <main className="main">
            <Hero />
            <About />
            <Projects />
            <ArtDesigns />
            <Contact />
          </main>
        }
      />

      <Route path="/certificates" element={<Certificates />} />
    </Routes>

    <div className="control-row">
      <button className="cta-btn" onClick={cycleMode}>
        Toggle Mode ({mode})
      </button>
      <button className="cta-btn evil-btn" onClick={triggerEyes}>
        EVIL BUTTON
      </button>
    </div>

    <footer className="footer">
      <small>© {new Date().getFullYear()} Jairus Wong — Portfolio</small>
    </footer>

  </div>
);}