import { BsArrowLeftShort } from 'react-icons/bs';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  href?: string;
  isBack?: boolean;
};

/**
 * 공용 헤더 컴포넌트 입니다.
 * @param {Object} props - 컴포넌트 props
 * @param props.title :?string - 헤더의 타이틀 입니다.
 * @param props.href :?string router.back()이 아닌 별도의 경로로 이동해야 할 때 이동할 경로를 작성합니다.
 * @param props.isBack :?boolean 기본값은 true 이며 만약 뒤로가기 버튼이 필요없다면 false로 설정하면 됩니다.
 * @returns {JSX.Element} 헤더 컴포넌트
 */
export default function Header({
  title = '',
  href = '',
  isBack = true,
}: Props) {
  const router = useRouter();
  const onClick = () => {
    isBack && href ? router.push(href) : router.back();
  };
  return (
    <header className="flex font-bold text-xl py-2 [&>button]:w-12 [&>span]:w-12">
      <button type="button" onClick={onClick}>
        {isBack && <BsArrowLeftShort className="text-4xl" />}
      </button>
      <p className="flex flex-1 justify-center items-center">{title}</p>
      <span />
    </header>
  );
}
