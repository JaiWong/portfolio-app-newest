import React, { useState } from "react";

export default function ArtDesigns() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const artworks = [
    { title: "Animation", video: "/sotong-animation.mp4", description: "Digital animation work." },
    { title: "Typography", image: "colour-typography.png", pdf: "/L10JairusWongTypography.pdf", description: "Typography study." },
    { title: "Portfolio Concept", image: "portfolioH.png", pdf: "portfolio-hypothetical.pdf", description: "Experimental portfolio design." },
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
              {!isOpen && (
                <>
                  {art.image && <img src={art.image} alt={art.title} />}
                  {art.video && <video src={art.video} className="proj-video" controls autoPlay muted />}
                </>
              )}
              <h3>{art.title}</h3>
              <p>{art.description}</p>
              {!isOpen && <button className="open-btn" onClick={() => openCard(i)}>View</button>}
              {isOpen && (
                <div className="expanded-content">
                  {art.image && <img src={art.image} className="expanded-img" alt={art.title} />}
                  {art.video && <video src={art.video} controls autoPlay />}
                  {art.pdf && <iframe src={art.pdf} className="pdf-viewer" title={`${art.title} PDF`} />}
                  <button className="close-btn" onClick={closeCard}>Close</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
