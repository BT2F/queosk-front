import { useForm } from 'react-hook-form';
import { IFormRegister } from '@/types/auth.type';
import { regx } from '@/lib/regx';
import SignLayout from '@/components/auth/layout/SignLayout';
import Button from '@/components/common/Button';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Input from '@/components/common/Input';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import fixInputLabel, { IFixInputLabel } from '@/lib/fixInputLabel';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/auth';

export default function UserSignInView() {
  const { signIn, OAuthRedirect, signOut } = useAuth();

  useEffect(() => {
    deleteCookie(AUTH_KEY.ACCESS_TOKEN);
    deleteCookie(AUTH_KEY.REFRESH_TOKEN);
  }, []);

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

  const onClickKAKAOLogin = () => {
    OAuthRedirect('kakao');
  };

  return (
    <SignLayout>
      <SignLayout.Form onSubmit={onSubmit} className="w-[384px]">
        <SignLayout.Title>로그인</SignLayout.Title>
        <SignLayout.SubTitle>
          회원 로그인
          <Link href={'/mystore/signin'} className="text-sm">
            (사업자 로그인 하러가기)
          </Link>
        </SignLayout.SubTitle>
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
              label={fixInputLabel(key as IFixInputLabel)}
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
