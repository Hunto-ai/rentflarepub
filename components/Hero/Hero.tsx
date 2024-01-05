import { Container, Text, Button, Group } from '@mantine/core';
import { useContext } from 'react';
import { ScrollContext } from './ScrollContext';
import classes from './HeroTitle.module.css';

export function HeroTitle() {
    const { getInTouchRef } = useContext(ScrollContext);
    const scrollToGetInTouch = () => {
        if (getInTouchRef.current) {
            getInTouchRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner}>
                <h1 className={classes.title}>
                    Start {' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                        renting
                    </Text>{' '}
                    equipment in a flash.
                </h1>

                <Text className={classes.description} color="dimmed">
                    We level the playing field and help small and medium sized Plumbing & HVAC Service
                    providers build their own rental portfolios for long term sustainable growth.
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
