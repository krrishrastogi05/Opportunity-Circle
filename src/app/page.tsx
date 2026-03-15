import { HeroSection } from "@/components/home/HeroSection";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";
import { GitHubBento } from "@/components/home/GitHubBento";
import { BlogTeaser } from "@/components/home/BlogTeaser";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Krrish Rastogi",
  url: "https://krrishrastogi.vercel.app",
  sameAs: [
    "https://github.com/krrishrastogi05",
    "https://linkedin.com/in/krrishrastogi05",
  ],
  jobTitle: "Backend Engineer & AI/ML Student",
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Birla Institute of Technology, Mesra",
  },
  knowsAbout: [
    "Data Structures and Algorithms",
    "Competitive Programming",
    "Backend Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Node.js",
    "TypeScript",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection />
      <SkillsCarousel />
      <GitHubBento />
      <BlogTeaser />
    </>
  );
}
