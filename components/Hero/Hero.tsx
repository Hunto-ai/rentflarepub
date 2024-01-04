import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HeroImageRight.module.css';

export default function HeroImageRight() {
    return (
        <div className={classes.root}>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Start{' '}
                            <Text
                              component="span"
                              inherit
                              variant="gradient"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                                renting equipment
                            </Text>{' '}
                            like an enterprise company
                        </Title>

                        <Text className={classes.description} mt={30}>
                            {/* eslint-disable-next-line max-len */}
                            Rentflare Software allows Plumbing & Heating companies to begin renting Water Heaters,
                            Furnaces, Air Conditioners, and just about anything else.
                        </Text>

                        <Button
                          variant="gradient"
                          gradient={{ from: 'pink', to: 'yellow' }}
                          size="xl"
                          className={classes.control}
                          mt={40}
                        >
                            Get started
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}
