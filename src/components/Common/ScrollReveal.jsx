"use client";

import React, { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 750,
  direction = "up", // "up" | "down" | "left" | "right" | "none"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entering the viewport fully
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) {
      return "opacity-100 translate-x-0 translate-y-0";
    }

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-10";
      case "down":
        return "opacity-0 -translate-y-10";
      case "left":
        return "opacity-0 translate-x-10";
      case "right":
        return "opacity-0 -translate-x-10";
      case "none":
        return "opacity-0";
      default:
        return "opacity-0 translate-y-10";
    }
  };

  const transitionStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    willChange: "transform, opacity",
  };

  return (
    <div
      ref={ref}
      style={transitionStyle}
      className={`transition-all ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
