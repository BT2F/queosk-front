import { HTMLAttributes } from "react";

interface ProfileProps extends HTMLAttributes<HTMLDivElement>{
  imgUrl?: string,
  profileNumber: string;
  profileNickName: string;
}

export default function AccountProfileInfo(props: ProfileProps) {
  return (
    <section className="profile-section pt-4 ">
      <div className="flex items-center px-5">
        <div className="profile-img mr-6">
          <img
            src={props.imgUrl}
            alt="프로필 이미지"
            className="w-20 h-20 border rounded-full text-center"
          />
        </div>
        <div className="profile-text flex-1">
          <h3 className={`font-bold ${props.className}`}>
            {props.profileNickName}
          </h3>
          <h3 className={`font-bold ${props.className}`}>
            {props.profileNumber}
          </h3>
        </div>
      </div>
    </section>
  );
}