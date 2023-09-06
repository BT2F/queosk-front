import { useForm } from 'react-hook-form';
import { IFormRegister } from '@/types/auth.type';
import { regx } from '@/lib/regx';
import { FormEvent } from 'react';
import SignLayout from '@/components/auth/layout/SignLayout';
import Button from '@/components/common/Button';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Input from '@/components/common/Input';
import { fixFirstCharUpperCase } from '@/lib/fixFirstCharUpperCase';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function UserSignInView() {
  const { signIn, OAuthRedirect } = useAuth();

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
    await signIn(data, 'user');
  });

  const onClickKAKAOLogin = (e: FormEvent<HTMLButtonElement>) => {
    OAuthRedirect('kakao');
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
