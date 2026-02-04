import React, { useEffect, useState } from "react";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Developer • Designer • Student";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="text-panel hero-panel">
      <h1><span className="my-name">Jairus Wong</span></h1>
      <h2 className="subtitle typing-text">{displayText}<span className="cursor">|</span></h2>
      <p className="lead">I build clean interfaces, modern apps, and high-impact digital experiences.</p>
    </section>
  );
}
