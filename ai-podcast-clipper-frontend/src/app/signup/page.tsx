"use server";

import { redirect } from "next/navigation";
import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/auth";
import Link from "next/link";
import { Logo } from "~/components/logo";

export default async function Page() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full bg-background noise-overlay relative overflow-hidden">
      {/* Subtle grid lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10 w-full"
            style={{ top: `${16.6 * (i + 1)}%` }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10 h-full"
            style={{ left: `${12.5 * (i + 1)}%` }}
          />
        ))}
      </div>

      {/* Left Panel */}
      <div className="hidden w-1/2 flex-col justify-between p-16 lg:flex border-r border-foreground/10 relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-8 w-8 text-foreground" />
          <span className="text-xl font-display tracking-tight text-foreground font-semibold">
            PodSnap
          </span>
        </Link>

        <div>
          <h2 className="mb-8 text-4xl font-display tracking-tight text-foreground leading-tight">
            Start turning your best podcast moments into viral content - for free.
          </h2>
          <div className="space-y-4">
            {[
              "Upload your podcast in any length",
              "AI finds the most engaging moments",
              "Download clips formatted for every platform",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-mono">
          &copy; 2026 PodSnap. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 relative z-10">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <Logo className="h-6 w-6 text-foreground" />
            <span className="text-lg font-display tracking-tight text-foreground font-semibold">
              PodSnap
            </span>
          </Link>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
