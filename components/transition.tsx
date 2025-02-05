'use client';

import { motion } from 'motion/react';

export default function Transition({
  children,
  latency = 0,
  className = '',
  ref,
}: {
  children: React.ReactNode;
  latency?: number;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(40px)', y: -20 }}
      initial={{ opacity: 0, filter: 'blur(20px)', y: -20 }}
      transition={{ delay: latency, duration: 0.8, type: 'ease' }}
    >
      {children}
    </motion.div>
  );
}
