import WealthGrowthCalculator from '@/components/Calculator/CalcTool';
import { FooterSimple } from '@/components/Footer/FooterSimple';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
import '@mantine/charts/styles.css';

export default function CalculatorPage() {
  return (
    <>
    <HeaderSimple />
    <WealthGrowthCalculator />
    <FooterSimple />
    </>
  );
}
