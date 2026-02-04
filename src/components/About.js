import React from "react";
import Skill from "./Skill";

export default function About() {
  return (
    <section id="about" className="text-panel">
      <h2>About Me</h2>
      <p>I'm a developer and designer passionate about UI/UX, coding, and creating beautiful digital projects.</p>

      <h3>Skills</h3>
      <div className="skills-grid">
        <Skill name="React" percent={85} />
        <Skill name="UI/UX" percent={75} />
        <Skill name="JavaScript" percent={90} />
        <Skill name="CSS & Animations" percent={80} />
      </div>
        <a href="/certificates" className="cert-btn">
            View My Certificates →
        </a>

    </section>
  );
}
