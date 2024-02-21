import { Text } from '@mantine/core';
import classes from './StatsGroup.module.css';

const data = [
  {
    title: 'in Annual Recurring Revenue',
    stats: '$1,000,000+',
    description: 'We have experience generating over $1,000,000 in annual recurring revenue for our Canadian clients.',
  },
  {
    title: 'Contracts Executed',
    stats: '2,175+',
    description: 'We have a proven system for deploying rentals into any sized Plumbing & Heating Business.',
  },
  {
    title: 'Monthly Service Fee',
    stats: '$0',
    description: 'Rentflare is a long term partner in your success.  You only pay based on your real rented volume.',
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
