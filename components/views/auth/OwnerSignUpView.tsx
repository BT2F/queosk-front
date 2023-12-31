import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormRegister } from '@/types/auth.type';
import { regx } from '@/lib/regx';
import Layout from '@/components/auth/layout/BusinessSignUpLayout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { deleteCookie } from 'cookies-next';
import { AUTH_KEY } from '@/constants/auth';

export default function OwnerSignUpView() {
  const open = useDaumPostcodePopup();
  const [addressValue, setAddressValue] = useState('');
  const { signUp } = useAuth();
  useEffect(() => {
    deleteCookie(AUTH_KEY.ACCESS_TOKEN);
    deleteCookie(AUTH_KEY.REFRESH_TOKEN);
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const fixedName = {
    email: '이메일',
    ownerId: '사업자 아이디',
    ownerName: '사업자 이름',
    password: '비밀번호',
    passwordCheck: '비밀번호 확인',
    phone: '사업자 전화번호',
    restaurantPhone: '매장 전화번호',
    restaurantName: '매장명',
    category: '업종 분류',
    businessNumber: '사업자 번호',
    businessStartDate: '사업자 번호 발급일',
    address: '주소 ( 클릭시 주소 팝업 )',
    addressDetail: '상세 주소 (생략가능)',
  };

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
    ownerId: {
      type: 'text',
      placeholder: 'id',
      ...register('ownerId', {
        required: 'Id는 필수 입니다.',
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
    passwordCheck: {
      type: 'password',
      placeholder: '••••••••',
      ...register('passwordCheck', {
        required: '비밀번호가 일치하지 않습니다.',
        validate: (v) =>
          v === getValues('password') || '비밀번호가 일치지 않습니다.',
      }),
    },
    ownerName: {
      placeholder: '홍길동',
      ...register('ownerName', {
        required: '이름은 필수 입니다.',
      }),
    },
    restaurantName: {
      placeholder: '매장명',
      ...register('restaurantName', {
        required: '매장명은 필수 입니다.',
      }),
    },
    phone: {
      placeholder: '01012345678',
      ...register('phone', {
        required: '전화번호는 필수입니다.',
        pattern: {
          value: regx.phone,
          message: '-를 제외한 번호를 입력해주세요.',
        },
      }),
    },
    restaurantPhone: {
      placeholder: '0212345678',
      ...register('restaurantPhone', {
        required: '식당 전화번호는 필수입니다.',
        pattern: {
          value: regx.phone,
          message: '-를 제외한 번호를 입력해주세요.',
        },
      }),
    },
    businessNumber: {
      placeholder: '123-45-67890',
      ...register('businessNumber', {
        required: '사업자 번호는 필수입니다.',
        pattern: {
          value: regx.businessNumber,
          message: '-를 포함한 번호를 입력해주세요.',
        },
      }),
    },
    businessStartDate: {
      placeholder: '20230822',
      ...register('businessStartDate', {
        required: '사업자 발급일은 필수 입니다.',
        pattern: {
          value: regx.businessStartDate,
          message: '20230101 형태로 작성해주세요!',
        },
      }),
    },
  };

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddressValue(fullAddress);
  };
  const onClickAddress = () => {
    open({ onComplete: handleComplete });
  };

  const onSubmit = handleSubmit(async (data) => {
    await signUp(data, 'restaurant');
  });

  return (
    <>
      <Layout>
        <Layout.Form onSubmit={onSubmit}>
          <Layout.Title>사업자 신청</Layout.Title>
          <Layout.SubTitle>신규 사업자 신청</Layout.SubTitle>
          <Layout.Grid>
            {Object.keys(formRegister).map((key) => (
              <Input
                key={`user-sign-in-${key}`}
                label={fixedName[key as keyof typeof fixedName]}
                errorText={(errors[key]?.message as string) || ''}
                className="!mt-0"
              >
                <Input.Field
                  error={!!errors[key]}
                  onEnter={onSubmit}
                  autoComplete="off"
                  {...formRegister[key]}
                />
              </Input>
            ))}
            <Input
              label={fixedName['address']}
              errorText={(errors['address']?.message as string) || ''}
              className="!mt-0"
            >
              <Input.Field
                onClick={onClickAddress}
                error={!!errors['address']}
                onEnter={onSubmit}
                {...register('address', {
                  required: '주소는 필수 입니다.',
                })}
                value={addressValue}
              />
            </Input>
            <Input label={fixedName['addressDetail']} className="!mt-0">
              <Input.Field
                onEnter={onSubmit}
                {...register('addressDetail', {})}
              />
            </Input>
            <Input
              label={fixedName['category']}
              errorText={(errors['category']?.message as string) || ''}
              className="!mt-0"
            >
              <Input.Select {...register('category', { required: true })}>
                <option value="한식" defaultChecked={true}>
                  한식
                </option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="기타">기타</option>
              </Input.Select>
            </Input>
          </Layout.Grid>

          <Button type="submit">사업자 신청</Button>
          <Layout.LinkContainer>
            <Link href={'/mystore/signin'}>
              계정이 있다면? <b>사업자 로그인</b>
            </Link>
          </Layout.LinkContainer>
        </Layout.Form>
      </Layout>
    </>
  );
}
