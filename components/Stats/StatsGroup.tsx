import { Text } from '@mantine/core';
import classes from './StatsGroup.module.css';

const data = [
  {
    title: 'Portfolio Wealth Generated',
    stats: '$10,000,000+',
    description: 'With a proven track record, we\'ve helped clients generate over $10 million in portfolio wealth, enabling successful exits or ensuring continued, stable long-term revenue.',
  },
  {
    title: 'Contracts Executed',
    stats: '2,500+',
    description: 'Our robust system seamlessly integrates rentals into any size Plumbing & HVAC business.',
  },
  {
    title: 'Monthly Service Fee',
    stats: '$0',
    description: 'Rentflare is committed to your success. You only pay based on the actual volume of your rentals.',
  },
];

export function StatsGroup() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
