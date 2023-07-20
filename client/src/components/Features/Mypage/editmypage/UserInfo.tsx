import React, {
  ChangeEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styled } from 'styled-components';
import { FileData } from './type';
import editImage from '../../../../assets/images/user-info/editImage.svg';
import Input from '../../../Common/Input/Input';
import Button from '../../../Common/Button/Button';
import { EditInfoType, Tag } from './type';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  PatchEditUser,
  getEditUser,
} from '../../../../api/user/userInfo/editUserInfo';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import Loading from '../../../Common/Loading/Loading';
import { useDispatch } from 'react-redux';
import { updateProfileImage } from '../../../../redux/reducers/user';

const UserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [userNickname, setUserNickname] = useState('');
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['EditUserInfo'],
    queryFn: () => getEditUser(),
  });
  const nickNameIn = userNickname ? userNickname : data?.data.nickname;
  const [tempImg, setTempImg] = useState('');
  const mutationPatch = useMutation(PatchEditUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['EditUserInfo']);
      navigate('/mypage');
    },
  });
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  useEffect(() => {
    if (data) {
      setSelectedTags(data.data.myTags);
      setTempImg(data.data.profileImage);
    }
  }, [data]);

  const [image, setImage] = useState<FileData | null>();
  const fileInput: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [nicknameMsg, setnickNameMsg] = useState<string>('');
  const [isnickName, setIsnickName] = useState(true);

  const onChangeNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserNickname(e.target.value);
      if (!e.target.value) {
        setnickNameMsg('닉네임은 필수입력입니다.');
        setIsnickName(false);
      } else {
        setIsnickName(true);
      }
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm('회원정보를 저장하시겠습니까?');
    if (confirmed) {
      mutationPatch.mutate({
        userPatchDto: {
          nickname: nickNameIn,
          tags: selectedTags.map(tag => ({ tagId: tag.tagId })),
        },
        profileImage: image,
      });
      alert('회원정보가 저장되었습니다.');
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      const newFileUrl = URL.createObjectURL(event.target.files[0]);
      setTempImg(newFileUrl);
      dispatch(updateProfileImage(newFileUrl));
    }
  };
  const onClickImg: MouseEventHandler<HTMLImageElement> = event => {
    event?.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const onClickTag: MouseEventHandler<HTMLButtonElement> = event => {
    const { target } = event as unknown as EditInfoType;
    const element = document.getElementById(
      target.id as unknown as string,
    )?.classList;
    const newTagId: number = Number(target.id);

    const newTagName: string = target.name.substr(1);
    const tagIdArray = selectedTags.map(tagObject => tagObject.tagId);
    if (selectedTags.length === 1 && tagIdArray.indexOf(newTagId) !== -1) {
      alert('태그는 한개 이상 선택해야 합니다.');
    } else if (tagIdArray.indexOf(newTagId) !== -1) {
      element?.toggle('clicked');
      const deletedTagList = selectedTags.filter(tag => tag.tagId !== newTagId);
      setSelectedTags(deletedTagList);
    } else if (selectedTags.length >= 3) {
      alert('태그는 최대 3개까지 선택 가능합니다.');
    } else {
      element?.toggle('clicked');
      const newTag = {
        tagId: newTagId,
        tagName: newTagName,
      };
      setSelectedTags([...selectedTags, newTag]);
    }
  };

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    const tags = data.data.tags;
    return (
      <>
        <Container>
          <FormContainer onSubmit={handleSubmit}>
            <ImgContainer>
              <img
                src={tempImg}
                alt="사용자 이미지"
                className="userImage"
                onClick={onClickImg}
              />
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
                accept="image/*"
                onChange={onChange}
                ref={fileInput}
                id="user_info"
              />
            </ImgContainer>
            <EditInputContainer>
              <NicknameContainer>
                <p>닉네임</p>
                <NicknameInner>
                  <Input
                    placeholder="닉네임"
                    value={data.data.nickname && data.data.nickname}
                    onChange={onChangeNickName}
                    isvalid={isnickName!.toString()}
                  />
                  {userNickname.length === 0 && !isnickName ? (
                    <span>{nicknameMsg}</span>
                  ) : null}
                </NicknameInner>
              </NicknameContainer>
            </EditInputContainer>
            <TopContainer>
              <p>태그</p>
              <ButtonList>
                {tags.map(tag => {
                  const isMyTag = selectedTags.some(
                    myTag => myTag.tagId === tag.tagId,
                  );

                  return (
                    <li key={tag.tagId}>
                      {isMyTag ? (
                        <Button
                          value={`#${tag.tagName}`}
                          id={tag.tagId}
                          width={'100%'}
                          onClick={onClickTag}
                          type="button"
                          theme="variant"
                        />
                      ) : (
                        <Button
                          value={`#${tag.tagName}`}
                          id={tag.tagId}
                          width={'100%'}
                          onClick={onClickTag}
                          type="button"
                        />
                      )}
                    </li>
                  );
                })}
              </ButtonList>
            </TopContainer>
            <TailContainer>
              <Button
                width="47%"
                value="비밀번호 수정"
                onClick={() => navigate('/mypage/edit/pass')}
              />
              <Button width="47%" value="회원정보 저장" theme="variant" />
            </TailContainer>
          </FormContainer>
        </Container>
      </>
    );
  }
};

const NicknameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > span {
    margin-top: 0.4rem;
    color: var(--white-color);
  }
`;

const FormContainer = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > p {
    margin-top: 1rem;
    align-self: flex-start;
    padding-bottom: 1rem;
    font-size: 1rem;
    color: var(--footer-icon-color);
  }
`;

const ButtonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5rem;
  & > li {
    width: 15.5%;
  }
  li .clicked {
    background-color: var(--theme-color);
  }
  li .clicked:hover {
    background-color: var(--theme-hover-color) !important;
  }
`;
const TailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5rem;
`;

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
    object-fit: cover;
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
  margin: 0.5rem 0 1rem 0;
  p {
    font-size: 1rem;
    color: #cfcfcf;
    width: 100%;
    margin-top: 0.3rem;
    padding-right: 1.5rem;
  }
`;

export default UserInfo;
