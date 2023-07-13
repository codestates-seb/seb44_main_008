import React, {
  useEffect,
  useState,
  ChangeEvent,
  useRef,
  useCallback,
} from 'react';
import Button from '../../components/Common/Button/Button';
import { AccountWrap } from './AccountStyle';
import { useNavigate } from 'react-router-dom';
import noImg from '../../assets/images/account/noImg.png';
import axios from 'axios';
import Input from '../../components/Common/Input/Input';

interface SignupType {
  userPostDto: {
    email: string;
    password: string;
    tags: { tagId: number }[];
    name: string;
    nickname: string;
    birth: string;
  };
  profileImage: string;
}


const SignupForm = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(2);

  //상태 저장
  const [imgfile, setImgfile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [tag, setTag] = useState([]);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [profileImage, setProfileImage] = useState('');

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
    if (email.length === 0 || emailMsg) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
    if (!imgfile) {
      setIsImg(false);
    } else {
      setIsImg(true);
    }
    if (password.length === 0 || passwordMsg) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
    }
    if (passwordConfirm.length === 0 || passwordConfirmMsg) {
      setIsPasswordConfirm(false);
    } else {
      setIsPasswordConfirm(true);
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

  const tagsArr = [
    {
      tagId: 1,
      tagName: '로맨스',
    },
    {
      tagId: 2,
      tagName: '호러',
    },
    {
      tagId: 3,
      tagName: '판타지',
    },
    {
      tagId: 4,
      tagName: '스포츠',
    },
    {
      tagId: 5,
      tagName: 'SF',
    },
    {
      tagId: 6,
      tagName: '액션',
    },
    {
      tagId: 7,
      tagName: '애니메이션',
    },
    {
      tagId: 8,
      tagName: '범죄',
    },
    {
      tagId: 9,
      tagName: '힐링',
    },
    {
      tagId: 10,
      tagName: '미스테리',
    },
    {
      tagId: 11,
      tagName: '뮤지컬',
    },
    {
      tagId: 12,
      tagName: '코미디',
    },
  ];

  //이메일 체크
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

  //비밀번호 체크
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

  const onChangeTag = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const clickTag = e.target.tagId;
    console.log(clickTag);
  }, []);
  // const checkNickName = () => {
  //   if (!nickname) {
  //     setNickNameError('닉네임을 입력해야 합니다.');
  //     return false;
  //   }
  //   setNickNameError(null);
  //   return true;
  // };
  // const checkPassword = () => {
  //   const passwordRegex =
  //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
  //   if (!password) {
  //     setPasswordError('');
  //     return false;
  //   }
  //   if (!passwordRegex.test(password)) {
  //     setPasswordError('올바른 비밀번호 형식에 맞지 않습니다.');
  //     return false;
  //   }
  //   setPasswordError(null);
  //   return true;
  // };
  // const checkConfirmPassword = () => {
  //   if (!passwordCheck) {
  //     setPasswordCheckError('확인 비밀번호를 입력해주세요.');
  //     return false;
  //   } else if (password !== passwordCheck) {
  //     setPasswordCheckError('비밀번호와 확인 비밀번호가 다릅니다.');
  //     return false;
  //   }
  //   setPasswordCheckError(null);
  //   return true;
  // };
  // const checkname = () => {
  //   if (!name) {
  //     setNameError('이름을 입력해야 합니다.');
  //     return false;
  //   }
  //   setNameError(null);
  //   return true;
  // };
  // const checkBirth = () => {
  //   if (!birth) {
  //     setBirthError('생년월일을 입력해야 합니다.');
  //     return false;
  //   }
  //   setBirthError(null);
  //   return true;
  // };
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
    try {
      const data: SignupType = {
        userPostDto: {
          email: email,
          password: password,
          tags: [{ tagId: 1 }, { tagId: 2 }],
          name: name,
          nickname: nickname,
          birth: birth,
        },
        profileImage: '',
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
        'http://ec2-3-36-105-246.ap-northeast-2.compute.amazonaws.com:8080/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AccountWrap>
      <form>
        {page === 1 && (
          <div>
            <div className="inputBox">
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
            <div className="tagBtnWrap">
              <ul>
                {tagsArr.map(tag => {
                  return (
                    <li key={tag.tagId}>
                      <Button
                        type="button"
                        value={`#${tag.tagName}`}
                        id={tag.tagId}
                        width={'100%'}
                        onClick={onChangeTag}
                      />
                    </li>
                  );
                })}
              </ul>
              <input type="hidden" value={tag} readOnly />
            </div>

            {/* <input id="name" type="text" value={name} placeholder="이름" />

            <input
              id="nickname"
              type="text"
              value={nickname}
              placeholder="닉네임"
            />
            <input id="birth" type="date" value={birth} /> */}
            <Button width="100%" type="submit" value="회원가입" />
          </div>
        )}
      </form>
    </AccountWrap>
  );
};

export default SignupForm;
