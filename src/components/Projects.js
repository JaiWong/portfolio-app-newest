import React, { useState } from "react";

function Project({ title, desc, image, link, embedSrc }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="project-card" onClick={() => setOpen(true)}>
        {/* show image if provided, otherwise show a non-interactive iframe preview for embedded prototypes */}
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          embedSrc && (
            <iframe
              className="project-thumb-iframe"
              src={embedSrc}
              title={`${title} preview`}
              width="100%"
              height="180"
              style={{ border: '1px solid rgba(0,0,0,0.08)' }}
              aria-hidden="true"
            />
          )
        )}

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

            {/* Render embed if provided */}
            {embedSrc && (
              <div className="iframe-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <iframe
                  src={embedSrc}
                  title={title}
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                  width="800"
                  height="450"
                  allowFullScreen
                ></iframe>
              </div>
            )}

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
    {
      title: "Figma Embedded Prototype",
      desc: "Interactive prototype embedded directly from Figma.",
      embedSrc: "https://embed.figma.com/proto/2EB53aMEfwd4NQUhXtuzZS/CA-FINAL?node-id=3-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A2&embed-host=share"
    },
    {
      title: "Figma Design File",
      desc: "Design source file embedded from Figma (view-only).",
      embedSrc: "https://embed.figma.com/design/2EB53aMEfwd4NQUhXtuzZS/CA-FINAL?node-id=76-182&embed-host=share"
    },
    {
      title: "CA-2 Web App",
      desc: "A deployed CA-2 project hosted on Vercel. Live demo with responsive layout and features preview.",
      image: "images/ca2-thumbnail.svg",
      link: "https://ca-2-c219-gzm6.vercel.app/",
    }
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
