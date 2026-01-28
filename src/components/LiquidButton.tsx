'use client';

import React, { useRef, useState } from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function LiquidButton({ children, className = '', ...props }: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Update logic to track mouse position relative to button
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      // We append btn-gold to ensure it picks up the global base styles (shape, font, border)
      className={`btn-gold relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/*
        Liquid Gradient Layer
        - Uses var(--accent-gradient) which switches between Oil Slick (Light) and Gold (Dark).
        - Uses mask-image to only reveal the gradient under the mouse cursor.
        - Animated background-position for that "flow" effect requested.
      */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: 'var(--accent-gradient)',
          backgroundSize: '200% 200%',
          maskImage: `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, black, transparent)`,
        }}
      >
        {/* Optional: Add internal animation to the gradient for movement while revealing */}
        <div className="w-full h-full animate-[gradient-flow_4s_ease_infinite]" />
      </div>

      {/* Subtle glow layer for better visibility of the effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${coords.x}px ${coords.y}px, var(--accent-gold), transparent)`,
        }}
      />
    </button>
  );
}
