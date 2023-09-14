import { useRouter } from 'next/router';

export default function useSearchParams() {
  const router = useRouter();
  return new URLSearchParams(router.query as any);
}
