import React from 'react';
import Navbar from '../components/Navbar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
