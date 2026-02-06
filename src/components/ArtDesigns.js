import React, { useState } from "react";

export default function ArtDesigns() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const artworks = [
    { 
      title: "Animation", 
      video: "/sotong-animation.mp4", 
      description: "Digital animation work.",
      fullDescription: "A comprehensive digital animation project featuring character animation, motion design, and visual effects. This piece showcases creative storytelling through dynamic motion graphics.",
      instagramLink: "https://www.instagram.com/jairirus/"
    },
    { 
      title: "Typography", 
      image: "/colour-typography.png", 
      pdf: "/L10JairusWongTypography.pdf", 
      description: "Typography study.",
      fullDescription: "An in-depth exploration of typography principles, focusing on the relationship between color and type. This project demonstrates understanding of hierarchy, spacing, and visual impact through thoughtful typographic design."
    },
    { 
      title: "Portfolio Concept", 
      image: "/portfolioH.png", 
      pdf: "/portfolio-hypothetical.pdf", 
      description: "Experimental portfolio design.",
      fullDescription: "A hypothetical portfolio design exploring innovative layouts and user experience patterns. This concept showcases modern design trends, interactive elements, and a unique approach to personal branding."
    },
  ];

  const openCard = (i) => setSelectedIndex(i);
  const closeCard = () => setSelectedIndex(null);

  return (
    <section id="art" className="text-panel">
      <h2>Art & Designs</h2>
      <div className="project-grid">
        {artworks.map((art, i) => (
          <div key={i} className="project-card" onClick={() => openCard(i)}>
            {art.image && <img src={art.image} alt={art.title} loading="lazy" />}
            {art.video && <video src={art.video} className="proj-video" controls autoPlay muted loop />}
            <h3>{art.title}</h3>
            <p>{art.description}</p>
            <button className="open-btn" onClick={(e) => { e.stopPropagation(); openCard(i); }}>
              👁️ View Details
            </button>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <>
          <div className="modal-backdrop active" onClick={closeCard} />
          <div className="art-modal-overlay">
            <div className="art-modal-content">
              <button className="close-btn" onClick={closeCard}>✕ Close</button>
              {artworks[selectedIndex].image && (
                <img 
                  src={artworks[selectedIndex].image} 
                  className="expanded-img" 
                  alt={artworks[selectedIndex].title} 
                />
              )}
              {artworks[selectedIndex].video && (
                <video src={artworks[selectedIndex].video} controls autoPlay loop />
              )}
              <h3>{artworks[selectedIndex].title}</h3>
              <p className="art-full-description">
                {artworks[selectedIndex].fullDescription || artworks[selectedIndex].description}
              </p>
              {artworks[selectedIndex].pdf && (
                <a 
                  href={artworks[selectedIndex].pdf} 
                  className="view-btn" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  📄 Open PDF in New Tab
                </a>
              )}
              {artworks[selectedIndex].instagramLink && (
                <a 
                  href={artworks[selectedIndex].instagramLink} 
                  className="view-btn" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  📸 View on Instagram
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
