const fixedLabel = {
  email: '이메일',
  nickName: '닉네임',
  password: '비밀번호',
  passwordCheck: '비밀번호 확인',
  phone: '전화번호',
  id: '아이디',
};

export type IFixInputLabel = keyof typeof fixedLabel;

export default function fixInputLabel(str: IFixInputLabel) {
  return fixedLabel[str];
}
