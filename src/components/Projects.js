import React from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";

function Project({ id, title, desc, image, embedSrc }) {
  const navigate = useNavigate();

  return (
    <article 
      className="project-card" 
      onClick={() => navigate(`/project/${id}`)}
      style={{ cursor: 'pointer' }}
    >
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
  );
}

export default function Projects() {
  return (
    <section id="projects" className="text-panel">
      <h2>Projects</h2>
      <div className="project-grid">
        {projectsData.map((p, i) => <Project key={i} id={p.id} title={p.title} desc={p.desc} image={p.image} embedSrc={p.embedSrc} />)}
      </div>
    </section>
  );
}
