import React from "react";

const certs = [
  { name: "AWS Cloud Certificate", file: "aws.pdf" },
  { name: "Google UX Certificate", file: "google.pdf" },
  { name: "UI/UX Design", file: "uiux.pdf" },
  { name: "Web Development", file: "webdev.pdf" }
];

export default function Certificates() {
  return (
    <section className="text-panel">
      <h2>My Certificates</h2>

      <div className="cert-grid">
        {certs.map((c, i) => (
          <a
            key={i}
            href={`/certs/${c.file}`}
            target="_blank"
            rel="noreferrer"
            className="cert-card"
          >
            <div className="cert-icon">📜</div>
            <h3>{c.name}</h3>
            <p>Click to view</p>
          </a>
        ))}
      </div>
    </section>
  );
}
