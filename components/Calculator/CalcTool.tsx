import { useState } from 'react';
import { TextInput, rem, NumberInput, Image, Space, Slider, Divider, Button, Container, Title, Paper, Modal, FocusTrap, Grid, Text, Collapse } from '@mantine/core';
import { IconAt, IconPencil, IconBuilding, IconPhone } from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';
import api from '@/axios/api';

interface ChartData {
  hvacRentalRevenue?: number;
  waterHeaterRentalRevenue?: number;
  rentalRevenue?: number;
  totalUnits?: number;
}

function WealthGrowthCalculator() {
  const [hvacUnits, setHvacUnits] = useState(300);
  const [waterHeaters, setWaterHeaters] = useState(300);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userInfoModalOpened, setUserInfoModalOpened] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number[]>([]);
  const [advancedOpened, setAdvancedOpened] = useState(false);
  const [marketPopulation, setMarketPopulation] = useState(300000);
  const [avgHvacTicket, setAvgHvacTicket] = useState(5000);
  const [avgWaterHeaterTicket, setAvgWaterHeaterTicket] = useState(2200);
  const [avgHvacGrossMargin, setAvgHvacGrossMargin] = useState(40);
  const [avgWaterHeaterGrossMargin, setAvgWaterHeaterGrossMargin] = useState(40);
  const [salesTeamStrength, setSalesTeamStrength] = useState(0.2);
  const [borrowingRate, setBorrowingRate] = useState(0.1);
  const [avgRecoveryRate, setAvgRecoveryRate] = useState(32);

  interface Validate {
    fullName: (value: string) => string | null;
    companyName: (value: string) => string | null;
    phoneNumber: (value: string) => string | null;
    email: (value: string) => string | null;
  }

  const validate: Validate = {
    fullName: (value: string) => (value.length < 2 ? 'Name is too short' : null),
    companyName: (value: string) => (value.length < 2 ? 'Company name is too short' : null),
    phoneNumber: (value: string) => (value.length < 10 ? 'Phone number is too short' : null),
    email: (value: string) => (value.length < 5 ? 'Email is too short' : null),
  };

  function formatNumber(value = 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const handleSubmit = async () => {
    try {
      setUserInfoModalOpened(true);
    } catch (error) {
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Validate user input
      const errors = {
        fullName: validate.fullName(fullName),
        companyName: validate.companyName(companyName),
        phoneNumber: validate.phoneNumber(phoneNumber),
        email: validate.email(email),
      };

      // Check for any validation errors
      const hasErrors = Object.values(errors).some((error) => error !== null);
      if (hasErrors) {
        // Handle errors, e.g., display them to the user
        alert('Validation errors occurred. Please check your input and try again.');
        console.error(errors);
        return; // Prevent the form submission if there are errors
      }

      // Calculate adjusted values based on the sales team strength
      const adjustedHvacUnits = Math.round(hvacUnits * salesTeamStrength);
      const adjustedWaterHeaters = Math.round(waterHeaters * salesTeamStrength);

      // Post data to the API
      const response = await api.post('/api/calculator', {
        hvacUnits: adjustedHvacUnits,
        waterHeaters: adjustedWaterHeaters,
        avgHvacTicket,
        salesTeamStrength,
        avgWaterHeaterTicket,
        borrowingRate,
        avgRecoveryRate,
        avgHvacGrossMargin,
        avgWaterHeaterGrossMargin,
        marketPopulation,
        fullName,
        companyName,
        phoneNumber,
        email,
      });

      // Process response data
      const combinedChartData: ChartData[] = response.data.chartData.map((data: any) => {
        if (data.hvacRentalRevenue && data.waterHeaterRentalRevenue) {
          return {
            ...data,
            rentalRevenue: data.hvacRentalRevenue + data.waterHeaterRentalRevenue,
            totalUnits: data.totalUnits,
          };
        }
        if (data.hvacRentalRevenue) {
          return { ...data, rentalRevenue: data.hvacRentalRevenue, totalUnits: data.totalUnits };
        }
        if (data.waterHeaterRentalRevenue) {
          return {
            ...data, rentalRevenue: data.waterHeaterRentalRevenue, totalUnits: data.totalUnits,
          };
        }
        return data;
      });

      setChartData(combinedChartData);
      setPortfolioValue(response.data.portfolioValue); // Set the first year's value
      setUserInfoModalOpened(false); // Close the modal after submission
    } catch (error) {
      alert('An error occurred while calculating the growth. Please try again.');
    }
  };

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const pencilIcon = <IconPencil style={{ width: rem(16), height: rem(16) }} />;
  const buildingIcon = <IconBuilding style={{ width: rem(16), height: rem(16) }} />;
  const phoneIcon = <IconPhone style={{ width: rem(16), height: rem(16) }} />;

  return (
    <Container size="lg" p="md">
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder shadow="sm" p="lg" radius="md" mt="lg">
            <form onSubmit={(e) => e.preventDefault()}>
              <Space h="xs" />
              <NumberInput
                label="Total HVAC Installations Per Year"
                value={hvacUnits}
                onChange={(value) => setHvacUnits(typeof value === 'number' ? value : parseInt(value, 10))}
                placeholder="Enter HVAC installations"
                required
                hideControls
              />
              <Space h="xl" />
              <NumberInput
                label="Total Water Heater Installations Per Year"
                value={waterHeaters}
                onChange={(value) => setWaterHeaters(typeof value === 'number' ? value : parseInt(value, 10))}
                placeholder="Enter Water Heater installations"
                required
                hideControls
              />
              <Space h="xl" />
              <Button
                fullWidth
                onClick={() => setAdvancedOpened((o) => !o)}
                variant="light"
              >
                    Advanced Options
              </Button>
              <Collapse in={advancedOpened}>
                <Space h="xl" />
                <Divider />
                <Space h="sm" />
                <Title order={3}>Advanced Options</Title>
                <Text size="sm" mt="xl">Sales Team Strength</Text>
<Slider
  min={0.2}
  max={0.4}
  step={0.1}
  value={salesTeamStrength}
  onChange={setSalesTeamStrength}
  label={null}
  marks={[
    { value: 0.2, label: 'Beginner' },
    { value: 0.3, label: 'Moderate' },
    { value: 0.4, label: 'Advanced' },
  ]}
/>
                <Text size="sm" mt="xl">Average HVAC Ticket</Text>
                <Slider
                  min={4500}
                  max={6500}
                  step={250}
                  value={avgHvacTicket}
                  onChange={setAvgHvacTicket}
                  marks={[
                    { value: 4500, label: '$4500' },
                    { value: 5500, label: '$5500' },
                    { value: 6500, label: '$6500' },
                  ]}
                />
                <Text size="sm" mt="xl">Average Water Heater Ticket</Text>
                <Slider
                  min={1800}
                  max={2400}
                  step={100}
                  value={avgWaterHeaterTicket}
                  onChange={setAvgWaterHeaterTicket}
                  marks={[
                    { value: 1800, label: '$1800' },
                    { value: 2200, label: '$2200' },
                    { value: 2400, label: '$2400' },
                  ]}
                />
                <Space h="xl" />
                <Divider />
                <Text size="sm" mt="xl">Approximate Gross Margin (HVAC)</Text>
                <Slider
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                  min={30}
                  max={60}
                  onChange={setAvgHvacGrossMargin}
                  step={5}
                  value={avgHvacGrossMargin}
                  marks={[
                    { value: 30, label: '30%' },
                    { value: 45, label: '45%' },
                    { value: 60, label: '60%' },
                  ]}
                />

                <Text size="sm" mt="xl">Approximate Gross Margin (Water Heater)</Text>
                <Slider
                  labelTransitionProps={{
                    transition: 'skew-down',
                    duration: 150,
                    timingFunction: 'linear',
                  }}
                  min={30}
                  max={60}
                  onChange={setAvgWaterHeaterGrossMargin}
                  step={5}
                  value={avgWaterHeaterGrossMargin}
                  marks={[
                    { value: 30, label: '30%' },
                    { value: 45, label: '45%' },
                    { value: 60, label: '60%' },
                  ]}
                />
                <Space h="xl" />
                <NumberInput
                  thousandSeparator
                  label="Market Size"
                  value={marketPopulation}
                  onChange={(value) => setMarketPopulation(typeof value === 'number' ? value : parseInt(value, 10))}
                  placeholder="Enter market size"
                  required
                />
                <Space h="xl" />
                <Slider
                  label="Borrowing Rate"
                  placeholder="Enter borrowing rate"
                  min={0}
                  max={0.25}
                  step={0.01}
                  value={borrowingRate}
                  onChange={setBorrowingRate}
                  marks={[
                    { value: 0, label: '0%' },
                    { value: 0.1, label: '10%' },
                    { value: 0.25, label: '25%' },
                  ]}
                />
                <Space h="xl" />
                <Text size="sm">Average Recovery Rate</Text>
                <Slider
                  label="Average Recovery Rate"
                  min={18}
                  max={45}
                  step={1}
                  value={avgRecoveryRate}
                  onChange={setAvgRecoveryRate}
                  marks={[
                    { value: 18, label: '18' },
                    { value: 30, label: '30' },
                    { value: 45, label: '45' },
                  ]}
                />
              </Collapse>
              <Space h="sm" />
              <Button fullWidth onClick={handleSubmit}>
                Calculate
              </Button>
            </form>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper withBorder shadow="sm" p="lg" radius="md" mt="lg">
            <Text size="lg" w={500}>
              Results
            </Text>
            {portfolioValue.length > 0 && (
              <>
                <Text size="sm">
                  Based on your current volume, you can expect to have a total
                  portfolio value by year 5 of {formatNumber(portfolioValue[4])} with a total
                  portfolio size of {chartData[4].totalUnits} rentals.
                  By year 15, you can expect to have a total
                  portfolio value of {formatNumber(portfolioValue[14])} with
                  a total
                  portfolio size of {chartData[14].totalUnits} rentals.
                  This relies on you converting {Math.round(salesTeamStrength * 100)}%
                  of your HVAC and Water Heater installations into rentals.
                  (Some branches can convert up to 50% of their installations into rentals.)
                </Text>
              </>
            )}
            <Space h="xl" />
            <Text mb="md" pl="md">
              Traditional Revenue, Rental Revenue:
            </Text>
            <LineChart
              h={300}
              data={chartData}
              dataKey="year"
              withLegend
              valueFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)}
              series={[
                { name: 'traditionalRevenue', color: 'teal.6', label: 'Traditional Revenue' },
                { name: 'rentalRevenue', color: 'blue.6', label: 'Rental Revenue' },
              ]}
              lineChartProps={{ syncId: 'revenueCharts' }}
              tooltipProps={{
                labelFormatter: (value) => `Year ${value}`,
              }}
            />
            <Text mb="md" pl="md" mt="xl">
              Portfolio Value:
            </Text>
            <LineChart
              h={300}
              data={chartData}
              dataKey="year"
              valueFormatter={(value) => new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)}
              series={[
                { name: 'portfolioValue', color: 'red.6', label: 'Portfolio Value' },
              ]}
              lineChartProps={{ syncId: 'revenueCharts' }}
              tooltipProps={{
                labelFormatter: (value) => `Year ${value}`,
              }}
            />
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Modal for collecting user information */}
      <Modal
        opened={userInfoModalOpened}
        onClose={() => setUserInfoModalOpened(false)}
        centered
        trapFocus
        closeOnEscape={false}
        withCloseButton={false}
        size="lg"
        closeOnClickOutside={false}
      >
        <FocusTrap active={userInfoModalOpened}>
          <form onSubmit={handleFinalSubmit}>
            <div style={{ textAlign: 'center' }}>
              <Title order={1}>
                Try our free rental revenue calculator and unlock the{' '}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                >
                  full potential
                </Text>{' '}
                of your business.
              </Title>
              <Space h="xl" />
              <Image
                radius="md"
                src="https://rfpublicbucket.s3.us-east-2.amazonaws.com/img/linechart.png"
              />
              <Divider />
            </div>
            <Space h="xl" />
            <TextInput
              label="Full Name"
              leftSection={pencilIcon}
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Space h="xs" />
            <TextInput
              label="Company Name"
              leftSection={buildingIcon}
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <Space h="xs" />
            <TextInput
              label="Phone Number"
              leftSection={phoneIcon}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Space h="xs" />
            <TextInput
              label="Email"
              leftSection={icon}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button fullWidth mt="lg" type="submit">
              Submit
            </Button>
          </form>
        </FocusTrap>
      </Modal>
    </Container>
  );
}

export default WealthGrowthCalculator;
