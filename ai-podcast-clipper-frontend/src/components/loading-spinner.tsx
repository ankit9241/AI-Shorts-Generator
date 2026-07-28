import React from "react";
import { Logo } from "./logo";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-background noise-overlay z-[9999]">
      {/* Centered Animated Logo */}
      <div className="relative flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center h-28 w-28">
          {/* Sleek rotating outline ring */}
          <div className="absolute inset-0 rounded-full border border-foreground/10 border-t-foreground/80 animate-spin [animation-duration:1.2s]" />
          
          {/* Secondary subtle glowing ring */}
          <div className="absolute inset-2 rounded-full border border-dashed border-foreground/5 animate-spin [animation-duration:4s] [animation-direction:reverse]" />
          
          {/* Center Logo with scaling pulse effect */}
          <div className="relative flex items-center justify-center animate-pulse [animation-duration:2s]">
            <Logo className="h-10 w-10 text-foreground" />
          </div>
        </div>

        {/* Text details */}
        <div className="flex flex-col items-center text-center">
          <span className="text-lg font-display tracking-tight text-foreground font-semibold">
            PodSnap
          </span>
          {/* Pulsing sub-label */}
          <span className="text-[10px] font-mono text-muted-foreground mt-1.5 tracking-widest uppercase animate-pulse">
            Processing Moment...
          </span>
        </div>
      </div>
    </div>
  );
}
