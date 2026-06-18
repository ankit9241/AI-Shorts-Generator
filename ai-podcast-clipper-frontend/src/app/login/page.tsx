"use server";

import { redirect } from "next/navigation";
import { LoginForm } from "~/components/login-form";
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
          <blockquote
            className="mb-6 text-2xl font-medium leading-snug"
            style={{ color: "#1C1917" }}
          >
            "PodSnap saved me 4 hours of editing every week. My Reels engagement tripled."
          </blockquote>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ background: "#8B5E3C" }}
            >
              R
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#1C1917" }}>
                Rahul Mehta
              </p>
              <p className="text-xs" style={{ color: "#9C8B75" }}>
                Podcast Host · 120k Followers
              </p>
            </div>
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
