export const BRANCH_GROUPS = [
  {
    label: "Computer Science & Allied",
    branches: [
      "CSE",
      "CSE (AI/ML)",
      "CSE (Data Science)",
      "CSE (Cyber Security)",
      "CSE (IoT)",
      "CSE (Cloud Computing)",
      "Information Technology",
      "Software Engineering",
    ],
  },
  {
    label: "Electronics & Communication",
    branches: [
      "ECE",
      "ECE (VLSI)",
      "Electronics & Instrumentation",
    ],
  },
  {
    label: "Electrical & Power",
    branches: [
      "Electrical Engineering",
      "Electrical & Electronics (EEE)",
    ],
  },
  {
    label: "Core Engineering",
    branches: [
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Aerospace Engineering",
      "Biotechnology",
    ],
  },
  {
    label: "Other",
    branches: [
      "Mathematics & Computing",
      "Applied Sciences",
      "MCA",
      "BCA",
      "Other",
    ],
  },
] as const;

export const ALL_BRANCHES = BRANCH_GROUPS.flatMap((g) => g.branches);
