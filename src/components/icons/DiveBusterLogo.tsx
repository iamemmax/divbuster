import React, { useEffect, useState } from 'react';
import DiveBusterBlackLogo from './DiveBusterBlackLogo';
import DivebusterLogo from './Logo';

interface DiveBusterLogoProps {
  className?: string;
}

const DiveBusterLogoContainer: React.FC<DiveBusterLogoProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Set up observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDarkMode ? (
    <DivebusterLogo className={className} />
  ) : (
    <DiveBusterBlackLogo className={className} />
  );
};

export default DiveBusterLogoContainer;