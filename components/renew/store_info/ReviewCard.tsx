import {
  AspectRatio,
  Avatar,
  Box,
  Card,
  Flex,
  Inset,
  Text,
} from '@radix-ui/themes';
import { StarFilledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

type Props = {
  /**
   * Text 내용 입니다.
   */
  content: string;
  /**
   * 이미지 주소 입니다.
   *
   * 생략시 컴포넌트가 렌더링 되지 않습니다.
   */
  imageUrl?: string;
  /**
   * 별점 입니다.
   */
  rate: number;
  /**
   * 리뷰 작성자 정보 입니다.
   *
   * 유저의 이미지가 존재하지 않을경우 닉네임의 첫번째 글자로 지정됩니다.
   */
  user: {
    imageUrl?: string;
    nickName: string;
  };
};

export default function ReviewCard(props: Props) {
  return (
    <Flex direction={'column'} gap={'3'}>
      <Flex gap={'2'}>
        <Avatar
          fallback={props.user.nickName.at(0)!}
          radius={'full'}
          src={props.user.imageUrl}
        />
        <Box>
          <Text weight={'bold'}>{props.user.nickName}</Text>
          <Flex>
            <StartRating rate={props.rate} />
          </Flex>
        </Box>
      </Flex>
      <Text>{props.content}</Text>
      <ImageCard imageUrl={props.imageUrl} nickName={props.user.nickName} />
    </Flex>
  );
}
const StartRating = ({ rate }: { rate: number }) => (
  <Flex>
    {Array.from({ length: 5 }, (_, i) => i).map((v) => (
      <StarFilledIcon
        key={v}
        className={v < rate ? 'text-yellow-400' : 'text-gray-300'}
      />
    ))}
  </Flex>
);

const ImageCard = ({
  imageUrl,
  nickName,
}: {
  imageUrl?: string;
  nickName: string;
}) =>
  imageUrl ? (
    <Card className={'max-w-[200px]'}>
      <Inset>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={imageUrl}
            alt={`${nickName}의 리뷰 이미지`}
            fill={true}
            objectFit={'cover'}
          />
        </AspectRatio>
      </Inset>
    </Card>
  ) : null;
