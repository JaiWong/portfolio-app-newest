import React from "react";
import Skill from "./Skill";

export default function About() {
  return (
    <section id="about" className="text-panel about-section">
      <h2>About Me</h2>
      <div className="about-content">
        <p className="about-intro">
          I'm a passionate developer and designer dedicated to crafting beautiful digital experiences. 
          With a keen eye for detail and a love for clean code, I strive to create interfaces that are 
          both functional and aesthetically pleasing.
        </p>
        <p className="about-detail">
          My journey in tech combines creative design thinking with technical expertise, 
          allowing me to bridge the gap between user experience and implementation.
        </p>
      </div>

      <h3 className="skills-heading">Technical Skills</h3>
      <div className="skills-grid">
        <Skill name="React" percent={85} />
        <Skill name="UI/UX Design" percent={75} />
        <Skill name="JavaScript" percent={90} />
        <Skill name="CSS & Animations" percent={80} />
      </div>
      
      <div className="cert-btn-container">
        <a href="/certificates" className="cert-btn">
          🎓 View My Certificates →
        </a>
      </div>
    </section>
  );
}
