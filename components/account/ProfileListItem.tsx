import { HTMLAttributes } from 'react';

interface ProfileListItemProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
  isSignOut?: boolean;
  btnDisabled?: boolean;
}

export default function ProfileListItem(props: ProfileListItemProps) {
  return (
    <div
      className={`profile-list-item font-bold px-5 py-4 leading-none flex  ${props.className}`}
    >
      {props.isSignOut ? (
        <button
          className="flex after:ml-auto after:w-3 after:h-3"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      ) : props.btnDisabled ? (
        <button
          className="flex w-full text-gray-300 after:content-['>'] after:ml-auto after:w-3 after:h-3"
          onClick={props.onClick}
          disabled={props.btnDisabled}
        >
          {props.children}
        </button>
      ) : (
        <button
          className="flex w-full after:content-['>'] after:ml-auto after:w-3 after:h-3"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      )}
    </div>
  );
}
