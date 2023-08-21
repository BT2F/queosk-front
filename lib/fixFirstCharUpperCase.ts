export const fixFirstCharUpperCase = (str: string) =>
  str.replace(/^[a-z]/, (char) => char.toUpperCase());
