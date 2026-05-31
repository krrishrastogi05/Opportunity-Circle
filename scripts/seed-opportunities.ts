import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Load .env.local first, then .env as fallback
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
    organizer: String,
    companySlug: String,
    eligibility: String,
    applicationUrl: String,
    logoUrl: String,
    opensAt: Date,
    closesAt: Date,
    eventDate: Date,
    isPPIOffering: { type: Boolean, default: false },
    ppiDetails: String,
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

const hackathons = [
  {
    title: "HackOn with Amazon",
    slug: "amazon-hackon",
    category: "hiring_challenge",
    description:
      "Amazon's flagship engineering hackathon. Solve real-world problems across AWS, Amazon Pay, Alexa, and Shopping — and fast-track your way to a PPI.",
    organizer: "Amazon",
    companySlug: "amazon",
    eligibility:
      "B.Tech / M.Tech / MCA students. Teams of 2–3. Minimum CGPA 6.5. Only eligible colleges as recognised by Amazon.",
    applicationUrl: "https://unstop.com/hackathons/amazon-hackon",
    isPPIOffering: true,
    ppiDetails:
      "Top finalists receive a PPI for Amazon internship/FTE roles, bypassing the OA screening round.",
    prizes: "Up to ₹2.25 Lakhs + swag + Amazon goodies",
    opensAt: new Date("2026-06-01"),
    closesAt: new Date("2026-07-15"),
    tags: ["AWS", "Alexa", "Amazon Pay", "Shopping"],
    rounds: [
      {
        name: "Round 1 — Coding Challenge",
        description:
          "Every team member must individually complete a proctored test. Includes DSA coding problems (Medium–Hard) + MCQs covering CS fundamentals and GenAI-based questions.",
        timeline: "Individual · Proctored",
      },
      {
        name: "Round 2 — Idea & Prototype Submission",
        description:
          "Shortlisted teams submit a project idea targeting a real Amazon business problem. Then build and submit a working prototype with demo video, documentation, and a GitHub repository.",
        timeline: "Team · Async",
      },
      {
        name: "Round 3 — Mentorship & Refinement",
        description:
          "Top prototype teams are paired with Amazon tech leaders for mentorship sessions. Teams refine their solution based on feedback before the finale.",
        timeline: "Team · Guided",
      },
      {
        name: "Grand Finale",
        description:
          "Finalists present to a jury of Amazon leaders. Judged on problem impact, technical depth, scalability, and presentation. Winners receive cash prizes and PPI opportunities.",
        timeline: "Team · In-person / Virtual",
      },
    ],
    featured: true,
    published: true,
  },
  {
    title: "Goldman Sachs India Hackathon",
    slug: "gs-hackathon",
    category: "hiring_challenge",
    description:
      "12-hour individual coding and quantitative challenge on HackerRank. One of the most direct fast-tracks to a Goldman Sachs internship PPI in India.",
    organizer: "Goldman Sachs",
    companySlug: "goldman-sachs",
    eligibility:
      "B.E. / B.Tech students (pre-final or final year) from eligible colleges. Individual participation only.",
    applicationUrl: "https://www.goldmansachs.com/careers",
    isPPIOffering: true,
    ppiDetails:
      "Outstanding performers are directly offered a PPI for GS engineering or quant internship roles.",
    prizes: "PPI + mentorship + GS campus event invite",
    opensAt: new Date("2026-06-01"),
    closesAt: new Date("2026-07-10"),
    tags: ["CS Track", "Quant Track", "Finance + Tech", "Individual"],
    rounds: [
      {
        name: "Round 1 — 12-Hour Online Challenge",
        description:
          "12-hour competitive challenge hosted on HackerRank. Two tracks: CS Track (DSA, algorithms, optimization) and Quant Track (probability, statistics, calculus, linear algebra).",
        timeline: "Individual · HackerRank",
      },
      {
        name: "Round 2 — Mentorship & Shortlisting",
        description:
          "Top performers from the challenge are invited to a mentorship session with Goldman Sachs engineers and quant professionals.",
        timeline: "Individual · By invite",
      },
      {
        name: "Round 3 — Finale Event",
        description:
          "Finalists are invited to a Finale at the Goldman Sachs India office. Top performers are extended PPI offers for engineering or quantitative internship roles.",
        timeline: "Individual · GS Campus",
      },
    ],
    featured: true,
    published: true,
  },
  {
    title: "Flipkart GRiD",
    slug: "flipkart-grid",
    category: "hiring_challenge",
    description:
      "Flipkart's annual engineering hackathon — the largest campus tech competition run by an Indian e-commerce company. Teams that reach Level 2+ become eligible for PPIs.",
    organizer: "Flipkart",
    companySlug: "flipkart",
    eligibility:
      "B.Tech / B.E. / M.Tech / M.S. students. Teams of 1–3. Cross-campus and cross-year allowed.",
    applicationUrl: "https://unstop.com/hackathons/flipkart-grid",
    isPPIOffering: true,
    ppiDetails:
      "Teams advancing to Level 2 (Prototype round) and above are eligible for Flipkart PPIs for internship and SDE-1 roles.",
    prizes: "₹ cash prizes + Flipkart swag + direct PPI pathway",
    opensAt: new Date("2026-06-20"),
    closesAt: new Date("2026-08-10"),
    tags: ["E-commerce", "Tech + Product", "India Scale", "Cross-campus teams"],
    rounds: [
      {
        name: "Level 1 — Qualifier Quiz",
        description:
          "All team members must individually clear an MCQ quiz covering e-commerce trivia, technology awareness, and CS fundamentals.",
        timeline: "Individual · MCQ",
      },
      {
        name: "Level 2 — Prototype Submission",
        description:
          "Qualifying teams receive a problem statement and build a working prototype. Teams advancing here become PPI-eligible.",
        timeline: "Team · Async",
      },
      {
        name: "Level 3 — Video Submission / Presentation",
        description:
          "Shortlisted teams create a video demonstration of their solution, presenting the problem, approach, architecture, and impact.",
        timeline: "Team · Async",
      },
      {
        name: "National Finale",
        description:
          "Top teams present live to a Flipkart engineering jury at their Bangalore HQ. Winners receive cash prizes and PPI fast-track.",
        timeline: "Team · In-person at Flipkart HQ",
      },
    ],
    featured: true,
    published: true,
  },
  {
    title: "Microsoft Engage",
    slug: "microsoft-engage",
    category: "internship",
    description:
      "Microsoft's 4-week mentorship program for second-year students. Build a real project under Microsoft engineer mentorship — strong performers are offered a PPO.",
    organizer: "Microsoft",
    companySlug: "microsoft",
    eligibility:
      "B.Tech / B.E. students specifically in their 2nd year. Open to students from a broad range of institutes.",
    applicationUrl: "https://careers.microsoft.com/",
    isPPIOffering: false,
    ppiDetails:
      "Strong performers receive a PPO (Pre-Placement Offer) for the SDE internship — even more direct than a PPI.",
    prizes: "PPO for Microsoft SDE Internship + Microsoft swag + certificate",
    tags: [
      "2nd Year Only",
      "PPO Pathway",
      "Azure",
      "4 Weeks",
      "Mentored Project",
    ],
    rounds: [
      {
        name: "Stage 1 — Application & Resume Screening",
        description:
          "Submit your application with resume and academic details. No OA required at this stage.",
        timeline: "Individual · Online",
      },
      {
        name: "Stage 2 — Coding Assessment (some editions)",
        description:
          "Some editions include a coding assessment. Easy–Medium difficulty DSA problems.",
        timeline: "Individual · Optional",
      },
      {
        name: "Stage 3 — 4-Week Mentorship Program",
        description:
          "Selected students are paired with Microsoft engineers. Work on a real project over 4 weeks with weekly check-ins.",
        timeline: "Individual · Virtual / Hybrid",
      },
      {
        name: "Stage 4 — Project Demo & PPO Decision",
        description:
          "Submit and demo your final project. High-performing participants are extended PPO for the Microsoft SDE internship.",
        timeline: "Individual · Final evaluation",
      },
    ],
    featured: true,
    published: true,
  },
  {
    title: "Google STEP Internship",
    slug: "google-step",
    category: "internship",
    description:
      "Google's early-career internship for 1st and 2nd year students. Not a hackathon — a direct internship application with a focused technical interview loop.",
    organizer: "Google",
    companySlug: "google",
    eligibility:
      "B.Tech students in 1st or 2nd year only. Apply via careers.google.com/programs/step/.",
    applicationUrl: "https://careers.google.com/programs/step/",
    isPPIOffering: false,
    ppiDetails:
      "Completing STEP successfully often fast-tracks you to a standard Google SWE internship interview in your pre-final year.",
    prizes:
      "Paid internship at Google India + mentorship + strong SWE internship pathway",
    tags: [
      "1st & 2nd Year",
      "Paid Internship",
      "Not a Hackathon",
      "Direct Apply",
    ],
    rounds: [
      {
        name: "Round 1 — Resume Screening",
        description:
          "Apply at careers.google.com/programs/step/. No OA — selection is based on resume, academic performance, and demonstrated technical interest.",
        timeline: "Individual · Online",
      },
      {
        name: "Round 2 — Technical Interview × 1–2",
        description:
          "DSA-focused interviews calibrated for 1st/2nd year students. Arrays, Strings, Trees, Graphs, basic DP.",
        timeline: "Individual · 45 min each",
      },
      {
        name: "STEP Internship (10–12 weeks)",
        description:
          "Selected students complete a 10–12 week paid internship at Google India. Paired with a mentor. Work on a real codebase.",
        timeline: "Individual · Summer",
      },
    ],
    featured: true,
    published: true,
  },
  {
    title: "Uber Star Engineer",
    slug: "uber-star",
    category: "hiring_challenge",
    description:
      "Uber's campus talent identification program. A competitive challenge that fast-tracks exceptional candidates into Uber's internship interview loop.",
    organizer: "Uber",
    companySlug: "uber",
    eligibility:
      "B.Tech / M.Tech students (pre-final year). Check official Uber Careers and Unstop for current edition eligibility.",
    applicationUrl: "https://www.uber.com/in/en/careers/",
    isPPIOffering: true,
    ppiDetails:
      "Top performers receive a fast-track PPI into Uber's internship interview loop — skipping the standard OA.",
    prizes: "PPI fast-track + Uber swag + recognition",
    tags: ["Fast-track PPI", "OA Bypass", "Competitive", "Campus"],
    rounds: [
      {
        name: "Round 1 — Online Coding Challenge",
        description:
          "Competitive DSA challenge. Medium–Hard problems: Graphs, DP, Trees, Arrays. Near-perfect performance expected.",
        timeline: "Individual · Competitive",
      },
      {
        name: "Round 2 — Technical Evaluation",
        description:
          "Top performers undergo a technical evaluation round. Assessed on problem-solving depth, code quality, and communication.",
        timeline: "Individual · Live / Async",
      },
      {
        name: "PPI Fast-track",
        description:
          "Outstanding candidates enter Uber's internship interview loop without the standard OA gate.",
        timeline: "By invite only",
      },
    ],
    featured: true,
    published: true,
  },
];

const openSourcePrograms = [
  {
    title: "Google Summer of Code",
    slug: "gsoc",
    category: "open_source",
    description:
      "The world's most prestigious open-source program. 3 months of paid coding with a mentoring organization — and a global community behind you.",
    organizer: "Google",
    applicationUrl: "https://summerofcode.withgoogle.com/",
    stipend: "~$1,500 – $3,300",
    tags: ["Google Backed", "Global", "Paid", "Any year", "Any background"],
    opensAt: new Date("2026-06-02"),
    closesAt: new Date("2026-09-08"),
    steps: [
      { step: 1, title: "Find an org early (Jan–Feb)", description: "Browse the org list at summerofcode.withgoogle.com. Pick 2–3 orgs whose tech stack you know or want to learn." },
      { step: 2, title: "Join the community & contribute", description: "Join the org's Slack / Discord / mailing list. Pick a 'good first issue' and submit a PR." },
      { step: 3, title: "Write a strong proposal (Mar–Apr)", description: "Include clear deliverables, a week-by-week timeline, your background, and evidence you've engaged with the community." },
      { step: 4, title: "Submit (April deadline)", description: "Submit on the GSoC platform. You can submit up to 3 proposals across different orgs." },
      { step: 5, title: "Community Bonding → Coding → Evaluations", description: "3–4 weeks of community bonding, then the coding period. Pass midterm and final evaluations." },
    ],
    timeline: [
      { phase: "Org applications", period: "January – February", description: "Watch the GSoC blog for org list announcement" },
      { phase: "Contributor applications", period: "March – April", description: "Start contributing in January, not March" },
      { phase: "Accepted projects announced", period: "May", description: "" },
      { phase: "Community Bonding", period: "May – June", description: "Meet your mentor, read the codebase" },
      { phase: "Coding Period", period: "June – September", description: "Weekly syncs with mentor. Commit regularly." },
      { phase: "Final results", period: "November", description: "" },
    ],
    tips: [
      "Pick orgs where you've already used the software.",
      "Submit at least one real PR before the application deadline.",
      "Write your proposal for a technical reader who doesn't know your background.",
      "Don't wait for March to start — the best contributors are already active in January.",
      "You can apply to up to 3 orgs — diversify your bets.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "LFX Mentorship",
    slug: "lfx",
    category: "open_source",
    description:
      "Linux Foundation's structured mentorship across CNCF, OpenSSF, and 50+ top open-source projects. Three terms a year.",
    organizer: "Linux Foundation",
    applicationUrl: "https://mentorship.lfx.linuxfoundation.org/",
    stipend: "$3,000 – $6,600",
    opensAt: new Date("2026-06-01"),
    closesAt: new Date("2026-07-20"),
    tags: ["Linux Foundation", "CNCF", "Kubernetes", "Cloud Native", "3 terms/year"],
    steps: [
      { step: 1, title: "Create your LFX profile", description: "Sign up at mentorship.lfx.linuxfoundation.org. Fill in GitHub, LinkedIn, and upload resume." },
      { step: 2, title: "Browse open projects", description: "Filter by 'Accepting Applications'. CNCF projects are most popular." },
      { step: 3, title: "Read the project and join the community", description: "Join the project's Slack channel. Read recent PRs and issues." },
      { step: 4, title: "Complete prerequisite tasks", description: "Many projects require a specific task during the application window — these are eliminatory." },
      { step: 5, title: "Write your Statement of Purpose", description: "Tailored cover letter explaining what the project does and why you're qualified." },
    ],
    timeline: [
      { phase: "Spring Term", period: "February", description: "Term runs March – May" },
      { phase: "Summer Term", period: "May", description: "Term runs June – August" },
      { phase: "Fall Term", period: "July – August", description: "Term runs September – November" },
      { phase: "Mentor reviews", period: "~2 weeks after close", description: "Complete prerequisite tasks before this" },
      { phase: "Coding period", period: "12 weeks", description: "Weekly syncs. Midterm eval at week 6." },
    ],
    tips: [
      "CNCF projects are the most resume-relevant.",
      "The prerequisite task is non-negotiable.",
      "Apply to 3–5 projects and tailor each application.",
      "LFX is less competitive than GSoC.",
      "Look at merged PRs to understand the code style.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "Outreachy",
    slug: "outreachy",
    category: "open_source",
    description:
      "Paid remote internships for underrepresented people in tech. $7,000 USD stipend. Focus on the contribution period.",
    organizer: "Software Freedom Conservancy",
    applicationUrl: "https://www.outreachy.org/",
    stipend: "$7,000 USD",
    tags: ["Underrepresented in tech", "$7K stipend", "Beginner-friendly", "Remote", "2 cohorts/year"],
    steps: [
      { step: 1, title: "Check eligibility carefully", description: "Must face underrepresentation in your country's tech industry. NOT a past GSoC contributor." },
      { step: 2, title: "Submit initial application with essays", description: "Essay questions about your background and experiences with systemic bias." },
      { step: 3, title: "Enter the contribution period", description: "Choose 1–2 projects. Join community, make contributions. This is where selection happens." },
      { step: 4, title: "Submit final application", description: "Describe contributions and plan for the internship. Mentors select based on contribution quality." },
    ],
    timeline: [
      { phase: "Initial applications", period: "January (May cohort) / August (Dec cohort)", description: "Check outreachy.org for exact dates" },
      { phase: "Contribution period", period: "February – March (May cohort)", description: "This is where selection really happens" },
      { phase: "Interns announced", period: "March / October", description: "" },
      { phase: "Internship starts", period: "May or December", description: "" },
    ],
    tips: [
      "The contribution period is where selection actually happens — not your essays.",
      "Pick projects where you can start contributing within the first week.",
      "Communicate in public (mailing lists, GitHub issues) not just DMs.",
      "Quality over quantity on contributions.",
      "Past GSoC contributors are ineligible — this is strictly enforced.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "MLH Fellowship",
    slug: "mlh-fellowship",
    category: "internship",
    description:
      "12-week remote internship alternative for developers. Work on open-source projects used by real companies — rolling admissions, year-round cohorts.",
    organizer: "Major League Hacking",
    applicationUrl: "https://fellowship.mlh.io/",
    stipend: "Up to $5,000",
    tags: ["Rolling admissions", "Year-round", "Open source track", "Startup track", "Explorer track"],
    steps: [
      { step: 1, title: "Choose your track", description: "Open Source, Explorer, or Startup. Open Source has the best resume value." },
      { step: 2, title: "Submit your application", description: "Include your GitHub profile — it's evaluated seriously." },
      { step: 3, title: "Behavioral interview", description: "About your background, motivation, and how you collaborate." },
      { step: 4, title: "Technical interview", description: "Standard DSA problems (Easy–Medium) and discussion of past projects." },
      { step: 5, title: "Program & weekly structure", description: "20–30 hours/week. Weekly standups, code reviews, and cohort events." },
    ],
    timeline: [
      { phase: "Applications", period: "Rolling", description: "Opens a few weeks before each batch" },
      { phase: "Interviews", period: "Within 2 weeks of applying", description: "Apply early — spots fill before the deadline" },
      { phase: "Cohort starts", period: "Every 3 months year-round", description: "" },
      { phase: "12-week program", period: "Full cohort period", description: "20–30 hrs/week" },
    ],
    tips: [
      "Apply at least 4–6 weeks before a cohort start date.",
      "Clean up your GitHub before applying. Pin 3–4 strong projects.",
      "The Open Source track is the most valuable for engineering resumes.",
      "Prepare for DSA (Easy–Medium LeetCode) for the technical interview.",
      "Read about the specific OSS projects in your chosen track before the interview.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "GirlScript Summer of Code",
    slug: "gssoc",
    category: "open_source",
    description:
      "India's largest open-source program. No stipend — but certificates, LORs, internship opportunities, and leaderboard recognition.",
    organizer: "GirlScript Foundation",
    applicationUrl: "https://gssoc.girlscript.tech/",
    stipend: "No stipend",
    opensAt: new Date("2026-06-01"),
    closesAt: new Date("2026-08-31"),
    tags: ["India", "No stipend", "Certificate", "LOR for top 25", "Beginner-friendly", "Open to all"],
    steps: [
      { step: 1, title: "Register as a contributor", description: "Sign up at gssoc.girlscript.tech. Registration is free and open to all." },
      { step: 2, title: "Pick 2–3 projects", description: "Choose projects in your tech stack. Don't spread too thin." },
      { step: 3, title: "Find issues and contribute", description: "Look for issues labelled 'GSSoC', 'good first issue', or 'help wanted'. Submit PRs for points." },
      { step: 4, title: "Track your points on the leaderboard", description: "Level 1 (10 pts), Level 2 (25 pts), Level 3 (45 pts). 60+ points = certificate. Top 25 = LOR." },
    ],
    timeline: [
      { phase: "Program registration", period: "March – April", description: "Watch gssoc.girlscript.tech for announcements" },
      { phase: "Coding period", period: "May – July", description: "3 months of contributing" },
      { phase: "Results & certificates", period: "August", description: "LORs sent to top 25 contributors" },
    ],
    tips: [
      "GSSoC is the best first open-source program — use it before GSoC or LFX.",
      "Focus on Level 2–3 issues, not just Level 1.",
      "Quality matters — maintainers can reject low-effort PRs.",
      "Use GSSoC as a stepping stone and reference contributions in your GSoC proposal.",
      "Even without a stipend, a LOR from a project maintainer is valuable.",
    ],
    featured: true,
    published: true,
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.");

  console.log("Clearing existing opportunities...");
  await Opportunity.deleteMany({});

  console.log("Seeding hackathons...");
  await Opportunity.insertMany(hackathons);
  console.log(`  Inserted ${hackathons.length} hackathons`);

  console.log("Seeding open-source programs...");
  await Opportunity.insertMany(openSourcePrograms);
  console.log(`  Inserted ${openSourcePrograms.length} open-source programs`);

  console.log(
    `Done! Total: ${hackathons.length + openSourcePrograms.length} opportunities`
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
