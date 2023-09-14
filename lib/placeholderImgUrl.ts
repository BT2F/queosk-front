export const placeholderImgUrl = (size?: string, text?: string) =>
  `https://placehold.co/${size || '100x100'}?text=${
    text?.replace(/ /g, '+') || 'No+Image'
  }`;
