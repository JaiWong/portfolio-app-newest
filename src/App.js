import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navElevated, setNavElevated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [manualOverride, setManualOverride] = useState(false);
  const canvasRef = useRef(null);
  const speedRef = useRef(0.6);
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  // Determine time of day and the default mode for it
  function getTimeOfDayAndDefaultMode() {
    const hr = new Date().getHours();
    if (hr >= 6 && hr < 12) return { tod: 'Morning', mode: 'good' };
    if (hr >= 12 && hr < 18) return { tod: 'Afternoon', mode: 'good' };
    if (hr >= 18 && hr < 22) return { tod: 'Evening', mode: 'evil' };
    return { tod: 'Night', mode: 'evil' };
  }

  const cycleMode = () => {
    // manual override prevents automatic time-based changes from immediately overwriting user choice
    setManualOverride(true);
    setMode(m => (m === "good" ? "evil" : m === "evil" ? "very-evil" : "good"));
  };

  const triggerEyes = () => {
    setShowEyes(true);
    setShaking(true);
    setManualOverride(true);
    setTimeout(() => {
      setShowEyes(false);
      setShaking(false);
      setMode("very-evil");
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  // Set initial mode based on time of day and keep it updated (unless user manually overrides)
  useEffect(() => {
    const applyTimeMode = () => {
      const { tod, mode: defaultMode } = getTimeOfDayAndDefaultMode();
      setTimeOfDay(tod);
      if (!manualOverride) setMode(defaultMode);
    };

    // apply immediately and then update every minute
    applyTimeMode();
    const timer = setInterval(applyTimeMode, 60 * 1000);
    return () => clearInterval(timer);
  }, [manualOverride]);

  // Initialize Locomotive Scroll
  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        class: 'is-reveal',
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        }
      });

      return () => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.destroy();
        }
      };
    }
  }, [isLoading]);

  // Show/hide back to top button & navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setShowBackToTop(y > 300);
      setNavElevated(y > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Particle Network Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    let running = true;

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.2;
          this.vy -= Math.sin(angle) * force * 0.2;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(width, this.x));
        this.y = Math.max(0, Math.min(height, this.y));
      }

      draw() {
        ctx.beginPath();
        // Pulse the radius when the mouse is nearby for a hover effect
        let r = this.radius;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const influence = 1 - dist / mouse.radius;
            const pulse = 0.6 * Math.sin(performance.now() / 120) * influence;
            r = Math.max(0.5, this.radius * (1 + pulse));
          }
        }
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = mode === "good"
          ? "rgba(255,155,69,0.9)"
          : "rgba(255, 80, 80, 0.6)";
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.floor((width * height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const newCount = Math.floor((width * height) / 15000);
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = mode === "good"
              ? `rgba(255,155,69, ${0.15 * (1 - distance / 120)})`
              : `rgba(255, 80, 80, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!running) return;
      
      ctx.fillStyle = mode === "good" 
        ? "rgba(250, 245, 238, 0.1)" 
        : "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    animate();

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [mode]);

  const themeClass = mode === "very-evil" ? "very-evil-mode" : mode === "evil" ? "evil-mode" : "good-mode";
  const eyeUrl = "https://th.bing.com/th/id/OIP.9ZMPRIBfEY-QMWTMKj_WZgAAAA?w=186&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3";

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <h1 className="loading-title">Jairus Wong</h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${themeClass} ${shaking ? "shaking" : ""}`}>

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div ref={scrollRef} data-scroll-container>

        {showEyes && (
          <div className="eyes-overlay">
            <img className="eye-img" src={eyeUrl} alt="eye" />
          </div>
        )}

        <canvas ref={canvasRef} className="code-rain-canvas" />

        <Routes>
          <Route
            path="/"
            element={
              <main className="main" data-scroll-section>
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

        <div className="control-row" data-scroll-section>
          <button className="cta-btn" onClick={cycleMode}>
            Toggle Mode ({mode})
          </button>
          <button className="cta-btn evil-btn" onClick={triggerEyes}>
            EVIL BUTTON
          </button>

          <div className="time-mode-info" aria-live="polite">
            <strong>Time of day:</strong> {timeOfDay || '—'} — <strong>{mode.toUpperCase()}</strong>
            {manualOverride ? ' (manually selected)' : ' (activated by default)'}
          </div>
        </div>

        <footer className="footer" data-scroll-section>
          <small>© {new Date().getFullYear()} Jairus Wong — Portfolio</small>
        </footer>

        {showBackToTop && (
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            ↑
          </button>
        )}

      </div>
    </div>
  );}