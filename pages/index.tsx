import { Container } from '@mantine/core';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
import { HeroContentLeft } from '@/components/Hero/Hero';
import { FeaturesGrid } from '@/components/Features/FeaturesGrid';
import { EmailBanner } from '@/components/GetInTouch/GetInTouchSimple';
import { FooterSimple } from '@/components/Footer/FooterSimple';
import { ScrollProvider } from '@/components/Hero/ScrollContext';
import { StatsGroup } from '@/components/Stats/StatsGroup';

export default function HomePage() {
  return (
    <>
      <ScrollProvider>
      <HeaderSimple />
        <HeroContentLeft />
        <Container size="lg" style={{ marginTop: 100 }}>
        <StatsGroup />
        </Container>
        <FeaturesGrid />
        <EmailBanner />
        <FooterSimple />
      </ScrollProvider>
    </>
  );
}
