export interface Hackathon {
  id: string;
  name: string;
  organizer?: string;
  location: string;
  date: string;
  description: string;
  rank?: string;
  prize?: string;
  logo: string; // TODO: replace with actual hackathon logo
}

export const hackathons: Hackathon[] = [
  {
    id: "1",
    name: "Smart India Hackathon 2025",
    organizer: "Government of India",
    location: "India (National)",
    date: "2025",
    description:
      "National winner — top 0.2% of all participating teams across India. One of the most prestigious student hackathons in the country.",
    rank: "National Winner",
    logo: "/placeholder/sih_logo.png",
  },
  {
    id: "2",
    name: "Amazon HackOn'25",
    organizer: "Amazon",
    location: "India",
    date: "2025",
    description:
      "Ranked Top 75 out of 50,000+ participants — top 0.15%. Competed against some of the best engineering minds in the country.",
    rank: "Top 75 / 50,000+",
    logo: "/placeholder/amazon.png",
  },
  {
    id: "3",
    name: "UIDAI Data Hackathon",
    organizer: "UIDAI",
    location: "India (National)",
    date: "2026",
    description:
      "National Finalist — top 0.5% of all participating teams. Built a data-driven solution for India's identity infrastructure authority.",
    rank: "National Finalist",
    logo: "/placeholder/aadhar.png",
  },
];

export const education = [
  {
    id: "1",
    school: "Birla Institute of Technology, Mesra",
    location: "Ranchi, Jharkhand",
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    gpa: "4.35 / 5.0",
    period: "2023 – 2027",
    logo: "/placeholder/university-logo.png",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  bullets: string[];
  logo: string;
  link?: string;
}

export const experience: Experience[] = [
  {
    id: "1",
    role: "Software Engineering Intern",
    company: "P2P Connect",
    type: "Remote",
    period: "Jun 2024 – Jul 2024",
    bullets: [
      "Improved AI-driven matchmaking accuracy by 28% through structured requirement analysis and iterative model evaluation.",
      "Identified 50+ functional issues and authored technical documentation for 10+ core platform features.",
    ],
    logo: "/placeholder/writer.png",
  },
  {
    id: "2",
    role: "Open Source Contributor",
    company: "United Nations OICT – MUIOGO",
    type: "Open Source",
    period: "Ongoing",
    bullets: [
      "Fixed a server crash bug in the updateData API route caused by missing session state (PR #143).",
      "Added session ownership validation on DataFileRoute mutation endpoints to prevent unauthorized data writes (PR #277).",
      "Improved web accessibility (a11y) by adding ARIA labels, live regions, and keyboard navigation support (PR #273).",
    ],
    logo: "/placeholder/UN.png",
    link: "https://github.com/OECD-OCS/MUIOGO",
  },
];

export const achievements = [
  {
    id: "1",
    title: "LeetCode Knight",
    description: "Rated 1900+, global top 4.5% across 500,000+ active users",
    year: "",
  },
  {
    id: "2",
    title: "Smart India Hackathon 2025 Winner",
    description: "National winner, top 0.2% of all participating teams",
    year: "2025",
  },
  {
    id: "3",
    title: "Amazon HackOn'25",
    description: "Ranked Top 75 out of 50,000+ participants (top 0.15%)",
    year: "2025",
  },
  {
    id: "4",
    title: "UIDAI Data Hackathon",
    description: "National Finalist, top 0.5% of all participating teams",
    year: "2026",
  },
  {
    id: "5",
    title: "GP Birla Scholar",
    description: "Merit scholarship of $1,700 awarded for academic excellence",
    year: "",
  },
];
