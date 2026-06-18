"use server";

import { redirect } from "next/navigation";
import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full" style={{ background: "#FAF7F2" }}>
      {/* Left Panel */}
      <div
        className="hidden w-1/2 flex-col justify-between p-12 lg:flex"
        style={{ background: "#F5F0E8", borderRight: "1px solid #E8DFD0" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ background: "#8B5E3C" }}
          >
            P
          </div>
          <span className="text-lg font-semibold" style={{ color: "#1C1917" }}>
            PodSnap
          </span>
        </Link>

        <div>
          <p className="mb-8 text-3xl font-bold leading-tight" style={{ color: "#1C1917" }}>
            Start turning your best podcast moments into viral content - for free.
          </p>
          <div className="space-y-4">
            {[
              "Upload your podcast in any length",
              "AI finds the most engaging moments",
              "Download clips formatted for every platform",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div
                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#8B5E3C" }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#6B5B45" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: "#9C8B75" }}>
          © 2026 PodSnap. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="text-lg font-semibold" style={{ color: "#1C1917" }}>
              PodSnap
            </span>
          </Link>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
