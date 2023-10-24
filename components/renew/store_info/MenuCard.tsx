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
import React from 'react';

type Props = {
  /**
   * 메뉴 이미지 주소입니다.
   *
   * 만약 이미지 주소가 존재하지 않을 경우 place holder 이미지로 대체 됩니다.
   */
  imageUrl?: string;
  /**
   * 메뉴 이름 입니다.
   */
  name: string;
  /**
   * 메뉴의 가격 입니다.
   */
  price: number;
};
export default function MenuCard(props: Props) {
  return (
    <Flex gap={'4'}>
      <Card size={'5'}>
        <Inset>
          <AspectRatio ratio={1}>
            <Image
              src={props.imageUrl || placeholderImgUrl('100x100')}
              alt={`${props.name} 이미지`}
              fill={true}
              objectFit={'cover'}
            />
          </AspectRatio>
        </Inset>
      </Card>
      <Flex direction={'column'} justify={'between'} width={'100%'} py={'1'}>
        <Heading size={'4'} className="max-w-[200px] truncate">
          {props.name}
        </Heading>
        <Text color={'green'} align={'right'} mr={'2'}>
          ₩{props.price.toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
}
