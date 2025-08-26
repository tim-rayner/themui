'use client';

import { useGetAuthenticated } from '@/hooks/useGetAuthenticated';
import { Navbar } from '@themui/web-marketing';

export function NavbarAuthBridge() {
  const { isAuthenticated, email } = useGetAuthenticated();
  return <Navbar isAuthenticated={isAuthenticated} email={email} />;
}
