// skills.ts — icon field removed; react-icons dropped to fix Next.js barrel optimizer conflict.
// Icons can be re-added later via a "use client" wrapper if needed.

export interface Skill {
  name: string;
  color?: string;
}

export const skills: Skill[] = [
  { name: "C++",        color: "#00599C" },
  { name: "Python",     color: "#3776AB" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js",    color: "#339933" },
  { name: "Express",    color: "#888888" },
  { name: "React",      color: "#61DAFB" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "MongoDB",    color: "#47A248" },
  { name: "Prisma",     color: "#5A67D8" },
  { name: "Redis",      color: "#FF4438" },
  { name: "Socket.io",  color: "#888888" },
  { name: "Gemini AI",  color: "#8E75B2" },
  { name: "Git",        color: "#F05032" },
  { name: "Docker",     color: "#2496ED" },
  { name: "Linux",      color: "#FCC624" },
  { name: "SQL",        color: "#336791" },
];
