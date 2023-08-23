import { useSearchParams } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import Link from 'next/link';

export default function KakaoCallbackView() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { signIn } = useAuth();
  useEffect(() => {
    const signWithKAKAO = async (code: string) => {
      // console.log('카카오 로그인 시도중');
      await signIn({ code }, 'OAuth');
    };
    !!code && signWithKAKAO(code);
  }, [code]);
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {!!code ? (
        <span className="loading loading-dots loading-lg scale-150" />
      ) : (
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">
            카카오 로그인중 오류가 발생했습니다.
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            인가 코드가 존재하지 않습니다.
          </p>
          <Link href={'/'} className="btn mt-5" replace={true}>
            홈으로 돌아가기
          </Link>
        </div>
      )}
    </div>
  );
}
