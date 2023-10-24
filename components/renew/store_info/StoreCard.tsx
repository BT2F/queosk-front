import {
  AspectRatio,
  Card,
  Flex,
  Heading,
  Inset,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import { ReaderIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { ReactElement } from 'react';

type Props = {
  /**
   * 상점의 커버 이미지 주소 입니다.
   */
  imageUrl?: string;
  /**
   * 상점 이름 입니다.
   */
  restaurantName: string;
  /**
   * 상점의 별점 입니다. ex) "4.1"
   */
  ratingAverage?: string;
  /**
   * 상점이 위치하는 행정동 입니다.
   */
  region?: string;
  /**
   * 리뷰 숫자 입니다.
   */
  reviewCnt?: number;
  /**
   * 상점 페이지에서의 뷰 상태 입니다.
   */
  isPageView?: boolean;
};

const FixedImageCard = ({
  children,
  isPageView = false,
}: {
  children: ReactElement;
  isPageView?: boolean;
}) => (isPageView ? children : <Card>{children}</Card>);

export default function StoreCard({ ...props }: Props) {
  return (
    <Flex direction={'column'} gap={'4'}>
      <FixedImageCard isPageView={props.isPageView}>
        <Inset>
          <AspectRatio ratio={3 / 2}>
            <Image
              src={props.imageUrl || placeholderImgUrl('300x200')}
              alt={`${props.restaurantName} image`}
              fill={true}
              objectFit={'cover'}
            />
          </AspectRatio>
        </Inset>
      </FixedImageCard>
      <Flex direction={'column'} gap={'1'} px={props.isPageView ? '4' : '2'}>
        <Heading as={'h2'} size="5" weight={'bold'}>
          {props.restaurantName}
        </Heading>
        {props.region && <Text color={'gray'}>{props.region}</Text>}
        <Flex gap={'2'}>
          <Flex align={'center'} gap={'1'}>
            <StarFilledIcon color={'green'} />
            <Text>{props.ratingAverage || '없음'}</Text>
          </Flex>
          <Flex align={'center'} gap={'1'}>
            <ReaderIcon color={'green'} />
            {props.reviewCnt || '없음'}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
