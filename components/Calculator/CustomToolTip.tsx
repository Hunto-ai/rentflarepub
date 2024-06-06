import { Paper, Text } from '@mantine/core';
import { getFilteredChartTooltipPayload } from '@mantine/charts';

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

const CustomTooltip = ({ label, payload }: ChartTooltipProps) => {
  if (!payload) return null;

  const filteredPayload = getFilteredChartTooltipPayload(payload);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {filteredPayload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          <span style={{ color: item.color }}>● </span>
          {item.name}: {item.name.includes('Percentage') ? formatPercentage(item.value) : formatCurrency(item.value)}
        </Text>
      ))}
    </Paper>
  );
};

export default CustomTooltip;
