import dynamic from "next/dynamic";
import { Suspense } from "react";
const MyWaiting = dynamic(() => import('@/components/my_waiting/MyWaiting'),{
  ssr: false
});

export default function Page() {
  return (
    <Suspense>

    <MyWaiting />;
    </Suspense>
  )
}
