import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noImg from '../../assets/images/account/noImg.png';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import { AccountWrap } from './AccountStyle';
import { useQuery } from '@tanstack/react-query';
import { getAccountTags } from '../../api/tags/getTags';
import { useLocation } from 'react-router-dom';
interface SignupType {
  userPostDto: {
    email: string;
    password: string;
    tags: { tagId: number }[];
    name: string;
    nickname: string;
    birth: string;
  };
}

const SignupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const {
    data: tagsArr,
    isLoading,
    error,
    isSuccess,
  } = useQuery(['tags'], () => getAccountTags());

  //상태 저장
  const [imgfile, setImgfile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>(
    location.state.value ? location.state.value : '',
  );
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [tag, setTag] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [selectedTags, setSelectedTags] = useState<Object[]>([]);

  //오류메시지 상태저장
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<string>('');
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState<string>('');
  const [tagMsg, setTagMsg] = useState<string>('');
  const [nameMsg, setNameMsg] = useState<string>('');
  const [nicknameMsg, setnickNameMsg] = useState<string>('');
  const [birthMsg, setBirthMsg] = useState<string>('');

  // 유효성 검사
  const [isImg, setIsImg] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(true);
  const [isTag, setIsTag] = useState<boolean>(true);
  const [isName, setIsName] = useState<boolean>(true);
  const [isnickName, setIsnickName] = useState<boolean>(true);
  const [isBirth, setIsBirth] = useState<boolean>(true);

  // 2페이지로 넘어가는 버튼
  const ClickNextHandle = () => {
    if (!imgfile) {
      setIsImg(false);
    } else {
      setIsImg(true);
    }
    if (email.length === 0) {
      setIsEmail(false);
    }
    if (password.length === 0) {
      setIsPassword(false);
    }
    if (passwordConfirm.length === 0) {
      setIsPasswordConfirm(false);
    }
    if (
      imgfile &&
      email.length !== 0 &&
      password.length !== 0 &&
      passwordConfirm.length !== 0
    ) {
      setPage(2);
    }
  };

  //이메일 유효성검사
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
      if (!emailRegex.test(emailCurrent)) {
        setEmailMsg('이메일 형식이 틀렸습니다.');
        setIsEmail(false);
      } else {
        setIsEmail(true);
      }
    },
    [],
  );

  //비밀번호 유효성검사
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMsg(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.',
        );
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    },
    [],
  );

  //비밀번호 확인 체크
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMsg('비밀번호가 다릅니다. 확인해주세요.');
        setIsPasswordConfirm(false);
      }
    },
    [password],
  );

  const onClickTag = useCallback(
    (tagId: number) => {
      const value = tagId;
      const Index = tag.findIndex(x => x === value);
      if (Index === -1) {
        if (tag.length >= 3) {
          alert('최대 3개까지만 선택 가능합니다.');
        } else {
          setTag([...tag, value]);
        }
      } else {
        const newArr = [...tag];
        newArr.splice(Index, 1);
        setTag(newArr);
      }
      setIsTag(true);
    },
    [tag],
  );

  //이름 유효성 검사
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMsg('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setIsName(true);
    }
  }, []);

  //닉네임 유효성 검사
  const onChangeNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      if (!e.target.value) {
        setnickNameMsg('닉네임은 필수입력입니다.');
        setIsnickName(false);
      } else {
        setIsnickName(true);
      }
    },
    [],
  );

  //생년월일 유효성 검사
  const onChangeBirth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBirth(e.target.value);
      if (!e.target.value) {
        setBirthMsg('생년월일은 필수입력입니다.');
        setIsBirth(false);
      } else {
        setIsBirth(true);
      }
    },
    [],
  );

  const [preview, setPreview] = useState<string | null>('');

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        setImgfile(file);
      } else {
        setImgfile(null);
      }
    }
  };

  useEffect(() => {
    if (imgfile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imgfile);
    } else {
      setPreview(null);
    }
  }, [imgfile]);

  const SubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tag.length === 0) {
      setIsTag(false);
    } else {
      setIsTag(true);
    }
    if (name.length === 0) {
      setIsName(false);
    }
    if (nickname.length === 0) {
      setIsnickName(false);
    }
    if (birth.length === 0) {
      setIsBirth(false);
    }
    if (
      tag.length !== 0 &&
      name.length !== 0 &&
      nickname.length !== 0 &&
      birth.length !== 0
    ) {
      try {
        const data: SignupType = {
          userPostDto: {
            email: email,
            password: password,
            tags: tag.map(v => {
              return { tagId: v };
            }),
            name: name,
            nickname: nickname,
            birth: birth,
          },
        };

        const formData = new FormData();
        formData.append(
          'userPostDto',
          new Blob([JSON.stringify(data.userPostDto)], {
            type: 'application/json',
          }),
        );
        if (imgfile) {
          formData.append('profileImage', imgfile);
        }

        const result = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        console.log(result);
        navigate('/account/login');
      } catch (err) {
        const errMsg = err.response.data.message;
        alert(errMsg);
        console.log('err', err);
      }
    }
  };
  return (
    <AccountWrap>
      <form onSubmit={SubmitEvent}>
        {page === 1 && (
          <div>
            <div className="inputBox imgBox">
              <div className="signImg">
                <label htmlFor="picture" />
                {imgfile ? (
                  <img src={preview as string} />
                ) : (
                  <img src={noImg} />
                )}
                <input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={changeFile}
                  readOnly
                />
              </div>
              {!isImg && <span>이미지는 필수 입력입니다.</span>}
            </div>

            <div className="inputBox">
              <Input
                id="email"
                type="text"
                placeholder="이메일"
                isvalid={isEmail}
                value={email}
                onChange={onChangeEmail}
              />
              {email.length > 0 && !isEmail ? <span>{emailMsg}</span> : null}
            </div>
            <div className="inputBox">
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="비밀번호"
                isvalid={isPassword}
                onChange={onChangePassword}
              />
              {password.length > 0 && !isPassword ? (
                <span>{passwordMsg}</span>
              ) : null}
            </div>
            <div className="inputBox">
              <Input
                id="passwordCheck"
                type="password"
                value={passwordConfirm}
                placeholder="비밀번호 확인"
                isvalid={isPasswordConfirm}
                onChange={onChangePasswordConfirm}
              />
              {passwordConfirm.length > 0 && !isPasswordConfirm ? (
                <span>{passwordConfirmMsg}</span>
              ) : null}
            </div>
            <Button
              width="100%"
              type="button"
              value="다음"
              onClick={ClickNextHandle}
            ></Button>
          </div>
        )}

        {page === 2 && (
          <div>
            <div className="tagBtnWrap inputBox">
              <ul>
                {tagsArr?.map(tagItem => {
                  const selected = tag.includes(tagItem.tagId);
                  return (
                    <li key={tagItem.tagId}>
                      <Button
                        type="button"
                        value={`#${tagItem.tagName}`}
                        id={tagItem.tagId}
                        width={'100%'}
                        theme={selected ? 'variant' : ''}
                        onClick={() => {
                          onClickTag(tagItem.tagId);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
              {!isTag ? <span>태그는 한개이상 선택해야 합니다.</span> : null}
            </div>
            <div className="inputBox">
              <Input
                id="name"
                type="text"
                value={name}
                placeholder="이름"
                isvalid={isName}
                onChange={onChangeName}
              />
              {name.length > 0 && !isName ? <span>{nameMsg}</span> : null}
            </div>
            <div className="inputBox">
              <Input
                id="nickname"
                type="text"
                value={nickname}
                placeholder="닉네임"
                isvalid={isnickName}
                onChange={onChangeNickName}
              />
              {nickname.length > 0 && !isnickName ? (
                <span>{nicknameMsg}</span>
              ) : null}
            </div>
            <div className="inputBox">
              <Input
                id="birth"
                type="date"
                value={birth}
                isvalid={isBirth}
                onChange={onChangeBirth}
              />
              {!isBirth ? <span>{birthMsg}</span> : null}
            </div>
            <Button width="100%" type="submit" value="회원가입" />
          </div>
        )}
      </form>
    </AccountWrap>
  );
};

export default SignupForm;
