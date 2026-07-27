"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Upload Any Format",
    description: "Drop in MP4 podcasts up to 500MB. We handle the rest.",
    visual: "upload",
  },
  {
    number: "02",
    title: "AI Transcription",
    description: "WhisperX-powered transcription accurately captures every word spoken.",
    visual: "transcribe",
  },
  {
    number: "03",
    title: "Smart Clip Detection",
    description: "Gemini AI identifies the most viral, shareable moments in your content.",
    visual: "detect",
  },
  {
    number: "04",
    title: "Auto-Cropped Shorts",
    description: "Clips are auto-formatted to vertical 9:16 for Reels, and Shorts.",
    visual: "crop",
  },
  {
    number: "05",
    title: "Instant Download",
    description: "All your clips are ready to download and post within minutes.",
    visual: "download",
  },
  {
    number: "06",
    title: "No Subscription",
    description: "Buy credits once, use them whenever. No recurring charges.",
    visual: "credits",
  },
];

function UploadVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <rect x="40" y="30" width="120" height="100" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <g>
        <path d="M 100 95 L 100 55 M 85 70 L 100 55 L 115 70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 4; 0 -4; 0 4"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </g>
      <line x1="60" y1="110" x2="140" y2="110" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    </svg>
  );
}

function TranscriptionVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <g opacity="0.4">
        {[20, 30, 45, 60, 40, 25, 45, 70, 50, 30, 20].map((h, i) => (
          <line
            key={i}
            x1={40 + i * 12}
            y1={50 - h / 2}
            x2={40 + i * 12}
            y2={50 + h / 2}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <animate
              attributeName="y1"
              values={`${50 - h / 2}; ${50 - (h * 1.5) / 2}; ${50 - h / 2}`}
              dur="1.2s"
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values={`${50 + h / 2}; ${50 + (h * 1.5) / 2}; ${50 + h / 2}`}
              dur="1.2s"
              begin={`${i * 0.1}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </g>
      <g>
        <line x1="40" y1="110" x2="160" y2="110" stroke="currentColor" strokeWidth="2" strokeDasharray="120 120">
          <animate attributeName="stroke-dashoffset" values="120;0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="40" y1="125" x2="130" y2="125" stroke="currentColor" strokeWidth="2" strokeDasharray="90 90">
          <animate attributeName="stroke-dashoffset" values="90;0" dur="2s" begin="0.3s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

function DetectionVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <rect x="30" y="65" width="140" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="35" y="70" width="30" height="20" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="70" y="70" width="60" height="20" rx="2" fill="currentColor" opacity="0.4" className="text-primary">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <rect x="135" y="70" width="30" height="20" rx="2" fill="currentColor" opacity="0.15" />
      <g>
        <rect x="68" y="55" width="64" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="68" cy="55" r="3" fill="currentColor" />
        <circle cx="132" cy="55" r="3" fill="currentColor" />
        <circle cx="68" cy="105" r="3" fill="currentColor" />
        <circle cx="132" cy="105" r="3" fill="currentColor" />
      </g>
      <g transform="translate(100, 30) scale(0.8)">
        <path d="M 0 -15 L 4 -4 L 15 0 L 4 4 L 0 15 L -4 4 L -15 0 L -4 -4 Z" fill="currentColor">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

function CropVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <rect x="25" y="40" width="150" height="80" rx="4" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <rect x="75" y="25" width="50" height="110" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="65" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 85 100 Q 100 85 115 100" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 70 35 L 75 35 L 75 40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 130 35 L 125 35 L 125 40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 70 125 L 75 125 L 75 120" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 130 125 L 125 125 L 125 120" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DownloadVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <path d="M 50 110 L 50 120 L 150 120 L 150 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <g>
        <path d="M 100 40 L 100 95 M 80 75 L 100 95 L 120 75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 -5; 0 10; 0 -5"
          dur="2s"
          repeatCount="indefinite"
        />
      </g>
      <circle cx="100" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="10;40" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CreditsVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <g transform="translate(100, 80)">
        <ellipse cx="0" cy="20" rx="40" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M -40 20 L -40 30 A 40 12 0 0 0 40 30 L 40 20" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="0" cy="5" rx="40" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M -40 5 L -40 15 A 40 12 0 0 0 40 15 L 40 5" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="0" cy="-10" rx="40" ry="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M -10 -15 L -8 -11 L -4 -10 L -8 -9 L -10 -5 L -12 -9 L -16 -10 L -12 -11 Z" fill="currentColor">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "upload":
      return <UploadVisual />;
    case "transcribe":
      return <TranscriptionVisual />;
    case "detect":
      return <DetectionVisual />;
    case "crop":
      return <CropVisual />;
    case "download":
      return <DownloadVisual />;
    case "credits":
      return <CreditsVisual />;
    default:
      return <UploadVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>

        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Capabilities
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Everything you need to go viral.
            <br />
            <span className="text-muted-foreground">Nothing you don&apos;t.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
