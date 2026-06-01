"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { BRANCHES } from "@/lib/branches";

const currentYear = new Date().getFullYear();
const gradYears = Array.from({ length: 7 }, (_, i) => currentYear + i - 1);
const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    if (session?.user) {
      const user = session.user as {
        profileCompleted?: boolean;
        name?: string;
      };
      // If profile already completed, go home
      if (user.profileCompleted) {
        router.push("/");
        return;
      }
      // Pre-fill name from Google
      if (user.name) setName(user.name);
    }
  }, [session, status, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !branch || !graduationYear) {
      toast.error("Please fill in all fields");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          branch,
          graduationYear: Number(graduationYear),
          gender,
        }),
      });

      if (res.ok) {
        toast.success("Profile saved!");
        await update(); // refresh session so navbar/redirects reflect profile
        router.push("/");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to save");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  if (!session) return null;

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt=""
              width={64}
              height={64}
              className="rounded-full mx-auto mb-4 ring-2 ring-border"
            />
          )}
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Complete your profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Just a few details so we can tailor opportunities for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1.5">Branch</label>
            <select
              className={inputClass}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your branch
              </option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Graduation Year
            </label>
            <select
              className={inputClass}
              value={graduationYear}
              onChange={(e) => setGraduationYear(Number(e.target.value))}
              required
            >
              <option value="" disabled>
                Select year
              </option>
              {gradYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Gender — optional */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Gender <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <select
              className={inputClass}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Prefer not to specify</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              Only used to surface diversity &amp; women-only opportunities you&apos;re eligible for. Never shown publicly.
            </p>
          </div>

          {/* Email — read-only from Google */}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Email (from Google)
            </label>
            <input
              className={`${inputClass} bg-muted/50 text-muted-foreground cursor-not-allowed`}
              value={session.user?.email ?? ""}
              readOnly
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
          >
            {saving ? "Saving..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}
