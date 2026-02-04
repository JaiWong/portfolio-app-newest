import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="text-panel contact-section">
      <h2>Contact Me</h2>
      <p className="contact-intro">Let's connect! Feel free to reach out through any of these channels.</p>
      
      <div className="contact-info">
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          <div className="contact-details">
            <h4>Email</h4>
            <a href="mailto:24001954@myrp.edu.sg">24001954@myrp.edu.sg</a>
          </div>
        </div>
      </div>

      <div className="social-section">
        <h3>Follow Me</h3>
        <div className="contact-icons">
          <a href="https://instagram.com/jaisticles" target="_blank" rel="noreferrer" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/JaiWong" target="_blank" rel="noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/jairus-wong" target="_blank" rel="noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
