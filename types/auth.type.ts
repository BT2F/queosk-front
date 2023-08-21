import { InputHTMLAttributes } from 'react';

export type IUser = {
  type: 'user' | 'owner';
  nickname?: string;
  email?: string;
  img?: string;
  name?: string;
};

export type IFormRegister = {
  [key: string]: InputHTMLAttributes<HTMLInputElement>;
};
