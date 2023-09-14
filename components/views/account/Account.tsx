import AccountHeader from '../../account/AccountHeader';
import AccountLayOut from '../../account/AccountLayout';
import AccountProfileInfo from '../../account/AccountProfileInfo';
import ProfileListHeader from '../../account/ProfileListHeader';
import ProfileListItem from '../../account/ProfileListItem';
import Modal from '../../account/Modal';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { regx } from '@/lib/regx';
import { placeholderImgUrl } from '@/lib/placeholderImgUrl';
import useAuth from '@/hooks/useAuth';

export default function Account() {
  const router = useRouter();
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [imgUrl, setImgUrl] = useState(placeholderImgUrl('100x100'));
  const [imgData, setImgData] = useState(Object);
  const [imgChanged, setImgChanged] = useState(false);
  const [nicknameValue, setNicknameValue] = useState<string>('');
  const [validText, setValidText] = useState<boolean | null>(true);
  const [userData, setUserData] = useState(Object);
  const [validPassword, setValidPassword] = useState<boolean | null>(null);
  const [existPassword, setExistPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { signOut } = useAuth();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];
    if (uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      setImgUrl(imageUrl);
      setImgData(uploadedImage);
      setImgChanged(true);
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNicknameValue(value);

    if (regx.nickName.test(value)) {
      setValidText(true);
    } else {
      setValidText(false);
    }
  };

  const handleExistPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExistPassword(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    if (regx.password.test(value)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const handleProfileUpload = async () => {
    try {
      const updatedUserData = {
        nickName: nicknameValue,
        phone: userData.phone ? userData.phone : '',
      };
      console.log(updatedUserData);
      // 서버로 이미지 된 유저 데이터를 전송
      if (imgChanged) {
        try {
          const imgFormData = new FormData();
          imgFormData.append('image', imgData);

          console.log(imgFormData);
          await axios.put(`/api/users/image`, imgFormData, {
            headers: {
              'content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('이미지 업로드 에러', error);
        }
      }

      await axios.put(`/api/users/`, updatedUserData).then((res) => {
        if (res.status === 200) {
          // 성공적으로 업데이트 되면 모달을 닫고 데이터를 업데이트
          setUserData(res.data);
          setProfileModal(false);
          alert('프로필 수정이 완료되었습니다');
        }
      });
    } catch (error) {
      console.error('프로필 업데이트 오류', error);
    }
  };

  const handleNewPassword = async () => {
    const passwordData = {
      existingPassword: existPassword,
      newPassword: newPassword,
    };
    console.log(existPassword);
    console.log(newPassword);
    try {
      await axios
        .put('/api/users/password/change', passwordData)
        .then((res) => {
          if (res.status === 204) {
            console.log('비밀번호 성공');
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeleteAccount = async () => {
    const sendPassword = {
      password: '123123',
    };
    try {
      await axios
        .delete('/api/users/', { data: sendPassword })
        .then((response) => {
          if (response.status === 204) {
            // 회원탈퇴 성공
            console.log('회원탈퇴 되었습니다');
          }
        });
    } catch (error) {
      console.error('회원탈퇴 에러', error);
    }
  };

  useEffect(() => {
    const getServerData = async () => {
      try {
        const response = await axios.get(`/api/users`);
        const data = response.data;
        setUserData(data);
        setImgUrl(data.imageUrl);
        setNicknameValue(data.nickName);
      } catch (error) {
        console.error('데이터 로드 오류', error);
      }
    };
    getServerData();
  }, []);

  return (
    <>
      {profileModal && (
        <Modal>
          <Modal.BackGround>
            <Modal.Body>
              <AccountHeader children={'프로필 수정'} />
              <Modal.Form>
                <Modal.ProfileInfoContainer>
                  <Modal.ProfileImg
                    src={imgUrl || placeholderImgUrl('100x100')}
                    alt={'프로필 이미지'}
                  >
                    <Modal.ProfileInput onChange={handleImageChange} />
                  </Modal.ProfileImg>
                  <Modal.ProfileText
                    textHeader={'닉네임'}
                    placeholder={'닉네임을 입력해주세요.'}
                    pattern={`${regx.nickName}`}
                    isValue={nicknameValue}
                    value={nicknameValue}
                    onChange={handleNicknameChange}
                    validation={validText}
                  />
                </Modal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <Modal.Btn
                    className={'w-2/5'}
                    children={'수정'}
                    disabled={
                      !validText && (!imgChanged || nicknameValue !== '')
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileUpload();
                      setImgChanged(false);
                    }}
                  />
                  <Modal.Btn
                    className={'w-2/5'}
                    children={'취소'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setNicknameValue(userData.nickName);
                      setImgUrl(userData.imageUrl);
                      setValidText(true);
                      setImgChanged(false);
                      setProfileModal(false);
                    }}
                  />
                </div>
              </Modal.Form>
            </Modal.Body>
          </Modal.BackGround>
        </Modal>
      )}

      {passwordModal && (
        <Modal>
          <Modal.BackGround>
            <Modal.Body>
              <AccountHeader children={'비밀번호 변경'} />
              <Modal.Form>
                <Modal.ProfileInfoContainer>
                  <Modal.ProfileText
                    type="password"
                    placeholder="기존 비밀번호를 입력해주세요."
                    value={existPassword}
                    onChange={handleExistPasswordChange}
                  />
                  <Modal.ProfilePassword
                    type="password"
                    placeholder="새로운 비밀번호를 입력해주세요."
                    passwordCheck={
                      '8자리 이상, 영문, 숫자 ,특수문자를 포함해야합니다.'
                    }
                    value={newPassword}
                    validation={validPassword}
                    onChange={handlePasswordChange}
                  />
                  <Modal.ProfilePassword
                    type="password"
                    placeholder="새로운 비밀번호를 다시 입력해주세요."
                    passwordCheck={'비밀번호가 일치하지 않습니다'}
                    value={confirmPassword}
                    validation={newPassword === confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Modal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <Modal.Btn
                    children={'변경'}
                    className={'w-2/5'}
                    disabled={
                      (!existPassword || !newPassword || !confirmPassword) &&
                      !(newPassword === confirmPassword)
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      handleNewPassword();
                      setExistPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                  />
                  <Modal.Btn
                    children={'취소'}
                    className={'w-2/5'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setExistPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setPasswordModal(false);
                    }}
                  />
                </div>
              </Modal.Form>
            </Modal.Body>
          </Modal.BackGround>
        </Modal>
      )}

      <AccountLayOut>
        <AccountHeader children={'마이페이지'} />
        <AccountProfileInfo
          imgUrl={userData.imageUrl || placeholderImgUrl('100x100')}
          profileNickName={userData.nickName}
          profileNumber={
            (userData.loginType !== 'KAKAO' && userData.phone) || ''
          }
          className="mb-1"
        />
        <hr className="my-5 h-0.5" />
        <div className="profile-list h-fit flex flex-col justify-between">
          <div className="user-modify">
            <ProfileListHeader children={'내 정보'} />
            <ProfileListItem
              children={'프로필 수정'}
              onClick={() => setProfileModal(true)}
            />
            <ProfileListItem
              children={'비밀번호 변경'}
              onClick={() => setPasswordModal(true)}
              btnDisabled={userData.loginType === 'KAKAO'}
            />
            <ProfileListItem
              isSignOut={true}
              children={'로그아웃'}
              className={'text-gray-400 text-sm'}
              onClick={handleSignOut}
            />
          </div>
          {userData.loginType === 'KAKAO' ? null : (
            <div className="user-delete absolute bottom-0 w-full">
              <hr className="border-2" />
              <ProfileListItem
                isSignOut={true}
                children={'회원탈퇴'}
                className={'text-red-500/[.7] text-xs'}
                onClick={handleDeleteAccount}
              />
            </div>
          )}
        </div>
      </AccountLayOut>
    </>
  );
}
