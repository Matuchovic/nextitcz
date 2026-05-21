import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { MarqueeSection } from '@/components/sections/marquee-section';
import { FeaturesSection } from '@/components/sections/features-section';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
