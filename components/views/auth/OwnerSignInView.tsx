import Layout from '@/components/auth/layout/SignLayout';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import useAuth from '@/hooks/useAuth';
import { regx } from '@/lib/regx';
import { IFormRegister } from '@/types/auth.type';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import fixInputLabel, { IFixInputLabel } from '@/lib/fixInputLabel';
import { useEffect } from 'react';
import { deleteCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/auth';

export default function OwnerSignInView() {
  const { signIn } = useAuth();
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
    id: {
      type: 'text',
      placeholder: 'ownerId',
      ...register('ownerId', {
        required: '아이디는 필수입니다.',
        minLength: {
          value: 4,
          message: 'Id는 4자리 이상이여야 합니다.',
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

  const onSubmit = handleSubmit(async (data) => {
    await signIn(data, 'restaurant');
  });

  return (
    <Layout>
      <Layout.Form onSubmit={onSubmit} className="w-[384px]">
        <Layout.Title>로그인</Layout.Title>
        <Layout.SubTitle>사업자 로그인</Layout.SubTitle>
        <Layout.InputContainer>
          {Object.keys(formRegister).map((key) => (
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
        </Layout.InputContainer>
        <Button type="submit">로그인</Button>
        <Layout.LinkContainer>
          <Link href={'/mystore/signup'}>
            계정이 없다면? <b>사업자 회원 가입</b>
          </Link>
        </Layout.LinkContainer>
      </Layout.Form>
    </Layout>
  );
}
