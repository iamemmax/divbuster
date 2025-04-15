"use client"
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimationData from './asset/loading-animation.json';

interface LoadingAnimationProps {
  className?: string;
  size?: number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  className, 
  size = 100 
}) => {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <Lottie
        animationData={loadingAnimationData}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LoadingAnimation;