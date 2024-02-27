import { Overlay, Container, Title, Button, Text, Group } from '@mantine/core';
import { useContext } from 'react';
import classes from './HeroContentLeft.module.css';
import { ScrollContext } from './ScrollContext';

export function HeroContentLeft() {
    const { getInTouchRef } = useContext(ScrollContext);
    const scrollToGetInTouch = () => {
        if (getInTouchRef.current) {
            getInTouchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .80) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
        <Text
          component="span"
          inherit
          variant="gradient"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
                Unlock
        </Text>{' '}
        Long-Term, Stable Revenue for Your Plumbing & Heating Business
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
        Rentals provide a predictable income stream, helping you weather market fluctuations and grow sustainably.
        </Text>

        <Group className={classes.controls}>
                        <Button
                          size="xl"
                          className={classes.control}
                          variant="gradient"
                          gradient={{ from: 'blue', to: 'cyan' }}
                          onClick={scrollToGetInTouch}
                        >
                            Get started
                        </Button>

        </Group>
      </Container>
    </div>
  );
}
