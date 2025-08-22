'use client';

import Lottie from 'lottie-react';
import colorsAnimation from './colors.json';

interface AnimatedPaintRollerProps {
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export function AnimatedPaintRoller({
  width = 200,
  height = 150,
  loop = true,
  autoplay = true,
}: AnimatedPaintRollerProps) {
  return (
    <Lottie
      animationData={colorsAnimation}
      loop={loop}
      autoplay={autoplay}
      style={{ width, height }}
    />
  );
}
