import { useRouter } from 'next/router';
import { useEffect } from 'react';

const StripeConnectSetup = () => {
  const router = useRouter();
  const { setupUrl } = router.query;

  useEffect(() => {
    if (typeof setupUrl === 'string') {
      window.location.href = setupUrl;
    }
  }, [setupUrl]);

  // Render loading state or error message if setupUrl is not available

  return null;
};

export default StripeConnectSetup;
