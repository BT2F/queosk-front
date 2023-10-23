import { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/renew/common/Header';

const meta = {
  title: 'Common/Header',
  component: Header,
  args: {
    isBackBtn: true,
    title: '또가네 식당',
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'queosk에서 사용 할 헤더 컴포넌트 입니다.',
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseHeader: Story = {
  name: '기본 헤더',
  args: {},
};
export const FixedHrefHeader: Story = {
  name: '뒤로가기 링크 수정',
  args: {
    href: '/store',
  },
};
export const NoneBackBtnHeader: Story = {
  name: '뒤로가기가 없는 헤더',
  args: {
    isBackBtn: false,
  },
};
