import { usePathname } from 'next/navigation';

export const isActiveLink = (pathname: string, href: string) => {
  // Exact match for root path
  if (href === '/') {
    return pathname === href;
  }
  
  // For dashboard and its direct child routes
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname === '/dashboard/';
  }
  
  // For other routes, match exact path or direct child routes
  const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
  const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  return normalizedPathname === normalizedHref;
};

export const useActivePath = () => {
  const pathname = usePathname();
  return (href: string) => isActiveLink(pathname, href);
};

type RouteMap = {
  [key: string]: string;
};

export const getPageTitle = (pathname: string): string => {
  const routes: RouteMap = {
    '/dashboard': 'Dashboard',
    '/dashboard/settings': 'Settings',
    '/dashboard/profile': 'Profile',
    '/dashboard/transaction': 'Transaction',
    '/dashboard/trading-signal': 'Trading Signal',
    '/dashboard/history': 'History',
    '/dashboard/referral': 'Referral'
  };

  return routes[pathname] || 'Dashboard';
};



