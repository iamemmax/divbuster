import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OpticalLogo from '@/app/icons/Logo';
import DashboardIcon from '@/app/icons/(dashboard)/DashboardIcon';
import HistoryIcon from '@/app/icons/(dashboard)/HistoryIcon';
import HomeIcon from '@/app/icons/(dashboard)/HomeIcon';
import ProfileIcon from '@/app/icons/(dashboard)/ProfileIcon';
import SettingsIcon from '@/app/icons/(dashboard)/SettingsIcon';
import TradingIcon from '@/app/icons/(dashboard)/TrandingIcon';
import TransactionIcon from '@/app/icons/(dashboard)/TransactionIcon';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const navLinks = [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon />
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />
    },
    {
      title: "Transaction",
      href: "/dashboard/transaction",
      icon: <TransactionIcon width={25} height={30} />
    },
    {
      title: "Trading Signal",
      href: "/dashboard/trading-signal",
      icon: <TradingIcon />
    },
    {
      title: "History (Graph)",
      href: "/",
      icon: <HistoryIcon />
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <ProfileIcon />
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <SettingsIcon />
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-[#090E29] z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center border-b border-[#4453DD]/75 p-6">
                <Link href="/" className="flex items-center gap-2">
                  <OpticalLogo />
                  <span className="text-white font-verdana font-bold">
                    Opticraft Trading
                  </span>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 text-white/80 hover:text-white hover:bg-[#4453DD]/10 rounded-lg px-4 py-3 transition-colors"
                        onClick={onClose}
                      >
                        <span className="w-6 h-6">{link.icon}</span>
                        <span className="font-verdana text-sm">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Help Section */}
              <div className="p-4 mt-auto">
                <div className="px-4 py-6 bg-[#4453DD]/10 rounded-lg">
                  <p className="bg-gradient-to-r from-white via-[#4453DD] to-white/80 bg-clip-text text-transparent font-verdana font-bold text-lg text-center">
                    Opticraft Trading Platform
                  </p>
                  <p className="text-white/70 text-sm text-center mt-2">
                    24/7 Customer Support
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;