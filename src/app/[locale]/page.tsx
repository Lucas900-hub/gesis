import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { MissionSection } from '@/components/home/MissionSection';
import { DomainsSection } from '@/components/home/DomainsSection';
import { TeamSection } from '@/components/home/TeamSection';
import { CtaSection } from '@/components/home/CtaSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <MissionSection />
      <DomainsSection />
      <TeamSection />
      <CtaSection />
    </main>
  );
}

