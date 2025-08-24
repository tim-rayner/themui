'use client';

import Lottie from 'lottie-react';
import checkIcon from './check-icon.json';

interface AnimatedCheckIconProps {
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export function AnimatedCheckIcon({
  width = 200,
  height = 150,
  loop = true,
  autoplay = true,
}: AnimatedCheckIconProps) {
  return (
    <Lottie
      animationData={checkIcon}
      loop={loop}
      autoplay={autoplay}
      style={{ width, height }}
    />
  );
}
