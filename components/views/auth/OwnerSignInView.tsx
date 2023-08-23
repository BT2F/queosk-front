import { useForm } from 'react-hook-form';
import { IFormRegister } from '@/types/auth.type';
import { regx } from '@/lib/regx';
import Layout from '@/components/auth/layout/SignLayout';
import Input from '@/components/common/Input';
import { fixFirstCharUpperCase } from '@/lib/fixFirstCharUpperCase';
import Button from '@/components/common/Button';
import Link from 'next/link';

export default function OwnerSignInView() {
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
