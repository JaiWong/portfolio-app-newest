import React, { useState } from "react";

const certificateData = {
  "Web Development": [
    { name: "React - Hands-On Introduction", file: "CertificateOfCompletion_HandsOn Introduction React.pdf" },
    { name: "React - Hands-On Introduction (Advanced)", file: "CertificateOfCompletion_HandsOn Introduction React (1).pdf" },
    { name: "React Basic Certificate", file: "react_basic certificate.pdf" },
    { name: "Node.js Essential Training", file: "CertificateOfCompletion_Node.js Essential Training.pdf" },
    { name: "JavaScript - Enhancing the DOM", file: "CertificateOfCompletion_JavaScript Enhancing the DOM.pdf" },
    { name: "CSS Certificate", file: "css certificate.pdf" },
    { name: "Bootstrap Templates - Quick & Clean Website", file: "CertificateOfCompletion_Create a Quick Clean and Cheap Website with Bootstrap Templates.pdf" },
    { name: "Programming Foundations - APIs & Web Services", file: "CertificateOfCompletion_Programming Foundations APIs and Web Services 2019.pdf" }
  ],
  "Design & Creative": [
    { name: "Adobe Illustrator 2023 Quick Start", file: "CertificateOfCompletion_Illustrator 2023 Quick Start.pdf" },
    { name: "Adobe Photoshop 2021 Quick Start", file: "CertificateOfCompletion_Photoshop 2021 Quick Start.pdf" },
    { name: "UX Design - Creating Personas", file: "CertificateOfCompletion_UX Design 3 Creating Personas.pdf" }
  ],
  "Software Testing": [
    { name: "ISTQB Foundation Certification Prep", file: "CertificateOfCompletion_ISTQB Foundation Cert Prep.pdf" },
    { name: "Software Testing - Bug Writing & Management", file: "CertificateOfCompletion_Software Testing Foundations Bug Writing and Management.pdf" },
    { name: "Software Testing - Test Planning", file: "CertificateOfCompletion_Software Testing Foundations Test Planning.pdf" },
    { name: "Software Testing - Test Techniques", file: "CertificateOfCompletion_Software Testing Foundations Test Techniques.pdf" },
    { name: "Unit Testing & TDD in Python", file: "CertificateOfCompletion_Unit Testing and Test Driven Development in Python.pdf" }
  ],
  "Project Management": [
    { name: "Agile Foundations", file: "CertificateOfCompletion_Agile Foundations.pdf" },
    { name: "What Is Scrum", file: "CertificateOfCompletion_What Is Scrum.pdf" },
    { name: "Project Management - Requirements Foundations", file: "CertificateOfCompletion_Project Management Foundations Requirements.pdf" }
  ],
  "Career Development": [
    { name: "Mastering Common Interview Questions", file: "CertificateOfCompletion_Mastering Common Interview Questions.pdf" }
  ]
};

const categoryEmojis = {
  "Web Development": "💻",
  "Design & Creative": "🎨",
  "Software Testing": "🧪",
  "Project Management": "📋",
  "Career Development": "🚀"
};

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  const categories = ["All", ...Object.keys(certificateData)];

  // Get filtered certificates
  const getFilteredCerts = () => {
    let certs = [];
    if (selectedCategory === "All") {
      Object.entries(certificateData).forEach(([category, items]) => {
        certs.push(...items.map(item => ({ ...item, category })));
      });
    } else {
      certs = certificateData[selectedCategory].map(item => ({ 
        ...item, 
        category: selectedCategory 
      }));
    }

    if (searchQuery) {
      certs = certs.filter(cert => 
        cert.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return certs;
  };

  const filteredCerts = getFilteredCerts();
  const totalCerts = Object.values(certificateData).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <main className="main">
      <section className="text-panel certificates-page">
        <div className="cert-header">
          <h2>My Certificates</h2>
          <p className="cert-intro">
            A comprehensive collection of {totalCerts} certifications showcasing my skills and continuous learning journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="cert-search-container">
          <input
            type="text"
            className="cert-search"
            placeholder="🔍 Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="cert-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`cert-category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category !== "All" && categoryEmojis[category]} {category}
              {category === "All" && ` (${totalCerts})`}
              {category !== "All" && ` (${certificateData[category].length})`}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="cert-results-count">
            Found {filteredCerts.length} certificate{filteredCerts.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Certificates Grid */}
        {filteredCerts.length > 0 ? (
          <div className="cert-grid">
            {filteredCerts.map((cert, i) => (
              <div
                key={i}
                className="cert-card"
                onClick={() => setSelectedCert(cert)}
              >
                <div className="cert-icon">{categoryEmojis[cert.category]}</div>
                <h3>{cert.name}</h3>
                <p className="cert-category-label">{cert.category}</p>
                <p className="cert-view-text">Click to view certificate</p>
                <div className="cert-badge">Verified</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No certificates found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/" className="cert-btn">← Back to Portfolio</a>
        </div>
      </section>

      {/* PDF Modal */}
      {selectedCert && (
        <>
          <div className="modal-backdrop" onClick={() => setSelectedCert(null)} />
          <div className="cert-modal">
            <button className="close-btn" onClick={() => setSelectedCert(null)}>
              ✕ Close
            </button>
            <h3>{selectedCert.name}</h3>
            <p className="modal-category">{selectedCert.category}</p>
            <iframe
              src={`/certs/${selectedCert.file}`}
              className="cert-pdf-viewer"
              title={selectedCert.name}
            />
            <a
              href={`/certs/${selectedCert.file}`}
              target="_blank"
              rel="noreferrer"
              className="view-btn"
            >
              📄 Open in New Tab
            </a>
          </div>
        </>
      )}
    </main>
  );
}
