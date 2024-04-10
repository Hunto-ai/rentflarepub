import { TextInput, FileInput, Text, Group, Select, Button, Box, Title, Paper, Divider, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import { IconArrowDown } from '@tabler/icons-react';
import api from '../../axios/api';
import UserAgreementModal from './UserAgreementModal';
import classes from './TenantOnboarding.module.css';

export const TenantOnboarding = () => {
  const [loading, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAgreementModal, setShowAgreementModal] = useState(true);

  const form = useForm({
    initialValues: {
      businessName: '',
      businessAddress: {
        street: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
      },
      serviceEmail: '',
      businessNumber: '',
      owner: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
      },
      accountant: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      technicalAdmin: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      companyLogo: null,
      agreementAccepted: false,
    },
    validate: {
      businessName: (value) => (value ? null : 'Business name is required'),
      businessAddress: {
        street: (value) => (value ? null : 'Street is required'),
        city: (value) => (value ? null : 'City is required'),
        province: (value) => (value ? null : 'Province is required'),
        postalCode: (value) => (value ? null : 'Postal code is required'),
        country: (value) => (value ? null : 'Country is required'),
      },
      serviceEmail: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Valid service email is required'),
      businessNumber: (value) => (/^\d{9}$/.test(value) ? null : 'Valid 9-digit business number is required'),
      owner: {
        firstName: (value) => (value ? null : 'First name is required'),
        lastName: (value) => (value ? null : 'Last name is required'),
        email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Valid email is required'),
        phone: (value) => (value ? null : 'Phone number is required'),
        website: (value) => {
          if (!value) {
            return 'Website is required';
          }
          // Validate the URL format using a regular expression
          const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
          if (!urlPattern.test(value)) {
            return 'Valid website URL is required';
          }
          return null;
        },
      },
      accountant: {
        firstName: (value) => (value ? null : 'First name is required'),
        lastName: (value) => (value ? null : 'Last name is required'),
        email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Valid email is required'),
        phone: (value) => (value ? null : 'Phone number is required'),
      },
      technicalAdmin: {
        firstName: (value) => (value ? null : 'First name is required'),
        lastName: (value) => (value ? null : 'Last name is required'),
        email: (value) => (/^\S+@\S+$/i.test(value) ? null : 'Valid email is required'),
        phone: (value) => (value ? null : 'Phone number is required'),
      },
      agreementAccepted: (value) => (value ? null : 'You must accept the agreement'),
    },
  });

  useEffect(() => {
    const tokenFromQuery = router.query.token as string;
    if (tokenFromQuery) {
      setToken(tokenFromQuery);
    }
  }, [router.query]);

  const onSubmit = async (values = form.values) => {
    if (!values.agreementAccepted) {
      setShowAgreementModal(true);
      return;
    }

    // Create a new object with the modified website value
    const modifiedValues = {
      ...values,
      owner: {
        ...values.owner,
        website: values.owner.website.startsWith('http://') || values.owner.website.startsWith('https://')
          ? values.owner.website
          : `http://${values.owner.website}`,
      },
    };

    setErrorMessage('');
    toggle(); // Start the loading state

    const formData = new FormData();
    Object.entries(modifiedValues).forEach(([key, value]) => {
      if (key === 'companyLogo') {
        if (value instanceof File) {
          formData.append('companyLogo', value);
        }
      } else if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          if (typeof nestedValue === 'object' && nestedValue !== null && (nestedValue as any) instanceof Date) {
            formData.append(`${key}.${nestedKey}`, (nestedValue as Date).toISOString());
          } else {
            formData.append(`${key}.${nestedKey}`, String(nestedValue));
          }
        });
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        formData.append(key, String(value));
      }
    });

    formData.append('token', token);

    try {
      const response = await api.post('/api/tenants/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { tenant } = response.data;
      const { stripeAccountLink } = tenant;
      window.location.href = stripeAccountLink;
    } catch (error) {
      setErrorMessage('Failed to create tenant. Please try again.');
    } finally {
      toggle(); // Stop the loading state
    }
  };

  const handleAgreementAccept = () => {
    form.setFieldValue('agreementAccepted', true);
    setShowAgreementModal(false);
  };

  const handleCopyOwnerToAccountant = () => {
    form.setValues({
      ...form.values,
      accountant: {
        firstName: form.values.owner.firstName,
        lastName: form.values.owner.lastName,
        email: form.values.owner.email,
        phone: form.values.owner.phone,
      },
    });
  };

  const handleCopyAccountantToTechnicalAdmin = () => {
    form.setValues({
      ...form.values,
      technicalAdmin: {
        firstName: form.values.accountant.firstName,
        lastName: form.values.accountant.lastName,
        email: form.values.accountant.email,
        phone: form.values.accountant.phone,
      },
    });
  };

  return (
    <Box className={classes.container}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        {/* Business Information */}
        <Paper withBorder shadow="xs" p="md" mb="xl">
          <Title order={3} mb="md">
            Business Information
          </Title>
          <Divider my="sm" />
          <TextInput
            label="Business Name"
            placeholder="Enter business name"
            {...form.getInputProps('businessName')}
            required
            mb="sm"
          />
          <TextInput
            label="Street"
            placeholder="Enter street"
            {...form.getInputProps('businessAddress.street')}
            required
            mb="sm"
          />
          <TextInput
            label="City"
            placeholder="Enter city"
            {...form.getInputProps('businessAddress.city')}
            required
            mb="sm"
          />
          <Select
            searchable
            label="Province"
            placeholder="Select province"
            data={[
              'AB',
              'BC',
              'MB',
              'NB',
              'NL',
              'NS',
              'NT',
              'NU',
              'ON',
              'PE',
              'QC',
              'SK',
              'YT',
            ]}
            {...form.getInputProps('businessAddress.province')}
            withAsterisk
            mb="sm"
          />
          <TextInput
            label="Postal Code"
            placeholder="Enter postal code"
            {...form.getInputProps('businessAddress.postalCode')}
            required
            mb="sm"
          />
          <Select
            searchable
            label="Country"
            placeholder="Select country"
            data={['Canada', 'United States']}
            {...form.getInputProps('businessAddress.country')}
            withAsterisk
            mb="sm"
          />
          <TextInput
            label="Service Email"
            placeholder="Enter service email"
            {...form.getInputProps('serviceEmail')}
            required
            type="email"
            mb="sm"
          />
          <TextInput
            label="Business Number (9 digits)"
            placeholder="Enter 9-digit business number"
            {...form.getInputProps('businessNumber')}
            required
            mb="sm"
          />
          <TextInput
            label="Website"
            placeholder="Enter website"
            {...form.getInputProps('owner.website')}
            required
            mb="sm"
          />
          <FileInput
            label="Company Logo"
            placeholder="Upload company logo"
            accept="image/*"
            {...form.getInputProps('companyLogo')}
            mb="sm"
          />
        </Paper>

        {/* Owner Information */}
        <Paper withBorder shadow="xs" p="md" mb="xl">
          <Title order={3} mb="md">
            Primary Business Owner Information
          </Title>
          <Divider my="sm" />
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...form.getInputProps('owner.firstName')}
            required
            mb="sm"
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...form.getInputProps('owner.lastName')}
            required
            mb="sm"
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps('owner.email')}
            required
            type="email"
            mb="sm"
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...form.getInputProps('owner.phone')}
            required
            mb="sm"
          />
        </Paper>

        {/* Accountant Information */}
        <Paper withBorder shadow="xs" p="md" mb="xl">
          <Title order={3} mb="md">
            Accountant Information
            <Space />
            <Button
              onClick={handleCopyOwnerToAccountant}
              mb="sm"
              size="compact-sm"
              leftSection={<IconArrowDown />}
            >
            Same as Owner
            </Button>
          </Title>
          <Divider my="sm" />
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...form.getInputProps('accountant.firstName')}
            required
            mb="sm"
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...form.getInputProps('accountant.lastName')}
            required
            mb="sm"
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps('accountant.email')}
            required
            type="email"
            mb="sm"
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...form.getInputProps('accountant.phone')}
            required
            mb="sm"
          />
        </Paper>

        {/* Technical Administrator Information */}
        <Paper withBorder shadow="xs" p="md" mb="xl">
          <Title order={3} mb="md">
            Technical Administrator Information
            <Space />
            <Button
              onClick={handleCopyAccountantToTechnicalAdmin}
              mb="sm"
              size="compact-sm"
              leftSection={<IconArrowDown />}
            >
            Copy from Accountant
            </Button>
          </Title>
          <Divider my="sm" />
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...form.getInputProps('technicalAdmin.firstName')}
            required
            mb="sm"
          />
          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...form.getInputProps('technicalAdmin.lastName')}
            required
            mb="sm"
          />
          <TextInput
            label="Email"
            placeholder="Enter email"
            {...form.getInputProps('technicalAdmin.email')}
            required
            type="email"
            mb="sm"
          />
          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...form.getInputProps('technicalAdmin.phone')}
            required
            mb="sm"
          />
        </Paper>

        {errorMessage && (
          <Text color="red" size="sm" mb="xl">
            {errorMessage}
          </Text>
        )}
        <Group p="right" mt="xl">
        <Button type="submit" fullWidth mt="xl" loading={loading}>
            Submit
        </Button>
        </Group>
      </form>
      <UserAgreementModal
        opened={showAgreementModal}
        onAccept={handleAgreementAccept}
      />
    </Box>
  );
};
