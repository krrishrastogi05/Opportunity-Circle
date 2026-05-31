"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  OPPORTUNITY_CATEGORIES,
  CATEGORY_META,
} from "@/lib/opportunity-constants";

interface Round {
  name: string;
  description: string;
  timeline: string;
}

interface Step {
  step: number;
  title: string;
  description: string;
}

interface TimelinePhase {
  phase: string;
  period: string;
  description: string;
}

interface OpportunityData {
  _id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  organizer: string;
  companySlug: string;
  companyUrl: string;
  eligibility: string;
  applicationUrl: string;
  logoUrl: string;
  opensAt: string;
  closesAt: string;
  eventDate: string;
  isPPIOffering: boolean;
  ppiDetails: string;
  prizes: string;
  stipend: string;
  rounds: Round[];
  steps: Step[];
  timeline: TimelinePhase[];
  tips: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
}

const emptyForm: OpportunityData = {
  title: "",
  slug: "",
  category: "hiring_challenge",
  description: "",
  longDescription: "",
  organizer: "",
  companySlug: "",
  companyUrl: "",
  eligibility: "",
  applicationUrl: "",
  logoUrl: "",
  opensAt: "",
  closesAt: "",
  eventDate: "",
  isPPIOffering: false,
  ppiDetails: "",
  prizes: "",
  stipend: "",
  rounds: [],
  steps: [],
  timeline: [],
  tips: [],
  tags: [],
  featured: false,
  published: false,
};

function toDateInput(val: string | undefined): string {
  if (!val) return "";
  try {
    return new Date(val).toISOString().slice(0, 16);
  } catch {
    return "";
  }
}

export function OpportunityForm({
  initial,
}: {
  initial?: Record<string, unknown>;
}) {
  const router = useRouter();
  const isEdit = !!initial?._id;

  const [form, setForm] = useState<OpportunityData>(() => {
    if (!initial) return emptyForm;
    return {
      ...emptyForm,
      ...initial,
      opensAt: toDateInput(initial.opensAt as string),
      closesAt: toDateInput(initial.closesAt as string),
      eventDate: toDateInput(initial.eventDate as string),
      rounds: (initial.rounds as Round[]) || [],
      steps: (initial.steps as Step[]) || [],
      timeline: (initial.timeline as TimelinePhase[]) || [],
      tips: (initial.tips as string[]) || [],
      tags: (initial.tags as string[]) || [],
    } as OpportunityData;
  });

  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  function update<K extends keyof OpportunityData>(
    key: K,
    value: OpportunityData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const url = isEdit
      ? `/api/opportunities/${initial!._id}`
      : "/api/opportunities";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isEdit ? "Updated" : "Created");
        router.push("/admin/opportunities");
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

  const inputClass =
    "w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClass = "block text-sm font-medium mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">
          Basic Info
        </h2>

        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category *</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {OPPORTUNITY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_META[c].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Organizer</label>
            <input
              className={inputClass}
              value={form.organizer}
              onChange={(e) => update("organizer", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} min-h-[100px]`}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Short summary shown on cards (1-2 sentences)"
          />
        </div>

        <div>
          <label className={labelClass}>Long Description</label>
          <textarea
            className={`${inputClass} min-h-[140px]`}
            value={form.longDescription}
            onChange={(e) => update("longDescription", e.target.value)}
            placeholder="Optional. Full detail shown on the opportunity's own page. Separate paragraphs with blank lines."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Application URL</label>
            <input
              className={inputClass}
              type="url"
              value={form.applicationUrl}
              onChange={(e) => update("applicationUrl", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Logo URL</label>
            <input
              className={inputClass}
              type="url"
              value={form.logoUrl}
              onChange={(e) => update("logoUrl", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Eligibility</label>
          <textarea
            className={`${inputClass} min-h-[60px]`}
            value={form.eligibility}
            onChange={(e) => update("eligibility", e.target.value)}
          />
        </div>
      </section>

      {/* Dates */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">
          Dates
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Opens At</label>
            <input
              className={inputClass}
              type="datetime-local"
              value={form.opensAt}
              onChange={(e) => update("opensAt", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Closes At</label>
            <input
              className={inputClass}
              type="datetime-local"
              value={form.closesAt}
              onChange={(e) => update("closesAt", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Event Date</label>
            <input
              className={inputClass}
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Prizes / PPI / Stipend */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">
          Rewards & PPI
        </h2>

        <div>
          <label className={labelClass}>Prizes</label>
          <textarea
            className={`${inputClass} min-h-[60px]`}
            value={form.prizes}
            onChange={(e) => update("prizes", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Stipend</label>
          <input
            className={inputClass}
            value={form.stipend}
            onChange={(e) => update("stipend", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="ppi"
            checked={form.isPPIOffering}
            onChange={(e) => update("isPPIOffering", e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          <label htmlFor="ppi" className="text-sm font-medium">
            Offers PPI (Pre-Placement Interview)
          </label>
        </div>

        {form.isPPIOffering && (
          <div>
            <label className={labelClass}>PPI Details</label>
            <textarea
              className={`${inputClass} min-h-[60px]`}
              value={form.ppiDetails}
              onChange={(e) => update("ppiDetails", e.target.value)}
            />
          </div>
        )}
      </section>

      {/* Rounds — for hiring challenges, hackathons, and programs */}
      {(form.category === "hiring_challenge" ||
        form.category === "hackathon" ||
        form.category === "internship") && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-lg font-semibold">Rounds</h2>
            <button
              type="button"
              onClick={() =>
                update("rounds", [
                  ...form.rounds,
                  { name: "", description: "", timeline: "" },
                ])
              }
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add Round
            </button>
          </div>
          {form.rounds.map((round, i) => (
            <div
              key={i}
              className="p-3 rounded-md border border-border space-y-2 relative"
            >
              <button
                type="button"
                onClick={() =>
                  update(
                    "rounds",
                    form.rounds.filter((_, j) => j !== i)
                  )
                }
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <input
                className={inputClass}
                placeholder="Round name"
                value={round.name}
                onChange={(e) => {
                  const updated = [...form.rounds];
                  updated[i] = { ...updated[i], name: e.target.value };
                  update("rounds", updated);
                }}
              />
              <input
                className={inputClass}
                placeholder="Timeline (e.g. March 2025)"
                value={round.timeline}
                onChange={(e) => {
                  const updated = [...form.rounds];
                  updated[i] = { ...updated[i], timeline: e.target.value };
                  update("rounds", updated);
                }}
              />
              <textarea
                className={`${inputClass} min-h-[50px]`}
                placeholder="Description"
                value={round.description}
                onChange={(e) => {
                  const updated = [...form.rounds];
                  updated[i] = { ...updated[i], description: e.target.value };
                  update("rounds", updated);
                }}
              />
            </div>
          ))}
        </section>
      )}

      {/* Steps / Timeline / Tips — for open source and programs */}
      {(form.category === "open_source" ||
        form.category === "internship") && (
        <>
          {/* Steps */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-semibold">Application Steps</h2>
              <button
                type="button"
                onClick={() =>
                  update("steps", [
                    ...form.steps,
                    {
                      step: form.steps.length + 1,
                      title: "",
                      description: "",
                    },
                  ])
                }
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add Step
              </button>
            </div>
            {form.steps.map((step, i) => (
              <div
                key={i}
                className="p-3 rounded-md border border-border space-y-2 relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "steps",
                      form.steps.filter((_, j) => j !== i)
                    )
                  }
                  className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="flex gap-2">
                  <input
                    className={`${inputClass} w-16`}
                    type="number"
                    value={step.step}
                    onChange={(e) => {
                      const updated = [...form.steps];
                      updated[i] = {
                        ...updated[i],
                        step: parseInt(e.target.value) || i + 1,
                      };
                      update("steps", updated);
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Step title"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...form.steps];
                      updated[i] = { ...updated[i], title: e.target.value };
                      update("steps", updated);
                    }}
                  />
                </div>
                <textarea
                  className={`${inputClass} min-h-[50px]`}
                  placeholder="Description"
                  value={step.description}
                  onChange={(e) => {
                    const updated = [...form.steps];
                    updated[i] = {
                      ...updated[i],
                      description: e.target.value,
                    };
                    update("steps", updated);
                  }}
                />
              </div>
            ))}
          </section>

          {/* Timeline */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-semibold">Timeline</h2>
              <button
                type="button"
                onClick={() =>
                  update("timeline", [
                    ...form.timeline,
                    { phase: "", period: "", description: "" },
                  ])
                }
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add Phase
              </button>
            </div>
            {form.timeline.map((phase, i) => (
              <div
                key={i}
                className="p-3 rounded-md border border-border space-y-2 relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "timeline",
                      form.timeline.filter((_, j) => j !== i)
                    )
                  }
                  className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className={inputClass}
                    placeholder="Phase name"
                    value={phase.phase}
                    onChange={(e) => {
                      const updated = [...form.timeline];
                      updated[i] = { ...updated[i], phase: e.target.value };
                      update("timeline", updated);
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Period (e.g. Jan-Feb)"
                    value={phase.period}
                    onChange={(e) => {
                      const updated = [...form.timeline];
                      updated[i] = { ...updated[i], period: e.target.value };
                      update("timeline", updated);
                    }}
                  />
                </div>
                <textarea
                  className={`${inputClass} min-h-[50px]`}
                  placeholder="Description"
                  value={phase.description}
                  onChange={(e) => {
                    const updated = [...form.timeline];
                    updated[i] = {
                      ...updated[i],
                      description: e.target.value,
                    };
                    update("timeline", updated);
                  }}
                />
              </div>
            ))}
          </section>

          {/* Tips */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="text-lg font-semibold">Pro Tips</h2>
              <button
                type="button"
                onClick={() => update("tips", [...form.tips, ""])}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add Tip
              </button>
            </div>
            {form.tips.map((tip, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputClass}
                  placeholder="Tip"
                  value={tip}
                  onChange={(e) => {
                    const updated = [...form.tips];
                    updated[i] = e.target.value;
                    update("tips", updated);
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    update(
                      "tips",
                      form.tips.filter((_, j) => j !== i)
                    )
                  }
                  className="p-2 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Tags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {form.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-accent text-accent-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() =>
                  update(
                    "tags",
                    form.tags.filter((_, j) => j !== i)
                  )
                }
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className={inputClass}
            placeholder="Add tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const tag = tagInput.trim();
                if (tag && !form.tags.includes(tag)) {
                  update("tags", [...form.tags, tag]);
                }
                setTagInput("");
              }
            }}
          />
        </div>
      </section>

      {/* Publish settings */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">
          Settings
        </h2>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            Featured on homepage
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Company Slug</label>
            <input
              className={inputClass}
              placeholder="e.g. amazon, google"
              value={form.companySlug}
              onChange={(e) => update("companySlug", e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              Links to an internal /companies page.
            </p>
          </div>
          <div>
            <label className={labelClass}>Company Website URL</label>
            <input
              className={inputClass}
              type="url"
              placeholder="https://careers.example.com"
              value={form.companyUrl}
              onChange={(e) => update("companyUrl", e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              External official site.
            </p>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-md text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
