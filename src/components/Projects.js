import React, { useState } from "react";

function Project({ title, desc, image, link }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="project-card" onClick={() => setOpen(true)}>
        {image && <img src={image} alt={title} loading="lazy" />}
        <h3>{title}</h3>
        <p className="proj-desc">{desc}</p>
        <div className="card-overlay">
          <span className="view-text">Click to View</span>
        </div>
      </article>

      {open && (
        <>
          <div className="modal-backdrop" onClick={() => setOpen(false)} />
          <div className="expanded-content">
            <button className="close-btn" onClick={() => setOpen(false)}>✕ Close</button>
            {image && <img src={image} alt={title} className="expanded-img" />}
            <h3>{title}</h3>
            <p>{desc}</p>
            {link && (
              <a className="view-btn" href={link} target="_blank" rel="noreferrer">
                🚀 View Project →
              </a>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default function Projects() {
  const list = [
    {
      title: "Figma Web App Prototype",
      desc: "A polished, high-fidelity mobile app prototype created in Figma.",
      image: "figma-uiux.png",
      link: "https://www.figma.com/proto/YJRgoD4P5obXbaa4i9UV6o/Hifi?node-id=0-1",
    },
    {
      title: "Pizza Store Web App",
      desc: "A React + Vercel pizza ordering web application.",
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
