import { HTMLAttributes } from "react";

interface ProfileListHeaderProps extends HTMLAttributes<HTMLHeadElement> { 
}

export default function ProfileListHeader(props: ProfileListHeaderProps) {
  return (
    <h3 className="profile-list-header text-sm text-zinc-500 mb-3 px-5 leading-none">
      {props.children}
    </h3>
  );
}