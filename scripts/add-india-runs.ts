import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

const Opportunity =
  mongoose.models.Opportunity ||
  mongoose.model(
    "Opportunity",
    new mongoose.Schema({}, { strict: false, timestamps: true })
  );

const indiaRuns = {
  title: "India Runs — Redrob AI Hackathon",
  category: "hackathon",
  organizer: "Redrob",
  // No internal company page yet; logo resolves from /companies/redrob.png
  companyUrl: "https://hack2skill.com/",
  applicationUrl: "https://hack2skill.com/",
  description:
    "India's most open hackathon by Redrob AI (Hack2skill) — open to everyone, no code or degree needed. ₹50 Lakh+ prize pool across 3 tracks over 42 days.",
  longDescription:
    "India has 1.4 billion people, and almost none of them have an AI tool built for their reality. India Runs is where Redrob AI gets built — with you. Builders, thinkers, designers, students, first-timers.\n\nIf you've ever looked at how India works, hires, learns, and earns and thought 'this should be different,' this is your arena. Three tracks, equal stage: one for builders, one for thinkers, and one for voices. Free to enter, open to all.",
  eligibility:
    "Open to all — any city, any stream, any background. Students and non-students, coders and non-coders, first-timers welcome. No registration fee, no eligibility filters.",
  prizes: "₹50 Lakh+ across 3 tracks",
  opensAt: new Date("2026-05-19T00:00:00+05:30"),
  closesAt: new Date("2026-06-28T23:59:00+05:30"), // registrations close
  endsAt: new Date("2026-07-22T23:59:00+05:30"), // grand finale
  isInternational: false,
  featured: true,
  published: true,
  tags: ["Open to all", "₹50L Prize", "3 Tracks", "42 Days", "AI", "Hack2skill"],
  tracks: [
    {
      name: "Track 1 — The Data & AI Challenge",
      prize: "₹10 Lakhs",
      description:
        "Build it. Ship a working system for intelligent candidate discovery. For AI/ML engineers, data scientists, developers, search & LLM practitioners.",
      opensAt: new Date("2026-05-19T00:00:00+05:30"),
      closesAt: new Date("2026-06-28T23:59:00+05:30"),
    },
    {
      name: "Track 2 — The Ideathon",
      prize: "₹30 Lakhs",
      description:
        "Imagine it. Pitch a product, strategy, or feature that should exist. For MBAs, product thinkers, designers, students, and first-timers — pick the problem statement that fits you.",
      opensAt: new Date("2026-06-03T00:00:00+05:30"),
      closesAt: new Date("2026-07-02T23:59:00+05:30"),
    },
    {
      name: "Track 3 — Social Media Challenge",
      prize: "₹10 Lakhs",
      description:
        "Share it. Tell honest stories and create content about AI. For creators, students, and first-timers — purely social-driven.",
      opensAt: new Date("2026-05-24T00:00:00+05:30"),
      closesAt: new Date("2026-06-04T23:59:00+05:30"),
    },
  ],
  rounds: [
    {
      name: "Register (free)",
      timeline: "From 19 May 2026",
      description: "Sign up at no cost — no registration fee, no eligibility filters.",
    },
    {
      name: "Pick your track",
      timeline: "One or more of 3 tracks",
      description:
        "Choose Data & AI, Ideathon, or Social Media (you can enter multiple). In the Ideathon, pick the problem statement that fits you.",
    },
    {
      name: "Build for 42 days",
      timeline: "Your own schedule",
      description:
        "Access datasets, resources, and mentorship. Work in your own way over the 42-day window.",
    },
    {
      name: "Submit your project",
      timeline: "Per-track deadline",
      description:
        "Follow your selected track's submission checklist — each track has its own closing date (see Tracks above).",
    },
    {
      name: "Win, get noticed, get hired",
      timeline: "Grand Finale — 22 July 2026",
      description:
        "Top participants take cash prizes, get featured on Redrob, and earn a direct line to the team building India's next AI products.",
    },
  ],
  tips: [
    "It's free and open to all — first-timers and non-coders are explicitly welcome.",
    "Each track closes on a different date — the Social Media track closes earliest (4 June).",
    "You can enter multiple tracks; play to your strength.",
  ],
};

async function run() {
  await mongoose.connect(MONGODB_URI!);
  const slug = "india-runs-redrob";
  const res = await Opportunity.updateOne(
    { slug },
    { $set: { ...indiaRuns, slug } },
    { upsert: true }
  );
  if (res.upsertedCount) console.log(`Inserted "${slug}".`);
  else console.log(`Updated "${slug}".`);
  console.log(`Total opportunities now: ${await Opportunity.countDocuments()}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
