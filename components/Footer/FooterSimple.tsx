import { Container, Group, Anchor } from '@mantine/core';
import Image from 'next/image';
import logoImage from '../Header/RentFlareWebLogo150wide.png'; // Import your logo image
import classes from './FooterSimple.module.css';

const links = [
    { link: '#', label: 'Contact' },
    { link: '#', label: 'Privacy' },
    { link: '#', label: 'Blog' },
    { link: '#', label: 'Careers' },
];

export function FooterSimple() {
    const items = links.map((link) => (
        <Anchor<'a'>
          c="dimmed"
          key={link.label}
          href={link.link}
          onClick={(event) => event.preventDefault()}
          size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Image src={logoImage} alt="Rent Flare Logo" />
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}
