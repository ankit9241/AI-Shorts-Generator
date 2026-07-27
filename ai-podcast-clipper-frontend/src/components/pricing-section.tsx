"use client";

import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Small Pack",
    description: "Perfect for starting out or testing your first episodes",
    price: 99,
    credits: "50 credits",
    badge: null,
    features: [
      "50 minutes of video processing",
      "WhisperX AI transcription",
      "Smart clip detection",
      "Auto-crop to 9:16 vertical",
      "No watermarks",
      "1080p HD downloads",
    ],
    cta: "Buy Small Pack",
    popular: false,
  },
  {
    name: "Medium Pack",
    description: "Designed for active, growing content creators",
    price: 249,
    credits: "150 credits",
    badge: "Save 17%",
    features: [
      "150 minutes of video processing",
      "WhisperX AI transcription",
      "Smart clip detection",
      "Auto-crop to 9:16 vertical",
      "No watermarks",
      "1080p HD downloads",
      "Priority rendering queue",
    ],
    cta: "Buy Medium Pack",
    popular: true,
  },
  {
    name: "Large Pack",
    description: "Best value for agencies and professional editors",
    price: 699,
    credits: "500 credits",
    badge: "Save 30%",
    features: [
      "500 minutes of video processing",
      "WhisperX AI transcription",
      "Smart clip detection",
      "Auto-crop to 9:16 vertical",
      "No watermarks",
      "1080p HD downloads",
      "Priority rendering queue",
      "Batch processing support",
    ],
    cta: "Buy Large Pack",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Pricing
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Pay only for
            <br />
            <span className="text-stroke">what you use</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            No monthly fees. Credits never expire. Select a package that fits your workload.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative p-8 lg:p-12 bg-background ${
                plan.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground z-10" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {plan.badge && (
                    <span className="px-2 py-0.5 bg-foreground text-primary-foreground text-xs font-mono">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-3xl text-foreground mt-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              {/* Price & Credits Info */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl lg:text-6xl text-foreground">
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground">one-time</span>
                </div>
                <div className="mt-3 font-mono text-sm font-semibold text-foreground">
                  {plan.credits}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group cursor-pointer ${
                  plan.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Need a custom volume or corporate billing?{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Contact support
          </a>
        </p>
      </div>
    </section>
  );
}
