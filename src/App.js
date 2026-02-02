import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="navbar">
      <div className="logo">Jairus Wong</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
        <a href="#art" onClick={() => setMenuOpen(false)}>Art & Designs</a>
        <a href="/certificates.html" onClick={() => setMenuOpen(false)}>Certificates</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
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

function Hero() {
  return (
    <section id="home" className="text-panel hero-panel">
      <h1>Hello, I'm <span className="my-name">Jairus Wong</span></h1>
      <h2 className="subtitle">Developer • Designer • Student</h2>
      <p className="lead">I build clean interfaces, modern apps, and high-impact digital experiences.</p>
    </section>
  );
}

function Skill({ name, percent }) {
  return (
    <div className="skill">
      <label>{name}</label>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="text-panel">
      <h2>About Me</h2>
      <p>I'm a developer and designer passionate about UI/UX, coding, and creating beautiful digital projects.</p>

      <h3>Skills</h3>
      <div className="skills-grid">
        <Skill name="React" percent={85} />
        <Skill name="UI/UX" percent={75} />
        <Skill name="JavaScript" percent={90} />
        <Skill name="CSS & Animations" percent={80} />
      </div>
    </section>
  );
}

function Project({ title, desc, image, link }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="project-card">
        <img src={image} alt={title} onClick={() => setOpen(true)} />
        <h3>{title}</h3>
        <p className="proj-desc">{desc}</p>
      </article>

      {open && (
        <div className="expanded-content">
          <button className="close-btn" onClick={() => setOpen(false)}>Close</button>

          {image  && <img src={image} alt={title} className="expanded-img" />}
          {link && (
            <a className="view-btn" href={link} target="_blank" rel="noreferrer">
              View Project →
            </a>
          )}
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
)}

    </>
  );
}

function Projects() {
  const list = [
    {
      title: "Figma Web App Prototype",
      desc: "A polished, high-fidelity mobile app prototype created in Figma, showcasing clean UI components, proper auto-layout usage, and smooth interactive flows.",
      image: "figma-uiux.png",
      link: "https://www.figma.com/proto/YJRgoD4P5obXbaa4i9UV6o/Hifi?node-id=0-1",
    },
    {
      title: "Pizza Store Web App",
      desc: "A React + Vercel pizza ordering web application featuring dynamic pages, modern UI, and responsive design.",
      image: "pizzaApp.png",
      link: "https://pizza-store-six-dusky.vercel.app/",
    },
  ];

  return (
    <section id="projects" className="text-panel">
      <h2>Projects</h2>
      <div className="project-grid">
        {list.map((p, i) => <Project key={i} {...p} />)}
      </div>
    </section>
  );
}

export function ArtDesigns() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const artworks = [
    {
      title: "Animation",
      video: "/sotong-animation.mp4",
      description: `A stylized digital illustration exploring animation. (view more art by me at: <a href="https://instagram.com/jaisticles" target="_blank" rel="noreferrer">@jaisticles</a>)`
    },
    {
      title: "Typography Design Submission",
      image: "colour-typography.png",
      pdf: "/L10JairusWongTypography.pdf",
      description: "A study on Colour Theory and Typography."
    },
    {
      title: "Hypotethical Portfolio Design",
      image: "portfolioH.png",
      pdf: "portfolio-hypothetical.pdf",
      description:
        "An imaginative portfolio concept piece that reinterprets personal branding through experimental layout, visual hierarchy, and modern digital design language."
    },
    {
      title: "Character Designs",
      image: "characterD.png",
      pdf: "CharacterDesign.pdf",
      description:
        "An imaginative portfolio concept piece that reinterprets personal branding through experimental layout, visual hierarchy, and modern digital design language."
    },
    {
      title: "Logo Design",
      image: "LogoD.png",
      pdf: "LogoD.pdf",
      description: "A clean Logo Design showcasing the fundamentals of Adobe Illustrator."
    },
    {
      title: "Sticker Designs",
      image: "StickerD.png",
      pdf: "StickerD.pdf",
      description:
        "A clean series of sticker Designs based off my original characters that can be used to convey emotions in text."
    }
  ];

  const openCard = (i) => setSelectedIndex(i);
  const closeCard = () => setSelectedIndex(null);

  return (
    <section id="art" className="text-panel">
      <h2>Art & Designs</h2>

      <div className="project-grid">
        {artworks.map((art, i) => {
          const isOpen = selectedIndex === i;

          return (
            <div key={i} className={`project-card ${isOpen ? "expanded" : ""}`}>

              {/* Thumbnail */}
              {!isOpen && (
                <>
                  {art.image && <img src={art.image} alt={art.title} />}
                  {art.video && (
                    
                  <video src={art.video} className="proj-video" controls autoPlay muted />

                  )}
                </>
              )}

              <h3>{art.title}</h3>

              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: art.description }}
              />

              {/* View button */}
              {!isOpen && (
                <button className="open-btn" onClick={() => { console.log("Clicked View"); openCard(i)}}>
                  View
                </button>
              )}

              
                {/* Expanded modal */}
                {isOpen && (
                  <div className="expanded-content">
                    {/* Video viewer */}
                    {art.video && (
                      <video
                        src={art.video}
                        className="proj-video"
                        controls
                        autoPlay
                      />
                    )}
                    {/* PDF viewer */}
                    {art.pdf && (
                      <iframe
                        src={art.pdf}
                        className="pdf-viewer"
                        title={`${art.title} PDF Preview`}
                      />
                    )}

                    {/* Image viewer */}
                    {art.image && (
                      <img
                        src={art.image}
                        alt={art.title}
                        className="expanded-img"
                      />
                    )}

                    <button className="close-btn" onClick={closeCard}>
                      Close
                    </button>
                  </div>

              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}




function Contact() {
  return (
    <section id="contact" className="text-panel">
      <h2>Contact</h2>

      <p>Email: <a href="mailto:24001954@myrp.edu.sg">24001954@myrp.edu.sg</a></p>

      <div className="contact-icons">
        <a href="https://instagram.com/jaisticles" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>

        <a href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer">
          <i className="fab fa-github"></i>
        </a>

        <a href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </section>
  );
}


export default function App() {
  const [mode, setMode] = useState("good"); // "good" | "evil" | "very-evil"
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEyes, setShowEyes] = useState(false);
  const [shaking, setShaking] = useState(false);
  const canvasRef = useRef(null);
  const speedRef = useRef(2);

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
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i];
        ctx.fillStyle = mode === "good" 
          ? Math.random() > 0.93 ? "#ffffff" : "#8fc04a"
          : Math.random() > 0.93 ? "#ffffff" : "#ff3333";
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
        <div className="eyes-overlay" aria-hidden="true">
          <img className="eye-img" src={eyeUrl} alt="eye" />
        </div>
      )}

      <canvas ref={canvasRef} className="code-rain-canvas" />

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="main">
        <Hero />
        <About />
        <Projects />
        <ArtDesigns />
        <Contact />
      </main>

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
  );
}
