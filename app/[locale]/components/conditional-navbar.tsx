'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';

const ROUTES_WITHOUT_NAVBAR = ['/journeescientifique'];

export function ConditionalNavbar() {
  const pathname = usePathname();

  const shouldHideNavbar = ROUTES_WITHOUT_NAVBAR.some((route) => {
    const normalizedPath = pathname.replace(/^\/(en|fr)/, '');
    return normalizedPath === route || normalizedPath.startsWith(`${route}/`);
  });

  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
}
