import React from 'react';
import { Card, Text, Space, List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircle } from '@tabler/icons-react';
import { HeaderSimple } from '@/components/Header/HeaderSimple';
import { FooterSimple } from '@/components/Footer/FooterSimple';

function OnboardingChecklist() {
  return (
    <>
    <HeaderSimple />
    <Space h="lg" />
    <Card shadow="sm" padding="xl" radius="md" withBorder style={{ maxWidth: rem(600), margin: 'auto' }}>
      <Text size="xl" w={500} mb="md" ta="left">
        Onboarding Checklist
      </Text>

      <List
        spacing="sm"
        size="md"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size="1rem" />
          </ThemeIcon>
        }
      >
        <List.Item>Onboarding Completed</List.Item>

        <List.Item
          icon={
            <ThemeIcon color="gray" size={24} radius="xl">
              <IconCircle size="1rem" />
            </ThemeIcon>
          }
        >
          Approve Rentflare to send email on your behalf. (check your inbox).
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="gray" size={24} radius="xl">
              <IconCircle size="1rem" />
            </ThemeIcon>
          }
        >
          Set your password. (check your inbox for a password reset link)
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="gray" size={24} radius="xl">
              <IconCircle size="1rem" />
            </ThemeIcon>
          }
        >
          Login to Rentflare and create your first Pricebook item.
        </List.Item>
      </List>
    </Card>
    <FooterSimple />
    </>
  );
}

export default OnboardingChecklist;
