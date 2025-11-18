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
  
  // Normalize paths
  const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;
  const normalizedPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Exact match
  if (normalizedPathname === normalizedHref) {
    return true;
  }
  
  // Check if pathname starts with href (for nested routes like /div-log/123)
  return normalizedPathname.startsWith(normalizedHref + '/');
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



