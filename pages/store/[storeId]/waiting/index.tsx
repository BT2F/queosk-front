import Waiting from '@/components/views/waiting/Waiting';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function Page() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Waiting />
      </QueryClientProvider>
    </>
  );
}
