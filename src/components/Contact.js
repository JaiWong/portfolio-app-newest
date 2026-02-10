import React, { useState } from "react";

// Configure your endpoint in an environment variable named REACT_APP_CONTACT_FORM_ENDPOINT
// e.g. REACT_APP_CONTACT_FORM_ENDPOINT=https://formspree.io/f/yourFormId
const FORM_ENDPOINT = process.env.REACT_APP_CONTACT_FORM_ENDPOINT || "https://formspree.io/f/xojlgppr";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [hp, setHp] = useState(""); // honeypot field (should be left empty by humans)
  const [status, setStatus] = useState(null); // null | sending | success | error

  const validate = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return false;
    // simple email check
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if this field is filled, it's likely a bot. Silently accept to avoid feedback loops.
    if (hp && hp.trim() !== "") {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setHp("");
      return;
    }

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
      console.error("Contact submit error:", err);
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="text-panel contact-section">
      <h2>Contact Me</h2>
      <p className="contact-intro"> Want to message me directly? Use the form below — your message will be sent securely to my inbox.</p>

      <div className="contact-info">
        <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
          <div className="form-row">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>

          <div className="form-row">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required />
          </div>

          <div className="form-row">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows="6" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message..." required />
          </div>

          {/* Honeypot field: visually hidden but present in the DOM to trap bots */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="contact-hp">Leave this field empty</label>
            <input id="contact-hp" name="hp" type="text" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex="-1" />
          </div>

          <div className="form-row">
            <button className="submit-btn" type="submit" disabled={sending}>{sending ? "Sending…" : "Send Message"}</button>
          </div>

          <div className={`form-status ${status || ""}`} role="status" aria-live="polite">
            {status === "success" && <span>Thanks — your message was sent ✅</span>}
            {status === "error" && <span>Sorry, something went wrong. Check your fields or configure <code>REACT_APP_CONTACT_FORM_ENDPOINT</code>.</span>}
          </div>
        </form>
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
          <a href="https://www.linkedin.com/in/jairus-wong-8038652b8/" target="_blank" rel="noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

    </section>
  );
}
