import { useForm } from 'react-hook-form';
import Button from '../../components/Common/Button/Button';
import { AccountWrap } from './AccountStyle';
import { ReactComponent as IcoGoogle } from '@/assets/images/account/icoGoogle.svg';
import { useMutation } from '@tanstack/react-query';
import { Login } from '../../api/auth/account/login';
interface LoginType {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onChange' });

  const LoginMutations = useMutation({
    mutationFn: (user: LoginType) => Login(user),
    onSuccess(data) {
      console.log(data);
      if (data.status === 200) {
        const accessToken = data.headers.authorization;
        const refreshToken = data.headers.refresh;
        if (accessToken) {
          localStorage.setItem('token', accessToken);
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        // window.location.href = `${import.meta.env.VITE_BASE_URL}/main`;
      }
    },
    onError(error: any) {
      if (error.response && error.response.status === 401) {
        alert(error.response.message);
      }
    },
  });

  const onValid = (data: any) => {
    LoginMutations.mutate({ ...data });
    console.log(data);
  };
  return (
    <AccountWrap>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          id="email"
          type="text"
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value:
                /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: '이메일 형식에 맞지 않습니다.',
            },
          })}
          placeholder="이메일"
        />
        <input
          id="password"
          type="password"
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: {
              value: 7,
              message: '7자리 이상 비밀번호를 입력하세요.',
            },
          })}
          placeholder="비밀번호"
        />
        <Button value="로그인" width="100%" type="submit" />
      </form>
      <button type="button" className="snsButton">
        <IcoGoogle /> <span>Sign in with Google</span>
      </button>
    </AccountWrap>
  );
};

export default LoginForm;
