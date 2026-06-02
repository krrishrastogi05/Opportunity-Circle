import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const OpportunitySchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    category: String,
    description: String,
    longDescription: String,
    organizer: String,
    companySlug: String,
    companyUrl: String,
    eligibility: String,
    applicationUrl: String,
    logoUrl: String,
    opensAt: Date,
    closesAt: Date,
    endsAt: Date,
    eventDate: Date,
    recurringMonth: String,
    statusOverride: { type: String, default: "" },
    isPPIOffering: { type: Boolean, default: false },
    ppiDetails: String,
    isDiversity: { type: Boolean, default: false },
    isFemaleOnly: { type: Boolean, default: false },
    isInternational: { type: Boolean, default: false },
    prizes: String,
    stipend: String,
    rounds: [{ name: String, description: String, timeline: String }],
    steps: [{ step: Number, title: String, description: String }],
    timeline: [{ phase: String, period: String, description: String }],
    tips: [String],
    tags: [String],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Opportunity =
  mongoose.models.Opportunity ||
  mongoose.model("Opportunity", OpportunitySchema);

const opportunities = [
  // ── 1. HackOn with Amazon 6.0 ──────────────────────────────
  {
    title: "HackOn with Amazon 6.0",
    slug: "amazon-hackon-6",
    category: "hiring_challenge",
    organizer: "Amazon",
    companySlug: "amazon",
    companyUrl: "https://unstop.com/hackathons/crp-hackon-with-amazon-60-amazon-1682652",
    applicationUrl: "https://unstop.com/hackathons/crp-hackon-with-amazon-60-amazon-1682652",
    description:
      "Amazon India's flagship engineering hackathon — coding, GenAI, and scalable systems with a ₹2.25L prize pool and PPI opportunities for top performers.",
    longDescription:
      "HackOn with Amazon 6.0 is Amazon India's flagship annual hackathon for engineering students, simulating real-world product development. Teams identify customer problems, build working solutions, and present scalable ideas to Amazon leaders. The 2026 edition focuses heavily on Generative AI (GenAI), software development, cloud, and scalable architecture.\n\nBeyond cash prizes, the biggest draw is mentorship from Amazon engineers and Pre-Placement Interview (PPI) opportunities for internship and SDE roles. Registrations closed on 28 May 2026; the competition runs through the Grand Finale on 7 July 2026.",
    eligibility:
      "B.Tech / M.Tech / MCA / Integrated Dual Degree students graduating in 2027 or 2028. Minimum CGPA 6.5. Teams of 2-3 (cross-college and cross-specialization allowed). Open to CS, IT, Electrical/Electronics, Data Science, AI/ML, Cyber Security, ECE, and E&I branches.",
    closesAt: new Date("2026-05-28T23:59:00+05:30"),
    endsAt: new Date("2026-07-07T23:59:00+05:30"),
    eventDate: new Date("2026-07-07T10:00:00+05:30"),
    isPPIOffering: true,
    ppiDetails:
      "Top-performing participants receive Pre-Placement Interview (PPI) opportunities for internship or SDE roles at Amazon, plus mentorship from Amazon leaders and an 'A Day at Amazon' experience for finalists.",
    prizes: "₹2.25 Lakh total pool (₹1L / ₹75K / ₹50K)",
    featured: true,
    published: true,
    tags: ["GenAI", "AWS", "Scalable Systems", "AI/ML", "Unstop"],
    rounds: [
      {
        name: "Round 1 — Coding Challenge (Proctored)",
        timeline: "30 May 2026 · 100 minutes · Individual",
        description:
          "Online proctored assessment every team member must clear individually: DSA coding problems, logical reasoning, and GenAI/LLM-based MCQs. Focus on LeetCode medium DSA (Arrays, Trees, Graphs, DP) and GenAI fundamentals.",
      },
      {
        name: "Round 2 — Virtual 48-Hour Hackathon",
        timeline: "12–15 June 2026 · Team",
        description:
          "Kickoff webinar (12 June) shares the problem statements. Teams build a working prototype solving a real customer problem and submit a project document, demo video, and prototype. Documentation and presentation quality matter.",
      },
      {
        name: "Round 3 — Mentorship Round",
        timeline: "29 June – 3 July 2026 · Team",
        description:
          "Selected teams receive mentorship from Amazon engineers and tech leaders to improve system architecture, product thinking, scalability, and presentation clarity.",
      },
      {
        name: "Round 4 — Grand Finale (In-Person)",
        timeline: "7 July 2026 · In-person",
        description:
          "Top teams present to a jury from AWS, Amazon Devices, and Amazon Pay. Judged on technical quality, innovation, customer impact, scalability, and presentation. Winners receive cash prizes and PPI opportunities.",
      },
    ],
    tips: [
      "Every team member must individually clear the Round 1 Coding Challenge for the team to advance.",
      "Brush up GenAI basics and prompt engineering alongside DSA.",
      "Invest in documentation and demo quality — many teams underestimate it.",
    ],
  },

  // ── 2. Goldman Sachs India Hackathon 2026 ──────────────────
  {
    title: "Goldman Sachs India Hackathon 2026",
    slug: "goldman-sachs-india-hackathon-2026",
    category: "hiring_challenge",
    organizer: "Goldman Sachs",
    companySlug: "goldman-sachs",
    companyUrl:
      "https://www.goldmansachs.com/careers/students/programs-and-internships/india/hackathon",
    applicationUrl:
      "https://www.goldmansachs.com/careers/students/programs-and-internships/india/hackathon",
    description:
      "A 12-hour CS & Quant coding challenge across 2 days. Top performers are fast-tracked to a Pre-Placement Interview with Goldman Sachs.",
    longDescription:
      "Goldman Sachs India Hackathon (GSIH) is a 12-hour coding challenge spread across two days, with separate Computer Science (CS) and Quantitative (Quant) tracks — compete in either or both. Solve real-world financial and technological problems, showcase analytical and programming skills, and stand a chance to win prizes and a Pre-Placement Interview (PPI) with Goldman Sachs.\n\nShortlisted candidates attend a mentorship session in June and the finale event at the Goldman Sachs campus. Applications were open 22 April – 10 May 2026.",
    eligibility:
      "Students from engineering courses graduating in 2027 & 2028 from eligible colleges. Individual participation only — each participant needs a HackerRank profile.",
    closesAt: new Date("2026-05-10T23:59:00+05:30"),
    endsAt: new Date("2026-06-30T23:59:00+05:30"),
    isPPIOffering: true,
    ppiDetails:
      "Outstanding performers are fast-tracked to a Pre-Placement Interview (PPI) with Goldman Sachs for engineering or quant roles, plus mentorship and career guidance from GS experts.",
    prizes:
      "1st: MacBook Air M5 · 2nd: iPhone 17 · 3rd: iPad Air + PPI for top performers",
    published: true,
    tags: ["CS Track", "Quant Track", "Finance + Tech", "HackerRank", "Individual"],
    rounds: [
      {
        name: "12-Hour Online Challenge",
        timeline: "23 May (Quant) · 24 May (CS) 2026 · 9 AM–9 PM IST",
        description:
          "Online individual challenge on HackerRank with real-world/simulated datasets. CS track covers DSA, algorithms, optimization; Quant track covers probability, statistics, calculus, and linear algebra. Attempt one or both.",
      },
      {
        name: "Mentorship Session",
        timeline: "June 2026 · By invite",
        description:
          "Shortlisted candidates attend a mentorship session with Goldman Sachs professionals — also the evaluation stage for PPI candidates.",
      },
      {
        name: "Finale Event",
        timeline: "June 2026 · GS Campus",
        description:
          "Finalists are invited to the Goldman Sachs campus. Top performers are extended PPI offers for engineering or quantitative roles.",
      },
    ],
    tips: [
      "Create and complete your HackerRank profile before registering.",
      "The Quant track rewards strong probability, statistics, and linear algebra — not just DSA.",
      "Watch your registered email for the participation invite and reminders.",
    ],
  },

  // ── 3. Flipkart Gridlock 2.0 (general hackathon) ───────────
  {
    title: "Flipkart Gridlock 2.0",
    slug: "flipkart-gridlock-2",
    category: "hackathon",
    organizer: "Flipkart",
    companySlug: "flipkart",
    companyUrl: "https://gridlock2point0.hackerearth.com/",
    applicationUrl: "https://gridlock2point0.hackerearth.com/",
    description:
      "Flipkart × Bengaluru Traffic Police × HackerEarth — build AI/ML models on real Bengaluru traffic data. ₹5,00,000 prize pool, open to all of India.",
    longDescription:
      "Gridlock Hackathon 2.0 is Flipkart's call to India's sharpest AI/ML minds to build real solutions on real Bengaluru traffic data — with a real shot at going live on the city's roads. Teams design AI models that classify congestion, detect violations, identify movement patterns, and support smarter mobility decisions, using authentic data from the Bengaluru Traffic Police (ASTraM) and MapMyIndia — not simulations.\n\nOpen to students and professionals anywhere in India, solo or in teams of up to 4. Three phases: an online ML challenge, prototype development with exclusive datasets, and an onsite finale at Flipkart HQ Bengaluru.",
    eligibility:
      "Open to students and professionals from anywhere in India — no specific city, academic background, or credential required. Solo builders or teams of up to 4.",
    opensAt: new Date("2026-05-26T00:00:00+05:30"),
    closesAt: new Date("2026-06-07T23:59:00+05:30"),
    endsAt: new Date("2026-07-03T23:59:00+05:30"),
    eventDate: new Date("2026-07-03T10:00:00+05:30"),
    isPPIOffering: false,
    prizes: "₹5,00,000 total (₹2.25L / ₹1.75L / ₹1L)",
    featured: true,
    published: true,
    tags: ["AI/ML", "Computer Vision", "Open to All", "HackerEarth", "Bengaluru"],
    rounds: [
      {
        name: "Phase 1 — Online ML Challenge",
        timeline: "26 May – 7 June 2026 · Online (HackerEarth)",
        description:
          "Register solo or as a team of up to 4 and compete on a live ML challenge with a real-time leaderboard. Up to 50 submissions per participant/team — refine your model and climb the ranking.",
      },
      {
        name: "Phase 2 — Prototype Development",
        timeline: "8–21 June 2026 · Online",
        description:
          "Shortlisted teams build prototypes on real Bengaluru traffic challenges using localized datasets from Bengaluru Traffic Police and partner resources. Evaluated by an expert panel on feasibility, relevance, innovation, and real-world impact.",
      },
      {
        name: "Phase 3 — Onsite Finale",
        timeline: "3 July 2026 · Flipkart HQ, Bengaluru",
        description:
          "Top 10 teams pitch live at Flipkart HQ before subject-matter experts and Bengaluru Traffic Police leadership. In-person attendance is mandatory to remain prize-eligible. Top 3 are felicitated by the Head of Bengaluru Traffic Police and Flipkart leadership.",
      },
    ],
    tips: [
      "The leaderboard rewards early effort — start Phase 1 as soon as it opens.",
      "You get up to 50 submissions; iterate aggressively on your model.",
      "Finalists must attend onsite at Flipkart HQ to stay prize-eligible.",
    ],
  },

  // ── 4. Google Cloud Rapid Agent Hackathon (international) ───
  {
    title: "Google Cloud Rapid Agent Hackathon",
    slug: "google-cloud-rapid-agent-hackathon",
    category: "hackathon",
    organizer: "Google",
    companySlug: "google",
    companyUrl: "https://devpost.com/",
    applicationUrl: "https://devpost.com/",
    description:
      "Build AI agents that reason, plan, and act — powered by Gemini 3 and Google Cloud Agent Builder. $60,000 in cash across six partner tracks. International, on Devpost.",
    longDescription:
      "Building Agents for Real-World Challenges is your chance to move beyond the chatbot and build agents that accomplish tasks. Built with Gemini's advanced reasoning and technology-partner solutions, you create agents that reason, plan, and execute under your oversight.\n\nSix partner tracks are live (Arize, Elastic, Fivetran, GitLab, MongoDB, Dynatrace). Each has its own prize bucket — you compete within the partner technology you used via its MCP server. Example domains: 2026 World Cup logistics, financial services, and brick-and-mortar retail. Managed by Devpost.",
    eligibility:
      "Above the legal age of majority in your country of residence. Some countries/territories excluded (see official rules). International — open worldwide.",
    closesAt: new Date("2026-06-12T02:30:00+05:30"),
    isPPIOffering: false,
    isInternational: true,
    prizes: "$60,000 total — per partner bucket: $5,000 / $3,000 / $2,000",
    published: true,
    tags: ["Gemini", "AI Agents", "Google Cloud", "International", "Devpost"],
    rounds: [
      {
        name: "Pick a Partner Track",
        timeline: "Arize · Elastic · Fivetran · GitLab · MongoDB · Dynatrace",
        description:
          "Choose the partner technology that best fits the mission you want to accomplish. You'll be judged within that partner's bucket.",
      },
      {
        name: "Build Your Agent",
        timeline: "Online · Gemini 3 + Google Cloud Agent Builder",
        description:
          "Build an agent with Gemini 3 using Google Cloud Agent Builder, integrating the partner's Model Context Protocol (MCP) server. It must use tools to accomplish multi-step tasks — not just answer questions.",
      },
      {
        name: "Submit on Devpost",
        timeline: "Deadline 12 June 2026",
        description:
          "Submit a hosted project URL, a public open-source repo (with a visible license), a ~3-minute demo video, and your selected track via the Devpost submission form.",
      },
    ],
    tips: [
      "Pick one partner track early and lean into its MCP server's strengths.",
      "Show a multi-step mission where the agent plans and executes, not just chats.",
      "Your repo must be public with a detectable open-source license at submission.",
    ],
  },

  // ── 5. Outreachy (open source · diversity) ─────────────────
  {
    title: "Outreachy",
    slug: "outreachy",
    category: "open_source",
    organizer: "Software Freedom Conservancy",
    companyUrl: "https://www.outreachy.org/",
    applicationUrl: "https://www.outreachy.org/",
    description:
      "Paid, remote, 3-month open-source internships ($7,000 USD) for people who face underrepresentation, systemic bias, or discrimination in tech.",
    longDescription:
      "Outreachy provides paid, remote internships in open source to anyone from any background who faces underrepresentation, systemic bias, or discrimination in the tech industry where they live. Projects span programming, research, UX, documentation, design, data science, and more.\n\nIt runs two cohorts a year (May–August and December–March). Selection is contribution-based: after your initial application is approved, you enter a contribution period where you actively contribute to projects, and mentors select interns from there. Note: past GSoC contributors are not eligible. Outreachy is a diversity initiative of the Software Freedom Conservancy.",
    eligibility:
      "Anyone who faces underrepresentation, systemic bias, or discrimination in the tech industry of their country. Must be available full-time (30–40 hrs/week). NOT open to past Outreachy interns or past GSoC contributors.",
    stipend: "$7,000 USD + up to $500 travel stipend",
    recurringMonth: "February (May cohort) & August (Dec cohort)",
    statusOverride: "upcoming",
    isDiversity: true,
    isPPIOffering: false,
    published: true,
    tags: ["Underrepresented in tech", "$7K stipend", "Remote", "Beginner-friendly", "2 cohorts/year"],
    steps: [
      { step: 1, title: "Check eligibility carefully", description: "You must face underrepresentation in your country's tech industry, be available full-time, and not be a past GSoC/Outreachy participant. Read outreachy.org/eligibility." },
      { step: 2, title: "Submit the initial application", description: "Answer essay questions about your background and experiences with systemic bias or underrepresentation. Be genuine and specific." },
      { step: 3, title: "Enter the contribution period", description: "If approved, choose 1–2 projects, join their community, and make real contributions. This is where selection actually happens." },
      { step: 4, title: "Submit your final application", description: "For each project, describe your contributions and your internship plan. Mentors select primarily on contribution quality." },
    ],
    timeline: [
      { phase: "Initial applications (May cohort)", period: "Feb 6 – Feb 13", description: "Dec cohort applications open early–mid August" },
      { phase: "Contribution period", period: "Mar 17 – Apr 15", description: "Where selection really happens — contribute actively" },
      { phase: "Interns announced", period: "Late April / October", description: "" },
      { phase: "Internship runs", period: "May 18 – Aug 17 (or Dec–Mar)", description: "3 months, remote, full-time" },
    ],
    tips: [
      "The contribution period decides selection — not your essays. Contribute early and in public.",
      "Pick projects where you can start contributing within the first week.",
      "Past GSoC contributors are ineligible — this is strictly enforced.",
    ],
  },

  // ── 6. LFX Mentorship — Term 3 (Fall) ──────────────────────
  {
    title: "LFX Mentorship — Term 3 (Fall)",
    slug: "lfx-mentorship-term-3",
    category: "open_source",
    organizer: "Linux Foundation",
    companyUrl: "https://mentorship.lfx.linuxfoundation.org/",
    applicationUrl: "https://mentorship.lfx.linuxfoundation.org/",
    description:
      "The Linux Foundation's paid mentorship across CNCF, OpenSSF, and 50+ top open-source projects. Term 3 (Fall) applications open around July–August.",
    longDescription:
      "LFX Mentorship runs three terms a year; Term 3 (Fall) is the final cohort of the year. You work on real production code in major open-source ecosystems — CNCF (Kubernetes, Argo, Prometheus, Helm), OpenSSF, Hyperledger, and more — under a mentor, and get paid for it.\n\nDates below are the typical/expected Term 3 window based on previous years and may shift slightly — always confirm on the official LFX portal once the term is announced.",
    eligibility:
      "Open to anyone with the required skills for a project (students and early-career devs especially). A complete LFX profile (GitHub, resume) is required. Many projects also require a prerequisite task during the application window.",
    opensAt: new Date("2026-07-21T00:00:00Z"),
    closesAt: new Date("2026-08-13T23:59:00Z"),
    endsAt: new Date("2026-11-30T23:59:00Z"),
    recurringMonth: "July–August (Term 3 / Fall)",
    stipend: "$3,000 – $6,600",
    isInternational: true,
    published: true,
    tags: ["Linux Foundation", "CNCF", "Kubernetes", "Cloud Native", "Term 3 / Fall"],
    steps: [
      { step: 1, title: "Complete your LFX profile", description: "Sign up at mentorship.lfx.linuxfoundation.org as a mentee; add GitHub, LinkedIn, and resume. Incomplete profiles are auto-rejected." },
      { step: 2, title: "Browse Term 3 projects", description: "Filter for 'Accepting Applications'. CNCF projects (Kubernetes, Argo, Prometheus, Helm) are the most resume-relevant." },
      { step: 3, title: "Join the community + do the prerequisite task", description: "Join the project's Slack, read recent PRs/issues, and complete any required prerequisite task — these are eliminatory." },
      { step: 4, title: "Write a tailored Statement of Purpose", description: "Explain what the project does, what the task involves, why you're qualified, and your approach. Generic SoPs get filtered fast." },
    ],
    timeline: [
      { phase: "Applications open (expected)", period: "~21 July 2026", description: "Confirm exact dates on the LFX portal" },
      { phase: "Application deadline (expected)", period: "~13 August 2026", description: "Complete prerequisite tasks before this" },
      { phase: "Mentee selection", period: "Late August 2026", description: "Mentors review and select" },
      { phase: "Mentorship term", period: "September – November 2026", description: "~12 weeks, with a midterm evaluation" },
      { phase: "Stipend payments", period: "Midterm (50%) + completion (50%)", description: "" },
    ],
    tips: [
      "Term 3 dates shift year to year — set a reminder for mid-July and confirm on the official portal.",
      "The prerequisite task is non-negotiable; treat it as step zero.",
      "Apply to 3–5 projects and tailor each Statement of Purpose.",
      "CNCF contributions are the most recognisable to cloud-native hiring teams.",
    ],
  },

  // ── 7. Amazon WoW — Women of the World (diversity) ─────────
  {
    title: "Amazon WoW – Career Readiness Program for Women",
    slug: "amazon-wow",
    category: "internship",
    organizer: "Amazon",
    companySlug: "amazon",
    companyUrl: "https://app.brazenconnect.com/a/asp-sdengineering/e/28N38",
    applicationUrl: "https://app.brazenconnect.com/a/asp-sdengineering/e/28N38",
    description:
      "A free career-readiness and skill-building program by Amazon for women students — leadership skills, mentorship, and a direct line to Amazon's University Recruitment team.",
    longDescription:
      "Amazon WoW (Women of the World) is a free career readiness and skill-building program designed to support women pursuing careers in technology and other fields.\n\nThe programming helps you build professional and leadership skills, explore career paths, expand your network, and learn from inspiring women professionals — all to get you ready for internships and full-time roles. Students registered through the WoW portal are periodically contacted by Amazon's University team for full-time graduate and internship opportunities. There is no cost to participate.",
    eligibility:
      "Open to all women students currently pursuing university education, and women who graduated within the last 24 months.",
    statusOverride: "registration_open",
    isFemaleOnly: true,
    isDiversity: true,
    prizes: "Free · skill sessions + Amazon recruiter access",
    published: true,
    tags: ["Women only", "Career Readiness", "Free", "Networking", "Amazon"],
    steps: [
      { step: 1, title: "Register on the WoW portal", description: "Click 'Register Now' on the Amazon WoW (Brazen) portal to create your profile. It's completely free." },
      { step: 2, title: "Attend skill & career sessions", description: "Join sessions on professional skills, leadership, and career readiness, and hear from women professionals at Amazon." },
      { step: 3, title: "Network & get noticed", description: "Connect with Amazon's University Recruitment team — registered students are contacted for internship and full-time graduate opportunities." },
    ],
    tips: [
      "Register early and keep your profile complete — that's how the recruiting team reaches out.",
      "Attend live sessions; engagement is what builds the network and visibility.",
      "Eligible if you graduated within the last 24 months, not just current students.",
    ],
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.");

  console.log("Clearing existing opportunities...");
  await Opportunity.deleteMany({});

  console.log("Seeding real opportunities...");
  await Opportunity.insertMany(opportunities);
  console.log(`  Inserted ${opportunities.length} opportunities`);

  console.log("Done!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
