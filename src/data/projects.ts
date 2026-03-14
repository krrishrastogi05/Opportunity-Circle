export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string; // TODO: replace placeholder with actual project screenshot
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Argus.AI – Real-Time Disaster Intelligence",
    description:
      "A multimodal AI backend using Google Gemini to process unstructured text, image, and audio streams for real-time disaster analysis. Bi-directional WebSocket pipeline broadcasts live geospatial updates and unit telemetry.",
    tech: ["Node.js", "Express", "MongoDB", "Socket.io", "Google Gemini AI"],
    image: "/placeholder/project.png",
    github: "https://github.com/krrishrastogi05",
    demo: "https://argus-ai.example.com",
    featured: true,
  },
  {
    id: "2",
    title: "Beneficiary Management Platform",
    description:
      "Role-based backend system with JWT authentication and strict middleware security. Features an async eligibility engine with complex rule-processing logic and BullMQ background workers with a relational Prisma schema.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Prisma"],
    image: "/placeholder/project.png",
    github: "https://github.com/krrishrastogi05",
    featured: true,
  },
  {
    id: "3",
    title: "CodeFortress – Competitive Programming Toolchain",
    description:
      "A VS Code extension acting as a problem viewer and local judge for competitive programming. Browser-to-editor communication via a localhost HTTP bridge transfers structured problem data with a language-agnostic execution engine.",
    tech: ["Chrome Extension", "VS Code Extension", "Node.js", "React"],
    image: "/placeholder/project.png",
    github: "https://github.com/krrishrastogi05",
    demo: "https://codefortress.example.com",
    featured: true,
  },
];
