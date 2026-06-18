"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  return (
    <header
      className="sticky top-0 z-10 flex justify-center"
      style={{
        background: "#FAF7F2",
        borderBottom: "1px solid #E8DFD0",
      }}
    >
      <div className="container flex h-14 items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ background: "#8B5E3C" }}
          >
            P
          </div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#1C1917" }}>
            PodSnap
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Credits */}
          <div
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{ background: "#F5F0E8", color: "#6B5B45", border: "1px solid #E8DFD0" }}
          >
            <span style={{ color: "#8B5E3C", fontWeight: 700 }}>{credits}</span>
            <span>credits</span>
          </div>

          <Link
            href="/dashboard/billing"
            className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "#8B5E3C", color: "#FFFFFF" }}
          >
            Buy More
          </Link>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                style={{ background: "#EDE5D8", color: "#8B5E3C" }}
              >
                {email.charAt(0).toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E8DFD0",
                borderRadius: "0.75rem",
                boxShadow: "0 8px 24px rgba(139,94,60,0.10)",
              }}
            >
              <DropdownMenuLabel>
                <p className="text-xs" style={{ color: "#9C8B75" }}>{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator style={{ background: "#E8DFD0" }} />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/billing"
                  className="cursor-pointer text-sm"
                  style={{ color: "#1C1917" }}
                >
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator style={{ background: "#E8DFD0" }} />
              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/login" })}
                className="cursor-pointer text-sm"
                style={{ color: "#C0392B" }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
