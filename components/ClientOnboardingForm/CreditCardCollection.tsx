import React, { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { Button, LoadingOverlay, Text, Box, Paper, Space, Modal } from '@mantine/core';
import { useRouter } from 'next/router';
import api from '@/axios/api';

const stripePromise = loadStripe('pk_test_51O33WmCt2DYb83ehfQ2Oj0ThR2NB67LRNmblvEeUAvmFzBIImSl8U4tUzDv8CMnnsT52uxthD3qQ4YUt0gOwpyCi00xCR13Qyo');

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  console.log('clientSecret:', clientSecret);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      console.log('Stripe.js has not yet loaded.');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: 'https://example.com/success',
        },
      });

      if (error) {
        setError(error.message ?? 'An error occurred');
      } else {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError((err as StripeError).message ?? 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper p="lg" shadow="sm" radius="md">
      <Box mt="lg">
        <Text p="center" w={700} size="lg">
          Please add your payment method.
        </Text>
        <Space h="lg" />
        <LoadingOverlay visible={isLoading} />
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button type="submit" disabled={isLoading || !clientSecret} mt="md">
            {isLoading ? 'Processing...' : 'Save Card'}
          </Button>
          {error && <Text color="red" mt="sm">{error}</Text>}
        </form>
      </Box>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success!"
      >
        <Text>Card Successfully Saved</Text>
      </Modal>
    </Paper>
  );
};

const CardPaymentForm: React.FC = () => {
  const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const { token } = router.query;

      if (token) {
        try {
          const response = await api.post('/api/stripe/create-tenant-checkout-session', { token });
          setClientSecret(response.data.clientSecret);
        } catch (error) {
          console.error('Error fetching client secret:', error);
        }
      }
    };

    fetchClientSecret();
  }, [router.query]);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default CardPaymentForm;
