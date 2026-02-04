import React from "react";
export default function Skill({ name, percent }) {
  return (
    <div className="skill">
      <label>{name}</label>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
