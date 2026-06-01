// Simplified, pooled branch list — easier to maintain and filter on.
// CS-family is one option, electronics-family one, etc.
export const BRANCHES = [
  "Computer Science & related (CSE, IT, AI/ML, Data Science, Cyber Security)",
  "Electronics & related (ECE, EEE, E&I, VLSI)",
  "Electrical",
  "Mechanical / Civil / Core",
  "Other / Non-circuital",
] as const;

export type Branch = (typeof BRANCHES)[number];

export const ALL_BRANCHES: readonly string[] = BRANCHES;
