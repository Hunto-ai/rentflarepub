import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import { useContext } from 'react';
import { ScrollContext } from '@/components/Hero/ScrollContext';
import image from './image.svg';
import classes from './EmailBanner.module.css';

export function EmailBanner() {
    const { getInTouchRef } = useContext(ScrollContext);
    return (
        <div ref={getInTouchRef} className={classes.wrapper}>
            <div className={classes.wrapper}>
                <div className={classes.body}>
                    <Title className={classes.title}>Ready to Rent?</Title>
                    <Text fw={500} fz="lg" mb={5}>
                        Lets get in touch.
                    </Text>
                    <Text fz="sm" c="dimmed">
                        See if your company is the right fit for rentals. Find out what it means to own your
                        own rental portfolio today.
                    </Text>

                    <div className={classes.controls}>
                        <TextInput
                          placeholder="Your email"
                          classNames={{ input: classes.input, root: classes.inputWrapper }}
                        />
                        <a href="mailto:jeff@rentflare.ca" className={classes.control}>
                            <Button className={classes.button}>Reach Out</Button>
                        </a>
                    </div>
                </div>
                <Image src={image.src} className={classes.image} />
            </div>
        </div>
    );
}
