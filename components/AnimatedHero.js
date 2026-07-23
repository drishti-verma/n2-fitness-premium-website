"use client";

import { useEffect, useRef, useState } from "react";

const navItems = ["Home", "About", "Programs", "Plans", "Schedule", "Gallery", "Contact"];
const whatsappUrl =
  "https://wa.me/919993389676?text=Hi%20N2%20Fitness%20Betul%2C%20I%20want%20to%20book%20a%20free%20trial.";

export default function AnimatedHero() {
  const heroRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--mx", `${x * 28}px`);
      hero.style.setProperty("--my", `${y * 28}px`);
      hero.style.setProperty("--logo-x", `${x * -10}px`);
      hero.style.setProperty("--logo-y", `${y * -8}px`);
      hero.style.setProperty("--rx", `${y * -7}deg`);
      hero.style.setProperty("--ry", `${x * 9}deg`);
      setPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    hero.addEventListener("pointermove", handleMove);
    return () => hero.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <section className="motion-hero" id="home" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <div className="gradient-wash" />
        <div className="motion-grid" />
        <div className="light-orb orb-one" />
        <div className="light-orb orb-two" />
        <div className="light-orb orb-three" />
      </div>

      <div
        className="pointer-glow"
        aria-hidden="true"
        style={{ transform: `translate(${pointer.x}px, ${pointer.y}px)` }}
      />

      <header className="hero-nav">
        <a className="brand-mark" href="#home" aria-label="N2 Fitness home">
          <span className="brand-logo">
            <img src="/n2gym.jpg" alt="N2 Fitness Gym logo" />
          </span>
          <strong>N2 Fitness Gym</strong>
        </a>

        <button
          className="mobile-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <i />
          <i />
          <i />
        </button>

        <nav className={menuOpen ? "open" : ""} aria-label="Hero navigation">
          {navItems.map((item) => (
            <a
              href={item === "Home" ? "#home" : `#${item.toLowerCase()}`}
              key={item}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <a className="trial-link" href={whatsappUrl} target="_blank" rel="noreferrer">
          Book Trial
        </a>
      </header>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="motion-eyebrow">
            <span />
            Betul&apos;s transformation studio
          </p>
          <h1>
            <span className="word word-one">Unleash</span>
            <span className="word word-two">Your</span>
            <span className="word word-three">Next Level</span>
          </h1>
          <p className="hero-text">
            Train inside a powerful community-focused gym led by transformation
            expertise, professional coaching, and a bold performance mindset.
          </p>

          <div className="hero-actions">
            <a className="primary-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>Join Now</span>
              <i>-&gt;</i>
            </a>
            <a className="secondary-cta" href="#programs">
              Explore Programs
            </a>
          </div>
        </div>

        <div className="hero-stage" aria-label="Animated N2 Fitness visual">
          <div className="stage-ring ring-a" />
          <div className="stage-ring ring-b" />
          <div className="hero-logo-emblem" aria-label="N2 Fitness official logo">
            <img src="/n2gym.jpg" alt="N2 Fitness Gym logo with wings and arm emblem" />
          </div>
          <div className="athlete-card">
            <div className="image-shell">
              <img
                src="https://images.unsplash.com/photo-1534368959876-26bf04f2c947?auto=format&fit=crop&w=1100&q=85"
                alt="Athlete training with battle ropes in a premium gym"
              />
            </div>
            <div className="scan-line" />
          </div>

          <div className="floating-panel panel-a">
            <span>Live Intensity</span>
            <strong>94%</strong>
            <div className="meter">
              <i />
            </div>
          </div>

          <div className="floating-panel panel-b">
            <span>Coach Mode</span>
            <strong>ON</strong>
          </div>

          <div className="rep-counter">
            <span>Today&apos;s Focus</span>
            <strong>Strength | Cardio | Discipline</strong>
          </div>
        </div>
      </div>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>Strength</span>
          <span>Transformation</span>
          <span>Discipline</span>
          <span>Personal Training</span>
          <span>Betul</span>
          <span>Strength</span>
          <span>Transformation</span>
          <span>Discipline</span>
          <span>Personal Training</span>
          <span>Betul</span>
        </div>
      </div>
    </section>
  );
}
