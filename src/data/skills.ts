import { ComponentType } from "react";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiRedis,
  SiGit,
  SiGooglegemini,
  SiSocketdotio,
  SiDocker,
  SiLinux,
} from "react-icons/si";
import { Database } from "lucide-react";

export interface Skill {
  name: string;
  icon?: ComponentType<{ size?: number; style?: React.CSSProperties }>;
  color?: string;
}

export const skills: Skill[] = [
  { name: "C++",          icon: SiCplusplus,    color: "#00599C" },
  { name: "Python",       icon: SiPython,       color: "#3776AB" },
  { name: "JavaScript",   icon: SiJavascript,   color: "#F7DF1E" },
  { name: "TypeScript",   icon: SiTypescript,   color: "#3178C6" },
  { name: "Node.js",      icon: SiNodedotjs,    color: "#339933" },
  { name: "Express",      icon: SiExpress,      color: "currentColor" },
  { name: "React",        icon: SiReact,        color: "#61DAFB" },
  { name: "PostgreSQL",   icon: SiPostgresql,   color: "#4169E1" },
  { name: "MongoDB",      icon: SiMongodb,      color: "#47A248" },
  { name: "Prisma",       icon: SiPrisma,       color: "#5A67D8" },
  { name: "Redis",        icon: SiRedis,        color: "#FF4438" },
  { name: "Socket.io",    icon: SiSocketdotio,  color: "currentColor" },
  { name: "Gemini AI",    icon: SiGooglegemini, color: "#8E75B2" },
  { name: "Git",          icon: SiGit,          color: "#F05032" },
  { name: "Docker",       icon: SiDocker,       color: "#2496ED" },
  { name: "Linux",        icon: SiLinux,        color: "#FCC624" },
  { name: "SQL",          icon: Database as ComponentType<{ size?: number; style?: React.CSSProperties }>, color: "#336791" },
];
