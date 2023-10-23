import { Flex, Grid, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { ClockIcon, PersonIcon } from '@radix-ui/react-icons';
import Logo from '@/public/asset/logo/queosk.png';
import Image from 'next/image';

export default function Nav() {
  return (
    <nav className="py-2">
      <Grid columns={'3'} width={'auto'}>
        <Link href={'/mywaiting'}>
          <Flex direction={'column'} align={'center'}>
            <ClockIcon width={30} height={30} />
            <Text size={'2'}>웨이팅</Text>
          </Flex>
        </Link>
        <Flex align={'center'} justify={'center'}>
          <figure className="rounded-xl overflow-hidden shadow">
            <Image src={Logo} alt={'로고 이미지'} width={50} height={50} />
          </figure>
        </Flex>
        <Link href={'/account'}>
          <Flex direction={'column'} align={'center'}>
            <PersonIcon width={30} height={30} />
            <Text size={'2'}>계정</Text>
          </Flex>
        </Link>
      </Grid>
    </nav>
  );
}
