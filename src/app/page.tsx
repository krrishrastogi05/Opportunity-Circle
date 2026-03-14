import { HeroSection } from "@/components/home/HeroSection";
import { SkillsCarousel } from "@/components/home/SkillsCarousel";
import { GitHubBento } from "@/components/home/GitHubBento";
import { BlogTeaser } from "@/components/home/BlogTeaser";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsCarousel />
      <GitHubBento />
      <BlogTeaser />
    </>
  );
}
