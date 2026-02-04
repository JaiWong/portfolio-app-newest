import React from "react";

export default function Contact() {
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
