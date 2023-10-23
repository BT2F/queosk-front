import { Box, Flex, Heading } from '@radix-ui/themes';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';

type Props = {
  /**
   * 헤더 타이틀
   */
  title?: string;
  /**
   * 뒤로가기 활성화 여부
   */
  isBackBtn?: boolean;
  /**
   * 뒤로가기 활성화시 별도 연결 주소가 존재하면 입력
   * 값이 존재 할 경우 replace를 기반으로 주소를 변경합니다.
   * 존재하지 않을 경우 기본적으로 router.back()이 수행됩니다.
   */
  href?: string;
};

export default function Header({ isBackBtn = true, title = '', href }: Props) {
  return (
    <header className={'p-2'}>
      <Flex justify={'between'} align={'center'} height={'5'}>
        <Box width={'9'}>{isBackBtn && <BackButton target={href} />}</Box>
        <Heading as={'h2'} size={'4'} align={'center'} className="truncate">
          {title}
        </Heading>
        <Box width={'9'}></Box>
      </Flex>
    </header>
  );
}

const BackButton = ({ target }: { target?: string }) => {
  const router = useRouter();
  const onClick = () => (target ? router.replace(target) : router.back());
  return (
    <div onClick={onClick} aria-label={'link'} className="cursor-pointer">
      <CaretLeftIcon width={30} height={30} />
    </div>
  );
};
