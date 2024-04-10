import { Container } from '@mantine/core';
import CardPaymentForm from '@/components/ClientOnboardingForm/CreditCardCollection';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
import { FooterSimple } from '@/components/Footer/FooterSimple';
import { ScrollProvider } from '@/components/Hero/ScrollContext';

export default function ClientOnboardingPage() {
  return (
    <>
      <ScrollProvider>
        <HeaderSimple />
        <Container size="lg" style={{ marginTop: 100 }}>
          <CardPaymentForm />
        </Container>
        <FooterSimple />
      </ScrollProvider>
    </>
  );
}
