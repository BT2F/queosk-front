import { AppProps } from 'next/app';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import MSWWraaper from '@/components/msw/MSWWraaper';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@radix-ui/themes/styles.css';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <MSWWraaper>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </MSWWraaper>
  );
}
