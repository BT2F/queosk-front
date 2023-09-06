import { devtools as defaultDevtools } from 'zustand/middleware';

const devtools = (
  process.env.NODE_ENV === 'production' ? (fn: any) => fn : defaultDevtools
) as typeof defaultDevtools;

export default devtools;
