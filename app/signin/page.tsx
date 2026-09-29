"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInInput = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter()
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInInput) {
    setError("");

    try {
      const response = await fetch("/api/signin", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.formErrors?.[0] ||
            result?.error ||
            "Invalid email or password",
        );
      }
      router.replace("/admin");
    } catch (error) {
      console.error("Sign in error:", error);

      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-sm">
        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Sign in to your account to continue.
          </p>
        </div>

        {/* ========================= */}
        {/* FORM */}
        {/* ========================= */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="bg-white"
                {...register("email")}
              />

              {errors.email && (
                <FieldDescription className="text-red-500">
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Link
                  href="/forgot-password"
                  className="text-sm text-neutral-500 hover:text-neutral-900"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="bg-white"
                {...register("password")}
              />

              {errors.password && (
                <FieldDescription className="text-red-500">
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </FieldGroup>
        </form>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}

        <p className="mt-6 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-neutral-900 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
