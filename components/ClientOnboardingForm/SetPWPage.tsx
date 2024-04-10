import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextInput, Button, Container, Title, Text, Box, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

interface FormValues {
  password: string;
  confirmPassword: string;
}

const SetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords do not match' : null),
    },
  });

  useEffect(() => {
    const uid = router.query.uid as string;
    if (!uid) {
      setError('Invalid password reset link');
    }
  }, [router.query]);

  const handleSubmit = async (values: FormValues) => {
    const uid = router.query.uid as string;
    setLoading(true);
    try {
      const auth = getAuth();
      if (uid) {
        await confirmPasswordReset(auth, uid, values.password);
        setSuccess(true);
        setError(null);
      } else {
        setError('Invalid password reset link');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title>Set Password</Title>
      <Text c="dimmed" size="sm" mt={5}>
        Please enter a new password for your account.
      </Text>

      <Box mt={30}>
        {error && (
          <Alert color="red" mb={20}>
            {error}
          </Alert>
        )}
        {success ? (
          <Alert color="green" mb={20}>
            Password set successfully! You can now log in with your new password.
          </Alert>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="New Password"
              placeholder="Enter your new password"
              required
              type="password"
              {...form.getInputProps('password')}
            />
            <TextInput
              label="Confirm Password"
              placeholder="Confirm your new password"
              required
              type="password"
              mt="md"
              {...form.getInputProps('confirmPassword')}
            />

            <Button fullWidth mt="xl" type="submit" loading={loading}>
              Set Password
            </Button>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default SetPasswordPage;
