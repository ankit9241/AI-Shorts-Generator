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
    description: "Best value for regular podcasters",
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
    description: "For studios and agencies",
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
      className="relative flex flex-col rounded-2xl border p-8 transition-all"
      style={{
        background: plan.isPopular ? "#FFFFFF" : "#FAF7F2",
        borderColor: plan.isPopular ? "#8B5E3C" : "#E8DFD0",
        boxShadow: plan.isPopular ? "0 4px 24px rgba(139,94,60,0.14)" : "0 2px 8px rgba(139,94,60,0.04)",
      }}
    >
      {plan.isPopular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold"
          style={{ background: "#8B5E3C", color: "#FFFFFF" }}
        >
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <p className="mb-1 text-sm font-medium" style={{ color: "#9C8B75" }}>
          {plan.title}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className="text-5xl font-bold tracking-tight"
            style={{ color: plan.isPopular ? "#8B5E3C" : "#1C1917" }}
          >
            {plan.price}
          </span>
        </div>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#9C8B75" }}>
          {plan.credits}
        </p>
        {plan.saveNote && (
          <p className="mt-1 text-xs font-semibold" style={{ color: "#3A7D44" }}>
            {plan.saveNote}
          </p>
        )}
        <p className="mt-2 text-sm" style={{ color: "#6B5B45" }}>
          {plan.description}
        </p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <div
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: plan.isPopular ? "#8B5E3C" : "#EDE5D8" }}
            >
              <CheckIcon
                className="h-3 w-3"
                style={{ color: plan.isPopular ? "#FFFFFF" : "#8B5E3C" }}
              />
            </div>
            <span className="text-sm" style={{ color: "#6B5B45" }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: plan.isPopular ? "#8B5E3C" : "#F5F0E8",
          color: plan.isPopular ? "#FFFFFF" : "#6B5B45",
          border: plan.isPopular ? "none" : "1px solid #E8DFD0",
        }}
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
          className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors hover:opacity-80"
          style={{ background: "#F5F0E8", color: "#6B5B45", border: "1px solid #E8DFD0" }}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#1C1917" }}>
            Buy Credits
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9C8B75" }}>
            Purchase credits to generate more podcast clips. Credits never expire.
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} />
        ))}
      </div>

      {/* How credits work */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: "#FFFFFF", borderColor: "#E8DFD0", boxShadow: "0 2px 8px rgba(139,94,60,0.04)" }}
      >
        <h3 className="mb-4 text-sm font-semibold" style={{ color: "#1C1917" }}>
          How credits work
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "1 credit = 1 minute of podcast processing",
            "~1 clip generated per 5 minutes of content",
            "Credits never expire and can be used anytime",
            "Longer podcasts require more credits based on duration",
            "All packages are one-time purchases - no subscriptions",
            "Download your clips anytime after processing",
          ].map((fact, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ background: "#D4B896" }}
              />
              <p className="text-sm" style={{ color: "#6B5B45" }}>
                {fact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
