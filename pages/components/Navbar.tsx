import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Logo from '../../public/logo.png';
import { styled } from '@mui/material/styles';

const StyledLink = styled('a')(() => ({
  width: '120px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
}));

const StyledMenu = styled('ul')(() => ({
  marginLeft: 'auto',
  listStyle: 'none',
  display: 'flex',
  gap: '40px'
}));

export default function Navbar() {
  return (
    <AppBar color="default" position="static">
      <Container>
        <Toolbar>
          <Link href="/" passHref>
            <StyledLink>
              <Image objectFit="cover" src={Logo} alt="" />
            </StyledLink>
          </Link>

          <StyledMenu>
            <li>
              <Link href="/">Alarm</Link>
            </li>
            <li>
              <Link href="/timer">Timer</Link>
            </li>
            <li>
              <Link href="/stopwatch">Stopwatch</Link>
            </li>
          </StyledMenu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
