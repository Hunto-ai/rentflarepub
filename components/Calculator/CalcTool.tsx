import { useState } from 'react';
import { TextInput, rem, NumberInput, Image, Space, Divider, Button, Container, SegmentedControl, Slider, Title, Paper, Modal, FocusTrap, Grid, Text, Collapse } from '@mantine/core';
import { IconAt, IconPencil, IconBuilding, IconPhone } from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';
import api from '@/axios/api';

interface ChartData {
  year: string;
  traditionalRevenue: number;
  totalRentalRevenue: number;
  portfolioValue: number;
  hvacUnits: number;
  waterHeaterUnits: number;
  totalUnits: number;
  totalPortfolioSize: number;
  traditionalCosts: number;
  traditionalGrossMargin: number;
  traditionalGrossMarginPercentage: number;
  rentalCosts: number;
  rentalGrossMargin: number;
  rentalGrossMarginPercentage: number;
}

type SingleUnitComparison = {
  hvacRevenueIncrease: number;
  waterHeaterRevenueIncrease: number;
};

function WealthGrowthCalculator() {
  const [hvacUnits, setHvacUnits] = useState(50);
  const [waterHeaters, setWaterHeaters] = useState(50);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userInfoModalOpened, setUserInfoModalOpened] = useState(false);
  const [introModalOpened, setIntroModalOpened] = useState(true);
  const [isUserInfoCollected, setIsUserInfoCollected] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState([]);
  const [singleUnitComparison, setSingleUnitComparison] =
  useState<SingleUnitComparison | null>(null); // Added state for single unit comparison
  const [advancedOpened, setAdvancedOpened] = useState(false);
  const [marketPopulation, setMarketPopulation] = useState(300000);
  const [avgHvacTicket, setAvgHvacTicket] = useState(5000);
  const [avgWaterHeaterTicket, setAvgWaterHeaterTicket] = useState(2200);
  const [avgHvacGrossMargin, setAvgHvacGrossMargin] = useState(40);
  const [avgWaterHeaterGrossMargin, setAvgWaterHeaterGrossMargin] = useState(40);
  const [salesTeamStrength, setSalesTeamStrength] = useState(0.2);
  const [borrowingRate, setBorrowingRate] = useState(0.1);
  const [avgRecoveryRate, setAvgRecoveryRate] = useState(26);
  const [adjustedHvacUnits, setAdjustedHvacUnits] = useState(0); // New state variable
  const [adjustedWaterHeaters, setAdjustedWaterHeaters] = useState(0); // New state variable
  // const [emailSent, setEmailSent] = useState(false);
  const [view, setView] = useState<SeriesMapKey>('traditional'); // Explicitly typed view

  interface Validate {
    fullName: (value: string) => string | null;
    companyName: (value: string) => string | null;
    phoneNumber: (value: string) => string | null;
    email: (value: string) => string | null;
  }
  const validate: Validate = {
    fullName: (value: string) => {
      if (value.length < 2) return 'Name is too short';
      return null;
    },
    companyName: (value: string) => {
      if (value.length < 2) return 'Company name is too short';
      return null;
    },
    phoneNumber: (value: string) => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/; // This regex allows for international formats
      if (value.length < 10) return 'Phone number is too short';
      if (!phoneRegex.test(value.replace(/\D/g, ''))) return 'Invalid phone number';
      return null;
    },
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.length < 5) return 'Email is too short';
      if (!emailRegex.test(value)) return 'Invalid email address';
      return null;
    },
  };

  function formatCurrency(value = 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatPercentage(value = 0) {
    return `${(value * 100).toFixed(2)}%`;
  }

  const handleFinalSubmit = async () => {
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const adjustedHvacUnits = Math.round(hvacUnits * salesTeamStrength);
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const adjustedWaterHeaters = Math.round(waterHeaters * salesTeamStrength);

            // Set the adjusted values in state
            setAdjustedHvacUnits(adjustedHvacUnits);
            setAdjustedWaterHeaters(adjustedWaterHeaters);

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
      const combinedChartData = response.data.chartData.map((data : ChartData) => ({
        ...data,
        rentalRevenue: data.totalRentalRevenue, // No need to combine separately
        totalUnits: data.totalUnits,
        totalPortfolioSize: data.totalPortfolioSize,
        traditionalRevenue: data.traditionalRevenue,
        traditionalCosts: data.traditionalCosts,
        traditionalGrossMargin: data.traditionalGrossMargin,
        traditionalGrossMarginPercentage: data.traditionalGrossMarginPercentage,
        rentalCosts: data.rentalCosts,
        rentalGrossMargin: data.rentalGrossMargin,
        rentalGrossMarginPercentage: data.rentalGrossMarginPercentage,
        hvacUnits: data.hvacUnits,
        waterHeaterUnits: data.waterHeaterUnits,
      }));

      setChartData(combinedChartData);
      setPortfolioValue(response.data.portfolioValue); // Set the first year's value
      setSingleUnitComparison(response.data.singleUnitComparison);
      setUserInfoModalOpened(false); // Close the modal after submission
      setIsUserInfoCollected(true); // Set user info as collected
      // setEmailSent(false); // Reset email sent status
    } catch (error) {
      alert('An error occurred while calculating the growth. Please try again.');
    }
  };

  // type ChartDataItem = {
  //   totalPortfolioSize: number;
  //   totalRentalRevenue: number;
  //   // Add other properties if needed
  // };

  // const handleEmailResults = async () => {
  // const typedChartData = chartData as ChartDataItem[];
  //   try {
  //     const response = await api.post('/api/calculator/email', {
  //       email,
  //       fullName,
  //       companyName,
  //       phoneNumber,
  //       salesTeamStrength,
  //       chartData,
  //       portfolioSize: typedChartData[typedChartData.length - 1].totalPortfolioSize,
  //       recurringRevenue: typedChartData[typedChartData.length - 1].totalRentalRevenue,
  //       portfolioValue, // Ensure this is an array
  //       hvacUnits: Math.round(hvacUnits * salesTeamStrength),
  //       waterHeaters: Math.round(waterHeaters * salesTeamStrength),
  //       singleUnitComparison,
  //     });

  //     if (response.data.success) {
  //       setEmailSent(true);
  //     }
  //   } catch (error) {
  //     alert('An error occurred while sending the email. Please try again.');
  //   }
  // };

  const handleViewChange = (value: string) => {
    setView(value as SeriesMapKey);
  };

  const handleUserInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleFinalSubmit();
  };

  const handleSubmit = () => {
    if (!isUserInfoCollected) {
      setUserInfoModalOpened(true);
    } else {
      handleFinalSubmit();
    }
  };

  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const pencilIcon = <IconPencil style={{ width: rem(16), height: rem(16) }} />;
  const buildingIcon = <IconBuilding style={{ width: rem(16), height: rem(16) }} />;
  const phoneIcon = <IconPhone style={{ width: rem(16), height: rem(16) }} />;

  type SeriesMapKey = 'traditional' | 'rental' | 'sale' | 'singleUnitRental';

  const seriesMap = {
    traditional: [
      { name: 'traditionalRevenue', color: 'green.6', label: 'Traditional Revenue' },
      { name: 'traditionalCosts', color: 'red.6', label: 'Traditional Costs' },
      { name: 'traditionalGrossMargin', color: 'blue.6', label: 'Traditional Gross Margin' },
      { name: 'traditionalGrossMarginPercentage', color: 'purple.6', label: 'Traditional Gross Margin Percentage' },
    ],
    rental: [
      { name: 'totalRentalRevenue', color: 'green.6', label: 'Rental Revenue' },
      { name: 'rentalCosts', color: 'red.6', label: 'Rental Costs' },
      { name: 'rentalGrossMargin', color: 'blue.6', label: 'Rental Gross Margin' },
      { name: 'rentalGrossMarginPercentage', color: 'purple.6', label: 'Rental Gross Margin Percentage' },
    ],
    sale: [
      { name: 'saleRevenue', color: 'green.6', label: 'Sale Revenue' },
      { name: 'saleCosts', color: 'red.6', label: 'Sale Costs' },
      { name: 'saleGrossMargin', color: 'blue.6', label: 'Sale Gross Margin' },
      { name: 'saleGrossMarginPercentage', color: 'purple.6', label: 'Sale Gross Margin Percentage' },
    ],
    singleUnitRental: [
      { name: 'singleUnitRentalRevenue', color: 'green.6', label: 'Single Unit Rental Revenue' },
      { name: 'singleUnitRentalCosts', color: 'red.6', label: 'Single Unit Rental Costs' },
      { name: 'singleUnitRentalGrossMargin', color: 'blue.6', label: 'Single Unit Rental Gross Margin' },
      { name: 'singleUnitRentalGrossMarginPercentage', color: 'purple.6', label: 'Single Unit Rental Gross Margin Percentage' },
    ],
  };

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
                <Text size="sm">Borrowing Rate</Text>
                <Slider
                  label={(value) => `${(value * 100).toFixed(0)}%`}
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
                  label={(value) => `${value} months`}
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
                <Space h="xl" />
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
    <Title order={2}>
      Results for {companyName}
    </Title>
    <Space h="xs" />
    {portfolioValue.length > 0 && (
      <>
        <Text size="md">
          {fullName}, based on the data you provided, we are going to
          assume you can convert {adjustedHvacUnits} HVAC installations
          and {adjustedWaterHeaters} Water Heater installations in year 1.
          We&apos;ll use these numbers as an apples-to-apples comparison
          against your traditional revenue.
          On average,
          you&apos;ll generate &nbsp;
          {singleUnitComparison && formatCurrency(singleUnitComparison.hvacRevenueIncrease)} more
          revenue per HVAC unit and &nbsp;
          {singleUnitComparison && formatCurrency(singleUnitComparison.waterHeaterRevenueIncrease)}
          &nbsp; more
          revenue per Water Heater.

          <Space h="sm" />
          This calculator does account for nominal growth.  You can fine tune adjustments
          under Advanced Options.

          <Space h="sm" />
          The portfolio value is an estimated market value of your rental
          portfolio in the given year. It is calculated
          based on expected future revenue only and not your current balance sheet.
          The market value is highly volatile
          so this number should be used as a rough estimate only.
          In this case, if you were to retire in 15 years,
          you could expect to sell your rental portfolio for {formatCurrency(portfolioValue[14])}.
        </Text>
        <Space h="md" />
        {/* {!emailSent && (
          <Button onClick={handleEmailResults}>
            Email Results
          </Button>
        )}
        {emailSent && (
          <Text color="green">Email sent successfully!</Text>
        )} */}
      </>
    )}
  </Paper>
  <Paper withBorder shadow="sm" p="xl" radius="md" mt="lg">
  <SegmentedControl
    value={view}
    onChange={handleViewChange}
    data={[
          { label: 'With Rentals', value: 'rental' },
          { label: 'Without Rentals', value: 'traditional' },
        ]}
    mb="md"
  />
    <LineChart
      h={300}
      data={chartData}
      dataKey="year"
      series={seriesMap[view]}
      lineChartProps={{ syncId: 'revenueCharts' }}
      valueFormatter={(value) => {
        if (typeof value === 'number' && value >= 0 && value <= 80) {
          return formatPercentage(value);
        }
        return formatCurrency(value);
      }}
    />
    <Space h="xl" />
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

      {/* Modal for introducing the calculator */}
      <Modal
        opened={introModalOpened}
        onClose={() => setIntroModalOpened(false)}
        centered
        trapFocus
        closeOnEscape={false}
        withCloseButton={false}
        size="lg"
        closeOnClickOutside={false}
      >
        <FocusTrap active={introModalOpened}>
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
            <Text mb="md">
              Are you ready to take your business to the next level?
              Our cutting-edge Rental Revenue Calculator is designed to help you
              visualize the untapped revenue growth waiting for you.
              By converting your HVAC and Water Heater installations into rentals,
              you can create a sustainable, profitable business model.
            </Text>
            <Image
              radius="md"
              src="https://rfpublicbucket.s3.us-east-2.amazonaws.com/img/linechart.png"
            />
            <Divider my="sm" />
            <Text mb="md">
              Get started today and see how much additional revenue you could be
              earning.
            </Text>
            <Space h="xl" />
            <Button
              fullWidth
              onClick={() => { setIntroModalOpened(false); }}
            >
              Get Started
            </Button>
          </div>
        </FocusTrap>
      </Modal>

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
    <form onSubmit={handleUserInfoSubmit}>
      <div style={{ textAlign: 'center' }}>
        <Image
          radius="md"
          src="https://rfpublicbucket.s3.us-east-2.amazonaws.com/img/linechart.png"
        />
        <Divider />
        <Text mt="md">
          Enter your details below to receive a comprehensive report on how much
          additional revenue you could be earning by converting your HVAC and
          Water Heater installations into rentals. This personalized report is
          your key to a sustainable, profitable business model.
        </Text>
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
