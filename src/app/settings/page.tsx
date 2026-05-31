"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Mail, Bell, Newspaper } from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Fetch current preferences
      fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.alertsEnabled !== undefined)
            setAlertsEnabled(data.alertsEnabled);
          if (data.digestEnabled !== undefined)
            setDigestEnabled(data.digestEnabled);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
  }, [session]);

  async function save(alerts: boolean, digest: boolean) {
    setSaving(true);
    try {
      const res = await fetch("/api/email/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alertsEnabled: alerts,
          digestEnabled: digest,
        }),
      });
      if (res.ok) {
        toast.success("Preferences updated");
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 pb-24">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-16 pb-24 text-center">
        <Mail className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Sign in with Google to manage your email preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 pt-16 pb-24">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your email notification preferences.
      </p>

      <div className="space-y-4">
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
            disabled={saving || !loaded}
            onClick={() => {
              const next = !alertsEnabled;
              setAlertsEnabled(next);
              save(next, digestEnabled);
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
            disabled={saving || !loaded}
            onClick={() => {
              const next = !digestEnabled;
              setDigestEnabled(next);
              save(alertsEnabled, next);
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

      <p className="mt-8 text-xs text-muted-foreground">
        Signed in as {session.user?.email}
      </p>
    </div>
  );
}
