import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import { AccountWrap } from './AccountStyle';
import { ReactComponent as IcoGoogle } from '@/assets/images/account/icoGoogle.svg';
interface LoginType {
  email: string;
  password: string;
}

const Login = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onChange' });

  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');

  return (
    <AccountWrap>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <Input
          id="email"
          type="text"
          isvalid="true"
          width="100%"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식에 맞지 않습니다.',
              },
            });
          }}
          placeholder="이메일"
        />
        <Input
          id="password"
          type="password"
          isvalid="true"
          width="100%"
          value={passWord}
          onChange={e => {
            setPassword(e.target.value);
            register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 7,
                message: '7자리 이상 비밀번호를 입력하세요.',
              },
            });
          }}
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

export default Login;
