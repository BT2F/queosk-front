import dynamic from 'next/dynamic';

const Waiting = dynamic(() => import('@/components/views/waiting/Waiting'),
  {
    ssr: false,
  }
);
export default function Page() {
  return (
    <>
      <Waiting />
    </>
  );
}

