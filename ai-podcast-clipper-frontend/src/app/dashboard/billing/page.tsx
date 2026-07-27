"use client";

import { CheckIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { createCheckoutSession, type PriceId } from "~/actions/stripe";
import { useState } from "react";

interface PricingPlan {
  title: string;
  price: string;
  credits: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  saveNote?: string;
  priceId: PriceId;
}

const plans: PricingPlan[] = [
  {
    title: "Small Pack",
    price: "₹99",
    credits: "50 credits",
    description: "Perfect for occasional creators",
    features: ["50 processing credits", "No expiration", "Download all clips", "All clip formats"],
    buttonText: "Buy 50 credits",
    priceId: "small",
  },
  {
    title: "Medium Pack",
    price: "₹249",
    credits: "150 credits",
    description: "Best value for regular creators",
    features: ["150 processing credits", "No expiration", "Download all clips", "All clip formats"],
    buttonText: "Buy 150 credits",
    isPopular: true,
    saveNote: "Save 17%",
    priceId: "medium",
  },
  {
    title: "Large Pack",
    price: "₹699",
    credits: "500 credits",
    description: "For agencies and power users",
    features: ["500 processing credits", "No expiration", "Download all clips", "All clip formats"],
    buttonText: "Buy 500 credits",
    saveNote: "Save 30%",
    priceId: "large",
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await createCheckoutSession(plan.priceId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col p-8 lg:p-12 border ${
        plan.isPopular
          ? "border-2 border-foreground bg-background z-10"
          : "border-foreground/10 bg-background"
      }`}
    >
      {plan.isPopular && (
        <div className="absolute -top-3.5 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-mono text-muted-foreground">{plan.title}</p>
          {plan.saveNote && (
            <span className="px-2 py-0.5 bg-foreground text-primary-foreground text-xs font-mono">
              {plan.saveNote}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-5xl font-display text-foreground">
            {plan.price}
          </span>
          <span className="text-sm text-muted-foreground font-mono">one-time</span>
        </div>
        <p className="mt-3 font-mono text-sm font-semibold text-foreground">
          {plan.credits}
        </p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {plan.description}
        </p>
      </div>

      <ul className="mb-8 flex-1 space-y-3.5">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <CheckIcon className="h-4 w-4 text-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
          plan.isPopular
            ? "bg-foreground text-background hover:bg-foreground/90"
            : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
        }`}
      >
        {loading ? "Redirecting..." : plan.buttonText}
      </button>
    </div>
  );
}

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-12 flex items-start gap-4">
        <Link
          href="/dashboard"
          className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center border border-foreground/20 rounded-full hover:bg-foreground/5 text-foreground transition-all duration-300"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Buy Credits
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Purchase credits to generate more podcast clips. Credits never expire.
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="mb-12 grid gap-px bg-foreground/10 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>

      {/* How credits work */}
      <div className="border border-foreground/10 bg-foreground/[0.01] p-8">
        <h3 className="mb-6 text-sm font-mono font-semibold text-foreground uppercase tracking-wider">
          How credits work
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "1 credit = 1 minute of podcast processing",
            "~1 clip generated per 5 minutes of content",
            "Credits never expire and can be used anytime",
            "Longer podcasts require more credits based on duration",
            "All packages are one-time purchases - no subscriptions",
            "Download your clips anytime after processing",
          ].map((fact, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
