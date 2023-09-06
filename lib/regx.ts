export const regx = {
  password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/,
  email: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  nickName: /^[a-z가-힣0-9]{3,16}/i,
  phone: /^[0-9]{9,11}/,
  businessNumber: /^\d{3}-\d{2}-\d{5}$/,
  businessStartDate: /^\d{8}/,
};
