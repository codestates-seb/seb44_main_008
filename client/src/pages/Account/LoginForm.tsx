import { ReactComponent as IcoGoogle } from '@/assets/images/account/icoGoogle.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login } from '../../api/auth/account/login';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import { AccountWrap } from './AccountStyle';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import axios from 'axios';
import { instance } from '../../api/api';
import { UserInfoType } from '../../components/Features/Mypage/editmypage/type';
interface LoginType {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const [email, setEmail] = useState<string>('');
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(true);

  const [password, setPassword] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const [userItem, setuserItem] = useState<UserInfoType>();

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
        setEmailMsg('');
        setIsEmail(true); // 유효성 검사 통과 시 true로 설정
      }
    },
    [],
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
    },
    [],
  );

  const onSubmit: SubmitHandler<LoginType> = data => {
    if (email.length === 0 || emailMsg) {
      setIsEmail(false);
      return;
    } else {
      setIsEmail(true);
    }
    if (password.length === 0) {
      setIsPassword(false);
      return;
    } else {
      setIsPassword(true);
    }
    SubmitEvent.mutate({
      email: email,
      password: password,
    });
  };

  const SubmitEvent = useMutation({
    mutationFn: (user: LoginType) => Login(user),
    onSuccess(data) {
      if (data.status === 200) {
        const accessToken = data.headers.authorization;
        const refreshToken = data.headers.refresh;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        const getUser = async () => {
          try {
            const response = await axios.get(`https://moviepop.site/users`, {
              headers: {
                Authorization: accessToken,
                Refresh: refreshToken,
              },
            });
            setuserItem(response.data);
            console.log(response.data);
            dispatch(
              setUser({
                isLoggedIn: true,
                userInfo: {
                  id: response.data.data.userId,
                  name: response.data.data.name,
                  nickname: response.data.data.nickname,
                  user_img: response.data.data.profileImage,
                },
              }),
            );
            navigate('/main');
          } catch (error) {
            console.error(error);
          }
        };
        getUser();
      } else {
        alert('로그인 실패');
      }
    },
    onError(error: any) {
      console.log('err');
      if (error.response && error.response.status === 401) {
        alert(error.response.message);
      }
    },
  });
  return (
    <AccountWrap>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
        <Button value="로그인" width="100%" type="submit" />
      </form>
      <button type="button" className="snsButton">
        <IcoGoogle /> <span>Sign in with Google</span>
      </button>
    </AccountWrap>
  );
};

export default LoginForm;
