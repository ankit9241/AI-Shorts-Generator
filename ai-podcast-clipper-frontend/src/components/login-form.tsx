"use client";

import { cn } from "~/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { loginSchema, type LoginFormValues } from "~/schemas/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (signInResult?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold tracking-tight" style={{ color: "#1C1917" }}>
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "#9C8B75" }}>
          Sign in to your PodSnap account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#6B5B45" }}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            {...register("email")}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8DFD0",
              color: "#1C1917",
              borderRadius: "0.625rem",
            }}
          />
          {errors.email && (
            <p className="text-xs" style={{ color: "#C0392B" }}>{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-sm font-medium" style={{ color: "#6B5B45" }}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            required
            {...register("password")}
            style={{
              background: "#FFFFFF",
              border: "1px solid #E8DFD0",
              color: "#1C1917",
              borderRadius: "0.625rem",
            }}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: "#C0392B" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{ background: "#FDF0EE", color: "#C0392B", border: "1px solid #F5C6BE" }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: "#8B5E3C", color: "#FFFFFF" }}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm" style={{ color: "#9C8B75" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium hover:underline" style={{ color: "#8B5E3C" }}>
          Create one
        </Link>
      </p>
    </div>
  );
}
