"use client";

import { useEffect, useRef, useState } from "react";

export default function ExperienceEffects() {
  const [loaded, setLoaded] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRefPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const finishLoading = () => {
      window.setTimeout(() => setLoaded(true), 650);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => window.removeEventListener("load", finishLoading);
  }, []);

  useEffect(() => {
    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const animateRing = () => {
      ringRefPosition.current.x += (mouseRef.current.x - ringRefPosition.current.x) * 0.18;
      ringRefPosition.current.y += (mouseRef.current.y - ringRefPosition.current.y) * 0.18;
      ring.style.transform = `translate3d(${ringRefPosition.current.x}px, ${ringRefPosition.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const handlePointerOver = (event) => {
      if (event.target.closest("a, button, input, textarea, .motion-card, .price-tile, .trainer-tile, .gallery-grid-full button")) {
        document.body.classList.add("cursor-hovering");
      }
    };

    const handlePointerOut = (event) => {
      if (event.target.closest("a, button, input, textarea, .motion-card, .price-tile, .trainer-tile, .gallery-grid-full button")) {
        document.body.classList.remove("cursor-hovering");
      }
    };

    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove("has-custom-cursor", "cursor-hovering");
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div className={loaded ? "site-loader loaded" : "site-loader"} aria-hidden="true">
        <div className="loader-orbit">
          <img src="/n2gym.jpg" alt="" />
        </div>
        <strong>N2 Fitness Gym</strong>
        <span>Loading strength experience</span>
      </div>

      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}
