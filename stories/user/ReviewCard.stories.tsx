import { Meta, StoryObj } from '@storybook/react';
import ReviewCard from '@/components/renew/store_info/ReviewCard';

const meta = {
  title: 'user/StoreInfo/ReviewCard',
  component: ReviewCard,
  args: {
    content: '리뷰 입니다.',
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/08/20/13/06/toppokki-1607479_1280.jpg',
    rate: 4,
    user: {
      imageUrl: 'https://pixabay.com/static/img/profile_images/purple.svg',
      nickName: '떡볶이 좋아',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '스토어에서 보여줄 유저가 작성한 리뷰 컴포넌트 입니다.',
      },
    },
  },
} satisfies Meta<typeof ReviewCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseReviewCard: Story = {
  name: '기본',
  args: {
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/08/20/13/06/toppokki-1607479_1280.jpg',
  },
};

export const NoUserImageCard: Story = {
  name: '유저 이미지가 존재 하지 않는 경우 리뷰',
  args: {
    imageUrl: '',
    user: {
      imageUrl: '',
      nickName: '떡볶이 좋아',
    },
  },
};
export const NoImageCard: Story = {
  name: '이미지가 없는 리뷰',
  args: {
    imageUrl: '',
  },
};

export const LongContentReview: Story = {
  name: '1줄 이상의 리뷰',
  args: {
    content:
      '여기서 먹은 떡볶이는 정말 최고에요! 여기 튀김이 정말 맛있는데 아쉽게도 사진을 첨부하지는 못했습니다 ㅠㅠ',
  },
};
