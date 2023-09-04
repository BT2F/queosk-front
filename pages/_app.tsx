import { AppProps } from 'next/app';
import '../styles/globals.css';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MSWWraaper from '@/components/msw/MSWWraaper';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MSWWraaper>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </QueryClientProvider>
    </MSWWraaper>
  );
}
