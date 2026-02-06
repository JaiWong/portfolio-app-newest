import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-detail-header">
          <button className="back-btn" onClick={() => navigate("/#projects")}>
            ← Back to Projects
          </button>
        </div>
        <div className="project-detail-content">
          <p>Project not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <button className="back-btn" onClick={() => navigate("/#projects")}>
          ← Back to Projects
        </button>
      </div>

      <div className="project-detail-content">
        {/* Show image if provided */}
        {project.image && (
          <div className="project-detail-image">
            <img src={project.image} alt={project.title} />
          </div>
        )}

        {/* Title */}
        <h1 className="project-detail-title">{project.title}</h1>

        {/* Writeup */}
        <div className="project-detail-writeup">
          {project.writeup.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Embedded content if provided */}
        {project.embedSrc && (
          <div className="project-detail-embed">
            <h3>Interactive Preview</h3>
            <div className="iframe-wrap">
              <iframe
                src={project.embedSrc}
                title={project.title}
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                width="100%"
                height="600"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* External link */}
        {project.link && (
          <div className="project-link-section">
            <a className="view-btn" href={project.link} target="_blank" rel="noreferrer">
              🚀 View Live Project →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
