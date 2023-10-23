import { Meta, StoryObj } from '@storybook/react';
import Nav from '@/components/renew/common/Nav';

const meta = {
  title: 'common/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '메인 페이지에서 사용되는 네비게이션 메뉴 입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavStory: Story = {
  name: '기본',
};
