import { ChangeEvent, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { FileData, UserInfoType } from './type';
import editImage from '../../../../assets/images/user-info/editImage.svg';
import Input from '../../../Common/Input/Input';
import { getEditUser } from '../../../../api/user/userInfo/editUserInfo';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import Loading from '../../../Common/Loading/Loading';

const UserInfo = () => {
  const defaultImage =
    'http://localhost:5173/src/assets/images/user-info/userAvatar.png';
  const [Image, setImage] = useState<FileData | null | string>(defaultImage);

  const data: UserInfoType = {
    userId: 1,
    email: 'hgd123@gmail.com',
    nickname: '홍길동2',
    profileImage: Image,
  };

  const fileInput = useRef(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const imageFile = event.target.files[0];
      if (imageFile instanceof Blob) {
        setImage(imageFile);
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            const result = reader.result as string;
            setImage(result);
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert('파일 형식이 맞지 않습니다.');
      }
    } else {
      setImage(
        'http://localhost:5173/src/assets/images/user-info/userAvatar.png',
      );
      return;
    }
  };

  // const { data, isLoading, error, isSuccess } = useQuery({
  //   queryKey: ['EditUser'],
  //   queryFn: () => getEditUser(),
  // });
  // console.log(data);
  // if (error) {
  //   return <ErrorPage />;
  // }
  // if (isLoading) {
  //   return <Loading />;
  // }
  // if (isSuccess)
  const [inputValue, setInputValue] = useState(data.nickname);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };
  return (
    <>
      <Container>
        <ImgContainer>
          {typeof Image === 'string' ? (
            <img
              src={data.profileImage}
              alt="사용자 이미지"
              className="userImage"
            />
          ) : (
            <span>이미지가 없습니다.</span>
          )}
          <label htmlFor="user_info">
            <div className="editCover">
              <img
                className="editImage"
                src={editImage}
                alt="사진 변경 이미지"
              />
            </div>
          </label>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            onChange={onChange}
            ref={fileInput}
            id="user_info"
          />
        </ImgContainer>
        <EditInputContainer>
          <NicknameContainer>
            <p>닉네임</p>
            <Input
              placeholder="닉네임"
              value={inputValue}
              onChange={changeHandler}
              isvalid={'false'}
            />
          </NicknameContainer>
        </EditInputContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  width: 100%;
  margin: auto;
  background-color: var(--main-dark-color);
`;
const ImgContainer = styled.div`
  label {
    display: inline-block;
  }
  .editCover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: var(--footer-icon-color);
    transform: translate(-90%, -110%);
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: var(--ghost-color);
    }
  }
  .editImage {
    width: 1.5rem;
    height: 1.5rem;
  }
  .userImage {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const EditInputContainer = styled.div`
  padding-top: 1.8rem;
`;
const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  p {
    font-size: 0.8rem;
    color: #cfcfcf;
    width: 100%;
    padding-right: 1.5rem;
  }
`;

export default UserInfo;
