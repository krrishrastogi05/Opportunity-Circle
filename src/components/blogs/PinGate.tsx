"use client";

import { useState, useRef } from "react";
import { Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PinGateProps {
  slug: string;
  onUnlock: (blogData: unknown) => void;
}

export function PinGate({ slug, onUnlock }: PinGateProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(i: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin];
    next[i] = val;
    setPin(next);
    setError("");
    if (val && i < 3) inputs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !pin[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = pin.join("");
    if (code.length < 4) { setError("Enter all 4 digits"); return; }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/blogs/unlisted?slug=${encodeURIComponent(slug)}&pin=${code}`);
      if (res.status === 403) { setError("Wrong PIN — try again"); setPin(["","","",""]); inputs.current[0]?.focus(); return; }
      if (!res.ok) { setError("Something went wrong"); return; }
      const data = await res.json();
      onUnlock(data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold mb-1">Unlisted Post</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Enter the 4-digit PIN to access this post.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 justify-center mb-6">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-2xl font-mono font-bold border border-border rounded-xl bg-card focus:outline-none focus:border-foreground transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-destructive mb-4">{error}</p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Unlock Post
        </Button>
      </form>
    </div>
  );
}
