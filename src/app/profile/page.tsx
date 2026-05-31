"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Bell, Newspaper, Trash2, User as UserIcon } from "lucide-react";
import { BRANCH_GROUPS } from "@/lib/branches";

const currentYear = new Date().getFullYear();
const gradYears = Array.from({ length: 7 }, (_, i) => currentYear + i - 1);

interface UserProfile {
  name?: string;
  email: string;
  image?: string;
  branch?: string;
  graduationYear?: number;
  alertsEnabled: boolean;
  digestEnabled: boolean;
  createdAt?: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [graduationYear, setGraduationYear] = useState<number | "">("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/user/profile")
        .then((r) => r.json())
        .then((data) => {
          if (data.email) {
            setProfile(data);
            setName(data.name || "");
            setBranch(data.branch || "");
            setGraduationYear(data.graduationYear || "");
            setAlertsEnabled(data.alertsEnabled ?? true);
            setDigestEnabled(data.digestEnabled ?? true);
          }
        })
        .catch(() => toast.error("Failed to load profile"));
    }
  }, [session]);

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          branch: branch || undefined,
          graduationYear: graduationYear || undefined,
        }),
      });
      if (res.ok) toast.success("Profile saved");
      else toast.error("Failed to save");
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function saveEmailPrefs(alerts: boolean, digest: boolean) {
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertsEnabled: alerts, digestEnabled: digest }),
      });
      if (res.ok) toast.success("Email preferences updated");
      else toast.error("Failed to update");
    } catch {
      toast.error("Network error");
    }
  }

  async function deleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (res.ok) {
        toast.success("Account deleted");
        signOut({ callbackUrl: "/" });
      } else {
        toast.error("Failed to delete account");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  if (status === "loading" || !profile) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 pb-24">
        <div className="space-y-4">
          <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";

  return (
    <div className="max-w-xl mx-auto px-4 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {profile.image ? (
          <Image
            src={profile.image}
            alt=""
            width={64}
            height={64}
            className="rounded-full ring-2 ring-border"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <UserIcon className="h-7 w-7 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{profile.name || "Your Profile"}</h1>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          {profile.createdAt && (
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              Member since{" "}
              {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* Profile Info Section */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Name</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Branch</label>
            <select
              className={inputClass}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Select your branch</option>
              {BRANCH_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Graduation Year
            </label>
            <select
              className={inputClass}
              value={graduationYear}
              onChange={(e) => setGraduationYear(Number(e.target.value) || "")}
            >
              <option value="">Select year</option>
              {gradYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Email
            </label>
            <input
              className={`${inputClass} bg-muted/50 text-muted-foreground cursor-not-allowed`}
              value={profile.email}
              readOnly
            />
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              Linked to your Google account and cannot be changed.
            </p>
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

      {/* Email Preferences Section */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Email Preferences
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Opportunity Alerts</p>
                <p className="text-xs text-muted-foreground">
                  Get notified when new opportunities are added
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !alertsEnabled;
                setAlertsEnabled(next);
                saveEmailPrefs(next, digestEnabled);
              }}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                alertsEnabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  alertsEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-3">
              <Newspaper className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Weekly Digest</p>
                <p className="text-xs text-muted-foreground">
                  Receive a weekly summary every Monday
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !digestEnabled;
                setDigestEnabled(next);
                saveEmailPrefs(alertsEnabled, next);
              }}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                digestEnabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  digestEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-destructive/70 mb-4">
          Danger Zone
        </h2>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="shrink-0 px-4 py-2 rounded-lg text-xs font-semibold border border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 inline mr-1" />
              Delete
            </button>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-2">Delete your account?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete your profile, email preferences, and
              saved opportunities. You cannot undo this.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-accent/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={deleteAccount}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
