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

// Minimal schema (strict:false keeps it flexible with the app's model).
const OpportunitySchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Opportunity =
  mongoose.models.Opportunity ||
  mongoose.model("Opportunity", OpportunitySchema);

const codeWithCisco = {
  title: "Code with Cisco",
  category: "hiring_challenge",
  organizer: "Cisco",
  companySlug: "cisco",
  companyUrl: "https://careers.cisco.com/global/en/india/etr/code-with-cisco",
  applicationUrl: "https://careers.cisco.com/global/en/india/etr/code-with-cisco",
  description:
    "India's premier code-a-thon by Cisco — solve real-world challenges and fast-track to an internship or full-time role. Open to all branches, no CGPA barrier.",
  longDescription:
    "Code with Cisco is more than a code-a-thon — it's a direct, merit-based route into internship and full-time engineering roles at Cisco. It's open to students from any college, degree, or department (no CGPA, specialization, or location barrier) who are passing out in the eligible year.\n\nClear the Cisco Common Entrance Test, advance through the online stages, and the top contestants are flown to the Cisco Bengaluru campus for a sponsored 2-day in-person code-a-thon and demos — with prizes for the top teams and offers for strong performers.",
  eligibility:
    "Final-year engineering students based in India passing out in 2027, with no backlogs. Open to all degree programs and branches. Individual registration via your college placement cell (teams are assigned by Cisco).",
  opensAt: new Date("2026-06-01T00:00:00+05:30"),
  closesAt: new Date("2026-06-24T23:59:00+05:30"),
  endsAt: new Date("2026-07-17T23:59:00+05:30"),
  eventDate: new Date("2026-07-16T10:00:00+05:30"),
  isPPIOffering: true,
  ppiDetails:
    "A direct route into Cisco — top performers receive internship and full-time offers. The whole funnel is the hiring process: clear the CCET, reach the finale, and convert.",
  prizes: "Internship / full-time offers + prizes for the top 3 teams",
  tags: ["Code-a-thon", "Cisco", "All branches", "2027 batch", "Bengaluru"],
  rounds: [
    {
      name: "Registration & Kick-off",
      timeline: "1 June 2026 · via placement cell",
      description:
        "Eligible final-year students register through their college placement cell. Individual registration only — teams are assigned later by Cisco.",
    },
    {
      name: "Common Entrance Test (CCET)",
      timeline: "25 June 2026 · 90 min · AI-proctored",
      description:
        "Online assessment combining multiple-choice questions and coding challenges. No negative marking; 30-minute login window. Remotely AI + video proctored.",
    },
    {
      name: "Code-a-thon Begins — Top 75",
      timeline: "30 June 2026",
      description:
        "The top 75 contestants are announced and grouped into teams. Align on pre-work and kickstart collaboration before the finale.",
    },
    {
      name: "Travel + In-person Code-a-thon",
      timeline: "15–17 July 2026 · Cisco Bengaluru",
      description:
        "A Cisco-sponsored 2-day in-person code-a-thon and demos at the Bengaluru campus. Top three teams win prizes and network with industry experts.",
    },
  ],
  tips: [
    "Register through your placement cell as soon as it opens — test links are unique per student.",
    "Revise CS fundamentals (OS, DBMS, networking), not just DSA — it's an infrastructure company.",
    "No negative marking in the CCET — attempt every MCQ.",
    "Teams are assigned by Cisco; communication and collaboration matter in the finale.",
  ],
  featured: false,
  published: true,
};

async function run() {
  await mongoose.connect(MONGODB_URI!);
  const slug = "code-with-cisco";
  const res = await Opportunity.updateOne(
    { slug },
    { $set: { ...codeWithCisco, slug } },
    { upsert: true }
  );
  if (res.upsertedCount) console.log(`Inserted "${slug}".`);
  else console.log(`Updated "${slug}" (already existed).`);

  const total = await Opportunity.countDocuments();
  console.log(`Total opportunities now: ${total}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
