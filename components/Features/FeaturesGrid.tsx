import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import { IconHeartbeat, IconChartInfographic, IconWritingSign, IconZoomCheck, IconCalculator, IconCreditCard } from '@tabler/icons-react';
import classes from './FeaturesGrid.module.css';

export const MOCKDATA = [
    {
        icon: IconCalculator,
        title: 'Create Pricebooks',
        description:
            'Rentflare handles what to set your monthly prices at in order to maximize profitability.',
    },
    {
        icon: IconZoomCheck,
        title: 'Credit Verify Customers',
        description:
            'Secure your portfolio by optionally running credit verification on your clients.  You can choose certain equipment types that require this.',
    },
    {
        icon: IconWritingSign,
        title: 'Execute Contracts',
        description:
            'Have your customers digitally sign off on lease agreements that are automatically and easily populated.  This allows sales from Comfort Advisors, Techs, or Dispatchers.',
    },
    {
        icon: IconCreditCard,
        title: 'Process Monthly Payments',
        description:
            'As soon as your lease is signed, Rentflare automatically collects payment information from your customers.  Monthly billing happens automatically.',
    },
    {
        icon: IconChartInfographic,
        title: 'Valuable KPIs',
        description:
            'Learn key performance indicators that assess the health and performance of your rental portfolio in real time',
    },
    {
        icon: IconHeartbeat,
        title: 'Manage Your Portfolio',
        description:
            'Check on the status of your equipment, its service and maintance history, and more',
    },
];

interface FeatureProps {
    icon: React.FC<any>;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
    return (
        <div>
            <ThemeIcon variant="light" size={40} radius={40}>
                <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ThemeIcon>
            <Text mt="sm" mb={7}>
                {title}
            </Text>
            <Text size="sm" c="dimmed" lh={1.6}>
                {description}
            </Text>
        </div>
    );
}

export function FeaturesGrid() {
    const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

    return (
        <Container className={classes.wrapper}>
            <Title className={classes.title}>We cover the rental process from front to back</Title>

            <Container size={560} p={0}>
                <Text size="sm" className={classes.description}>
                    We have hands on experience in the industry working for enterprise class level organizations.
                    Our software handles all major tasks needed to fulfill a rental in seconds.
                </Text>
            </Container>

            <SimpleGrid
              mt={60}
              cols={{ base: 1, sm: 2, md: 3 }}
              spacing={{ base: 'xl', md: 50 }}
              verticalSpacing={{ base: 'xl', md: 50 }}
            >
                {features}
            </SimpleGrid>
        </Container>
    );
}
