import AccountHeader from '../../account/AccountHeader';
import AccountLayOut from '../../account/AccountLayout';
import AccountProfileInfo from '../../account/AccountProfileInfo';
import ProfileListHeader from '../../account/ProfileListHeader';
import ProfileListItem from '../../account/ProfileListItem';
import AccountModal from '../../account/AccountModal';
import { useState } from 'react';

export default function Account() {
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  console.log(profileModal);
  console.log(passwordModal);
  return (
    <>
      {profileModal && (
        <AccountModal>
          <AccountModal.BackGround>
            <AccountModal.Body>
              <AccountHeader children={'프로필 수정'} />
              <AccountModal.Form>
                <AccountModal.ProfileInfoContainer>
                  <AccountModal.ProfilePicture alt={'프로필 이미지'} />
                  <AccountModal.ProfileText
                    textHeader={'닉네임'}
                    placeholder={'닉네임을 입력해주세요.'}
                  />
                </AccountModal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <AccountModal.Btn className={'w-2/5'} children={'수정'} />
                  <AccountModal.Btn
                    className={'w-2/5'}
                    children={'취소'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileModal(false);
                    }}
                  />
                </div>
              </AccountModal.Form>
            </AccountModal.Body>
          </AccountModal.BackGround>
        </AccountModal>
      )}

      {passwordModal && (
        <AccountModal>
          <AccountModal.BackGround>
            <AccountModal.Body>
              <AccountHeader children={'비밀번호 변경'} />
              <AccountModal.Form>
                <AccountModal.ProfileInfoContainer>
                  <AccountModal.ProfileText placeholder="새로운 비밀번호를 입력해주세요." />
                  <AccountModal.ProfileText placeholder="새로운 비밀번호를 다시 입력해주세요." />
                  <p className="text-xs px-2 text-gray-700">
                    {'비밀번호 조건'}을 조합하여 8~20자로 설정해주세요.
                  </p>
                </AccountModal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <AccountModal.Btn children={'변경'} className={'w-2/5'} />
                  <AccountModal.Btn
                    children={'취소'}
                    className={'w-2/5'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setPasswordModal(false);
                    }}
                  />
                </div>
              </AccountModal.Form>
            </AccountModal.Body>
          </AccountModal.BackGround>
        </AccountModal>
      )}

      <AccountLayOut>
        <AccountHeader children={'마이페이지'} />
        <AccountProfileInfo
          profileNickName={'닉네임'}
          profileNumber={'0105555****'}
          className="mb-1"
        />
        <hr className="my-5 h-0.5" />
        <div className="profile-list">
          <ProfileListHeader children={'내 정보'} />
          <ProfileListItem
            children={'프로필 수정'}
            onClick={() => setProfileModal(true)}
          />
          <ProfileListItem
            children={'비밀번호 수정'}
            onClick={() => setPasswordModal(true)}
          />
        </div>
      </AccountLayOut>
    </>
  );
}
