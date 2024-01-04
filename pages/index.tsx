import { HeaderSimple } from '@/components/Header/HeaderSimple';
import Hero from '@/components/Hero/Hero';
import { FeaturesGrid } from '@/components/Features/FeaturesGrid';
import { GetInTouchSimple } from '@/components/GetInTouch/GetInTouchSimple';

export default function HomePage() {
  return (
    <>
      <HeaderSimple />
        <Hero />
        <FeaturesGrid />
        <GetInTouchSimple />

    </>
  );
}
