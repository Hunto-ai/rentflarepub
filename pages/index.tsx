import { HeaderSimple } from '@/components/Header/HeaderSimple';
import { HeroTitle } from '@/components/Hero/Hero';
import { FeaturesGrid } from '@/components/Features/FeaturesGrid';
import { EmailBanner } from '@/components/GetInTouch/GetInTouchSimple';
import { FooterSimple } from '@/components/Footer/FooterSimple';
import { ScrollProvider } from '@/components/Hero/ScrollContext';

export default function HomePage() {
  return (
    <>
      <ScrollProvider>
      <HeaderSimple />
        <HeroTitle />
        <FeaturesGrid />
        <EmailBanner />
        <FooterSimple />
      </ScrollProvider>
    </>
  );
}
