import Link from "next/link";

const features = [
  {
    title: "Upload Any Format",
    description: "Drop in MP4 podcasts up to 500MB. We handle the rest.",
  },
  {
    title: "AI Transcription",
    description: "WhisperX-powered transcription accurately captures every word spoken.",
  },
  {
    title: "Smart Clip Detection",
    description: "Gemini AI identifies the most viral, shareable moments in your content.",
  },
  {
    title: "Auto-Cropped Shorts",
    description: "Clips are auto-formatted to vertical 9:16 for Reels, TikTok, and Shorts.",
  },
  {
    title: "Instant Download",
    description: "All your clips are ready to download and post within minutes.",
  },
  {
    title: "No Subscription",
    description: "Buy credits once, use them whenever. No recurring charges.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Your Podcast",
    description: "Drag and drop your long-form video file into the dashboard.",
  },
  {
    number: "02",
    title: "AI Processes It",
    description: "Our AI transcribes, analyzes, and finds the best clip moments automatically.",
  },
  {
    number: "03",
    title: "Download Your Clips",
    description: "Get perfectly cropped short-form clips ready to post on any platform.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#FAF7F2" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #E8DFD0", background: "#FAF7F2" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight" style={{ color: "#1C1917" }}>
              PodSnap
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:underline"
              style={{ color: "#6B5B45" }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#8B5E3C", color: "#FFFFFF" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-28 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
          style={{ borderColor: "#E8DFD0", color: "#9C8B75", background: "#F5F0E8" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#8B5E3C" }}
          />
          AI-Powered Clip Generator
        </div>

        <h1
          className="mx-auto mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ color: "#1C1917" }}
        >
          Turn Long Podcasts into{" "}
          <span style={{ color: "#8B5E3C" }}>Viral Shorts</span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed"
          style={{ color: "#6B5B45" }}
        >
          PodSnap uses advanced AI to automatically find, clip, and format the
          best moments from your podcast - ready to post in minutes.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl px-8 py-3.5 text-base font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{ background: "#8B5E3C", color: "#FFFFFF" }}
          >
            Start Clipping Free
          </Link>
          <Link
            href="/login"
            className="rounded-xl border px-8 py-3.5 text-base font-medium transition-all duration-150"
            style={{ borderColor: "#D4B896", color: "#6B5B45", background: "#FFFFFF" }}
          >
            Sign In
          </Link>
        </div>

        {/* Hero Visual */}
        <div
          className="mt-20 overflow-hidden rounded-2xl border"
          style={{ borderColor: "#E8DFD0", background: "#FFFFFF", boxShadow: "0 8px 40px rgba(139,94,60,0.08)" }}
        >
          <div
            className="flex items-center gap-1.5 px-5 py-3"
            style={{ background: "#F5F0E8", borderBottom: "1px solid #E8DFD0" }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: "#EDCFBE" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#E8D4A0" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#BED9C2" }} />
            <span className="ml-3 text-xs" style={{ color: "#9C8B75" }}>
              dashboard.podsnap.ai
            </span>
          </div>
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1C1917" }}>
                  Queue Status
                </p>
                <p className="text-xs" style={{ color: "#9C8B75" }}>
                  3 videos processed today
                </p>
              </div>
              <div
                className="rounded-lg px-3 py-1.5 text-xs font-medium"
                style={{ background: "#F5F0E8", color: "#8B5E3C" }}
              >
                Refresh
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "episode-247-founders.mp4", status: "Completed", clips: "6 clips", color: "#3A7D44" },
                { name: "startup-deep-dive-ep12.mp4", status: "AI Processing", clips: "-", color: "#8B5E3C" },
                { name: "weekly-roundup-june.mp4", status: "Queued", clips: "-", color: "#B5860D" },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl px-4 py-3"
                  style={{ background: "#FAF7F2", border: "1px solid #EDE5D8" }}
                >
                  <span className="text-sm" style={{ color: "#1C1917" }}>
                    {item.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs" style={{ color: "#9C8B75" }}>
                      {item.clips}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{ background: `${item.color}18`, color: item.color }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderTop: "1px solid #E8DFD0", borderBottom: "1px solid #E8DFD0", background: "#F5F0E8" }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#8B5E3C" }}>
              How It Works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1C1917" }}>
              From podcast to clips in 3 steps
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border p-8"
                style={{ borderColor: "#E8DFD0", background: "#FFFFFF", boxShadow: "0 2px 12px rgba(139,94,60,0.06)" }}
              >
                <div
                  className="mb-5 inline-block text-4xl font-bold tracking-tighter"
                  style={{ color: "#D4B896" }}
                >
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: "#1C1917" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#8B5E3C" }}>
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1C1917" }}>
            Everything you need to go viral
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border p-6 transition-all duration-150 hover:shadow-md"
              style={{ borderColor: "#E8DFD0", background: "#FFFFFF" }}
            >
              <h3 className="mb-2 font-semibold" style={{ color: "#1C1917" }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B5B45" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section
        style={{
          borderTop: "1px solid #E8DFD0",
          borderBottom: "1px solid #E8DFD0",
          background: "#F5F0E8",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "#8B5E3C" }}>
              Pricing
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#1C1917" }}>
              Pay only for what you use
            </h2>
            <p className="text-base" style={{ color: "#6B5B45" }}>
              No monthly fees. Credits never expire.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Small Pack", price: "₹99", credits: "50 credits", note: "", popular: false },
              { name: "Medium Pack", price: "₹249", credits: "150 credits", note: "Save 17%", popular: true },
              { name: "Large Pack", price: "₹699", credits: "500 credits", note: "Save 30%", popular: false },
            ].map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl border p-8 text-center"
                style={{
                  borderColor: plan.popular ? "#8B5E3C" : "#E8DFD0",
                  background: plan.popular ? "#FFFFFF" : "#FAF7F2",
                  boxShadow: plan.popular ? "0 4px 24px rgba(139,94,60,0.14)" : "none",
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ background: "#8B5E3C", color: "#FFFFFF" }}
                  >
                    Most Popular
                  </div>
                )}
                <p className="mb-1 font-semibold" style={{ color: "#1C1917" }}>
                  {plan.name}
                </p>
                <p className="mb-1 text-4xl font-bold" style={{ color: plan.popular ? "#8B5E3C" : "#1C1917" }}>
                  {plan.price}
                </p>
                <p className="mb-1 text-sm" style={{ color: "#9C8B75" }}>
                  {plan.credits}
                </p>
                {plan.note && (
                  <p className="text-xs font-medium" style={{ color: "#3A7D44" }}>
                    {plan.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/signup"
              className="inline-block rounded-xl px-8 py-3.5 text-base font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#8B5E3C", color: "#FFFFFF" }}
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2
          className="mx-auto mb-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          style={{ color: "#1C1917" }}
        >
          Your audience is waiting for your best moments
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base" style={{ color: "#6B5B45" }}>
          Join creators who use PodSnap to grow their social presence without
          spending hours editing.
        </p>
        <Link
          href="/signup"
          className="inline-block rounded-xl px-10 py-4 text-base font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "#8B5E3C", color: "#FFFFFF" }}
        >
          Start for Free
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E8DFD0", background: "#F5F0E8" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "#1C1917" }}>
              PodSnap
            </span>
          </div>
          <p className="text-xs" style={{ color: "#9C8B75" }}>
            © 2026 PodSnap. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
