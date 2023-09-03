import AccountHeader from '../../account/AccountHeader';
import AccountLayOut from '../../account/AccountLayout';
import AccountProfileInfo from '../../account/AccountProfileInfo';
import ProfileListHeader from '../../account/ProfileListHeader';
import ProfileListItem from '../../account/ProfileListItem';
import Modal from '../../account/Modal';
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from '@/lib/axios';

export default function Account() {
  const [profileModal, setProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [ imgUrl, setImgUrl ] = useState('')
  const [ nicknameValue, setNicknameValue ] = useState<string>('');
  const [ validText, setValidText ] = useState<boolean | null>(null);
  const [ userData, setUserData ] = useState(Object)

  // const axios = require('axios');
  const serverUrl = 'http://localhost:3000'
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];
    if(uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      setImgUrl(imageUrl);
    }
  }

  const handleNicknameChange =(e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNicknameValue(value);

    if(/^[a-z가-힣0-9]{3,16}/i.test(value)) {
      setValidText(true)
    } else {
      setValidText(false)
    }
  }

  console.log(validText)
  
  useEffect (() => {
    const axiosUserData =  async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users`);
        const data = response.data;
        setUserData(data);
        setImgUrl(userData.imageUrl);
      } catch (error) {
        console.error('데이터 로드 오류', error);
      }
    };
    
    axiosUserData();
    } ,[])
  
  return (
    <>
      {profileModal && (
        <Modal>
          <Modal.BackGround>
            <Modal.Body>
              <AccountHeader children={'프로필 수정'} />
              <Modal.Form>
                <Modal.ProfileInfoContainer>
                  <Modal.ProfileImg src={imgUrl} alt={'프로필 이미지'}>
                    <Modal.ProfileInput onChange={handleImageUpload} />
                  </Modal.ProfileImg>
                  <Modal.ProfileText
                    textHeader={'닉네임'}
                    placeholder={'닉네임을 입력해주세요.'}
                    pattern={'/^[a-z가-힣0-9]{3,16}/i'}
                    value={nicknameValue}
                    onChange={handleNicknameChange}
                    validation={validText}
                  />
                </Modal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <Modal.Btn className={'w-2/5'} children={'수정'} disabled={
                    validText === null || validText === false
                  }/>
                  <Modal.Btn
                    className={'w-2/5'}
                    children={'취소'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setImgUrl('');
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
                  <Modal.ProfileText placeholder="새로운 비밀번호를 입력해주세요." />
                  <Modal.ProfileText placeholder="새로운 비밀번호를 다시 입력해주세요." />
                  <p className="text-xs px-2 text-gray-700">
                    {'비밀번호 조건'}을 조합하여 8~20자로 설정해주세요.
                  </p>
                </Modal.ProfileInfoContainer>
                <div className="button-container flex justify-around">
                  <Modal.Btn children={'변경'} className={'w-2/5'} />
                  <Modal.Btn
                    children={'취소'}
                    className={'w-2/5'}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
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
          imgUrl={userData.imageUrl}
          profileNickName={userData.nickName}
          profileNumber={userData.phone}
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