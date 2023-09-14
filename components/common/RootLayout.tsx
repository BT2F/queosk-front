import { forwardRef, ReactNode, useState } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useRouter } from 'next/router';

type Props = HTMLMotionProps<'div'>;
type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;
function RootLayout({ children, ...rest }: Props, ref: PageTransitionRef) {
  const router = useRouter();

  const [asPath] = useState(router.asPath);
  const isRootPath = asPath === '/' || asPath === '/store';

  return !isRootPath ? (
    <motion.div
      ref={ref}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      {...rest}
    >
      <div className="max-w-[640px] mx-auto">{children as ReactNode}</div>
    </motion.div>
  ) : (
    <div className="max-w-[640px] mx-auto bg-white z-10">
      {children as ReactNode}
    </div>
  );
}
export default forwardRef(RootLayout);
