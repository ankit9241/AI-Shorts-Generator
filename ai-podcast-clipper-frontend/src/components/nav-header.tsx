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
import { Logo } from "./logo";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Logo className="h-6 w-6 text-foreground" />
          <span className="text-lg font-display tracking-tight text-foreground font-semibold">
            PodSnap
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Credits */}
          <div className="flex items-center gap-1.5 border border-foreground/10 bg-foreground/[0.02] px-3 py-1.5 text-xs font-mono rounded-full text-muted-foreground">
            <span className="text-foreground font-bold">{credits}</span>
            <span>credits</span>
          </div>

          <Link
            href="/dashboard/billing"
            className="flex items-center justify-center bg-foreground text-background hover:bg-foreground/90 text-xs font-medium h-9 px-4 rounded-full transition-all duration-300"
          >
            Buy More
          </Link>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03] text-foreground text-xs font-mono font-bold hover:bg-foreground/10 transition-colors cursor-pointer outline-none">
                {email.charAt(0).toUpperCase()}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-background border border-foreground/10 rounded-xl p-1 shadow-lg shadow-foreground/[0.02] w-56 mt-2"
            >
              <DropdownMenuLabel className="px-3 py-2">
                <p className="text-xs text-muted-foreground font-mono truncate">{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-foreground/10 my-1" />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/billing"
                  className="cursor-pointer text-sm text-foreground hover:bg-foreground/[0.03] w-full px-3 py-2 rounded-lg block"
                >
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-foreground/10 my-1" />
              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/login" })}
                className="cursor-pointer text-sm text-destructive hover:bg-destructive/5 w-full px-3 py-2 rounded-lg text-left"
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
