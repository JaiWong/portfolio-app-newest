import React, { useEffect, useState, useRef } from "react";

export default function Skill({ name, percent }) {
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const skillRef = useRef(null);

  useEffect(() => {
    // 1. Capture the current ref value in a local variable
    const currentRef = skillRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // 2. Use the local variable for cleanup
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setWidth(percent);
      }, 200);
      return () => clearTimeout(timer); // Good practice to clean up timers too!
    }
  }, [isVisible, percent]);

  return (
    <div className="skill" ref={skillRef}>
      <label>{name}</label>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${width}%` }}>
          <span className="skill-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}