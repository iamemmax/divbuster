"use client"
import React from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import useIsMobile from '@/hooks/UseMobile';

interface PercentageChartProps {
  percentage: number;
  size?: number;
  mobileSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
  responsive?: boolean;
}

const PercentageChart: React.FC<PercentageChartProps> = ({
  percentage,
  size = 32,
  mobileSize = 24,
  primaryColor = '#4453DD',
  secondaryColor = '#fff',
  className = '',
  responsive = true,
}) => {
  const isMobile = useIsMobile();
  
  // Calculate size based on screen width if responsive is true
  const getResponsiveSize = () => {
    if (!responsive) return isMobile ? mobileSize : size;
    
    // These breakpoints should match your tailwind.config.ts
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1920) return size * 1.5; // 3xl
      if (width >= 1536) return size * 1.25; // 2xl
      if (width >= 1280) return size; // xl
      if (width >= 1024) return size * 0.9; // lg
      if (width >= 768) return size * 0.8; // md
      if (width >= 640) return mobileSize * 1.2; // sm
      return mobileSize; // xs
    }
    
    return isMobile ? mobileSize : size;
  };

  const currentSize = getResponsiveSize();
  
  const data = [
    { value: percentage, fill: primaryColor, stroke: 'none' },
    { value: 100 - percentage, fill: secondaryColor, stroke: 'none' }
  ];

  return (
    <div 
      className={`transition-all duration-300 ${className}`}
      style={{ 
        width: currentSize, 
        height: currentSize,
        minWidth: mobileSize,
        minHeight: mobileSize
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            strokeWidth={0}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PercentageChart;



