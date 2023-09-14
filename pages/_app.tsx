import { AppProps } from 'next/app';
import '../styles/globals.css';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MSWWraaper from '@/components/msw/MSWWraaper';
import RootLayout from '@/components/common/RootLayout';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AnimatePresence initial={false} mode={'popLayout'}>
      <RootLayout key={router.asPath}>
        <MSWWraaper>
          <QueryClientProvider client={client}>
            <Component {...pageProps} />
            <ToastContainer />
          </QueryClientProvider>
        </MSWWraaper>
      </RootLayout>
    </AnimatePresence>
  );
}
