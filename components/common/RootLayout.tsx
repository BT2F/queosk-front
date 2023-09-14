import { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function RootLayout({ children }: { children: ReactElement }) {

  return (
    <motion.div
      initial={ { x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="max-w-[640px] mx-auto">{children}</div>
    </motion.div>
  );
}
