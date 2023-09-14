import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

interface Props {
  href?: string;
}
export default function BackButton({ href }: Props) {
  const router = useRouter();
  return (
    <div
      className="pr-2"
      onClick={() =>
        router.isReady && href ? router.push(href) : router.back()
      }
    >
      <BiArrowBack className="text-2xl" />
    </div>
  );
}
