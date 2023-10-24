import { Meta, StoryObj } from '@storybook/react';
import StoreCard from '@/components/renew/store_info/StoreCard';

const meta = {
  title: 'user/StoreInfo/StoreCard',
  component: StoreCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '스토어의 정보를 간략하게 표시하는 컴포넌트 입니다.',
      },
    },
  },
} satisfies Meta<typeof StoreCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseCard: Story = {
  name: '기본 음식점 카드',
  args: {
    restaurantName: '또가네 분식',
    region: '사당동',
    ratingAverage: '4.1',
    reviewCnt: 100,
    isPageView: false,
  },
};
export const PageCard: Story = {
  name: '상점 페이지 음식점 카드',
  args: {
    restaurantName: '또가네 분식',
    region: '사당동',
    ratingAverage: '4.1',
    reviewCnt: 100,
    isPageView: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
