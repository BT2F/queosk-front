import { InputHTMLAttributes } from 'react';

export type IFormRegister = {
  [key: string]: InputHTMLAttributes<HTMLInputElement>;
};

export type IUser = {
  type: 'user' | 'owner';
  nickname?: string;
  email?: string;
  img?: string;
  name?: string;
};
