import { useForm } from 'react-hook-form';
import { IFormRegister } from '@/types/auth.type';
import { regx } from '@/lib/regx';
import SignLayout from '@/components/auth/layout/SignLayout';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { fixFirstCharUpperCase } from '@/lib/fixFirstCharUpperCase';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

export default function UserSignUpView() {
  const { signUp, OAuthRedirect } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
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
    nickName: {
      type: 'text',
      placeholder: 'nickname',
      ...register('nickName', {
        required: '닉네임은 필수 입니다.',
        pattern: {
          value: regx.nickName,
          message: '영문, 한글, 숫자를 사용하여 3~16자까지 가능합니다.',
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
    passwordCheck: {
      type: 'password',
      placeholder: '••••••••',
      ...register('passwordCheck', {
        required: '비밀번호가 일치하지 않습니다.',
        validate: (v) =>
          v === getValues('password') || '비밀번호가 일치지 않습니다.',
      }),
    },
  };

  const onClickKAKAOLogin = async () => {
    OAuthRedirect('kakao');
  };

  const onSubmit = handleSubmit(async (data) => {
    await signUp(data);
  });
  return (
    <SignLayout className="!min-h-[750px]">
      <SignLayout.Form onSubmit={onSubmit}>
        <SignLayout.Title>회원가입</SignLayout.Title>
        <SignLayout.SubTitle>계정 만들기</SignLayout.SubTitle>
        <Button color="kakao" type="button" onClick={onClickKAKAOLogin}>
          <span className="flex justify-center items-center gap-2">
            <RiKakaoTalkFill className="text-2xl" />
            카카오 아이디로 시작하기
          </span>
        </Button>
        <SignLayout.Divider />
        <SignLayout.InputContainer>
          {Object.keys(formRegister).map((key) => (
            <Input
              key={`user-sign-up-${key}`}
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
        <Button>회원가입</Button>
        <SignLayout.LinkContainer>
          <Link href={'/signin'}>
            계정이 이미 있다면? <b>로그인</b>
          </Link>
        </SignLayout.LinkContainer>
      </SignLayout.Form>
    </SignLayout>
  );
}
