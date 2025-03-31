'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCheck = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
        delay: 0.8,
      },
    },
  };

  return (
    <div className="flex justify-center my-4">
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="text-green-500"
      >
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          variants={circleVariants}
        />
        <motion.path
          d="M25 40 L35 50 L55 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkVariants}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedCheck;
