import { Meta, StoryObj } from '@storybook/react';
import MenuCard from '@/components/renew/store_info/MenuCard';

const meta = {
  title: 'user/StoreInfo/MenuCard',
  component: MenuCard,
  args: {
    imageUrl:
      'https://cdn.pixabay.com/photo/2016/08/20/13/06/toppokki-1607479_1280.jpg',
    name: '떡볶이',
    price: 10000,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '각 스토어의 메뉴 컴포넌트 입니다.',
      },
    },
  },
} satisfies Meta<typeof MenuCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuCardStory: Story = {
  name: '기본',
};
