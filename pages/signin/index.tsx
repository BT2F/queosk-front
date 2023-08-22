import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { FormEvent } from 'react';
import { regx } from '@/lib/regx';
import SignLayout from '@/components/layout/SignLayout';
import { fixFirstCharUpperCase } from '@/lib/fixFirstCharUpperCase';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { IFormRegister } from '@/types/auth.type';
import Link from 'next/link';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formRegister: IFormRegister = {
    email: {
      type: 'email',
      placeholder: 'email@queosk.com',
      ...register('email', {
        required: '이메일은 필수입니다.',
        pattern: {
          value: regx.email,
          message: '올바른 이메일 형식이 아닙니다.',
        },
      }),
    },
    password: {
      type: 'password',
      placeholder: '••••••••',
      ...register('password', {
        required: '비밀번호는 필수입니다.',
        pattern: {
          value: regx.password,
          message: '8자리 이상, 1개 이상의 숫자, 영어, 특수문자가 필요합니다.',
        },
      }),
    },
  };

  const inputItems = Object.keys(formRegister);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const onClickKAKAOLogin = (e: FormEvent<HTMLButtonElement>) => {
    console.log('카카오 로그인 클릭');
  };

  return (
    <SignLayout>
      <SignLayout.Form onSubmit={onSubmit} className="w-[384px]">
        <SignLayout.Title>로그인</SignLayout.Title>
        <SignLayout.SubTitle>회원 로그인</SignLayout.SubTitle>
        <Button color="kakao" type="button" onClick={onClickKAKAOLogin}>
          <span className="flex justify-center items-center gap-2">
            <RiKakaoTalkFill className="text-2xl" />
            카카오 아이디로 시작하기
          </span>
        </Button>
        <SignLayout.Divider />
        <SignLayout.InputContainer>
          {inputItems.map((key) => (
            <Input
              key={`user-sign-in-${key}`}
              label={fixFirstCharUpperCase(key)}
              errorText={(errors[key]?.message as string) || ''}
            >
              <Input.Field
                error={!!errors[key]}
                onEnter={onSubmit}
                {...formRegister[key]}
              />
            </Input>
          ))}
        </SignLayout.InputContainer>
        <Button type="submit">로그인</Button>
        <SignLayout.LinkContainer>
          <Link href={'/signup'}>
            계정이 없다면? <b>회원가입</b>
          </Link>
        </SignLayout.LinkContainer>
      </SignLayout.Form>
    </SignLayout>
  );
}
