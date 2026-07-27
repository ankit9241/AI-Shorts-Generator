import React from "react";

export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top Left Bracket */}
      <path d="M 6 3 L 3 3 L 3 6" />
      {/* Top Right Bracket */}
      <path d="M 18 3 L 21 3 L 21 6" />
      
      {/* Microphone / Sound Wave body */}
      <rect x="9" y="6" width="6" height="10" rx="3" fill="currentColor" stroke="none" opacity="0.15" />
      <rect x="9" y="6" width="6" height="10" rx="3" />
      <path d="M 6 11 A 6 6 0 0 0 18 11" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="9" y1="21" x2="15" y2="21" />

      {/* Bottom Left Bracket */}
      <path d="M 6 21 L 3 21 L 3 18" />
      {/* Bottom Right Bracket */}
      <path d="M 18 21 L 21 21 L 21 18" />
    </svg>
  );
}
