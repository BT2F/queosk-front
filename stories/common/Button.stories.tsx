import { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/renew/common/Button';
import { RiKakaoTalkFill } from 'react-icons/ri';

const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    color: undefined,
    className: '',
  },
  argTypes: {
    color: {
      options: ['orange', 'green', 'yellow', 'gray', 'amber', 'red', undefined],
      control: {
        type: 'select',
      },
      description: '버튼의 색상 입니다.',
    },
    className: {
      description: 'tailwindcss를 기반으로 하는 클래스 입니다..',
    },
    children: {
      description: '버튼의 자식 요소 입니다.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BaseButton: Story = {
  name: '기본',
};
export const FullSizeButton: Story = {
  name: '전체 길이 버튼',
  args: {
    className: 'w-full',
  },
};

export const KakaoButton: Story = {
  name: '카카오 버튼',
  args: {
    children: (
      <>
        <RiKakaoTalkFill className="text-2xl" />
        카카오 아이디로 시작하기
      </>
    ),
    color: 'yellow',
    className: 'w-full',
  },
};
