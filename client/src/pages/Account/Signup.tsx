import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import { AccountWrap } from './AccountStyle';
import noImg from '../../assets/images/account/noImg.png';
interface SignupType {
  email: string;
  password: string;
  passwordCheck: string;
  tags: { tagId: number }[];
  name: string;
  nickname: string;
  birth: string;
  profileImage: string;
}

const Signup = (props: any) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({ mode: 'onChange' });

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [checkPassWord, setCheckPassword] = useState('');

  const ChangePage = () => {
    setPage(2);
  };

  const [imagePreview, setImagePreview] = useState('');
  const image = watch('profileImage');
  useEffect(() => {
    if (image && image.length > 0) {
      if (typeof image[0] === 'string') {
        const file = image[0] as string;
        setImagePreview(file);
      } else {
        const file = image[0] as Blob;
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }, [image]);

  return (
    <AccountWrap>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        {page === 1 && (
          <div>
            <div className="signImg">
              {image ? <img src={imagePreview} /> : <img src={noImg} />}
            </div>
            <input {...register('profileImage')} id="picture" type="file" />
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
            <Input
              id="passwordCheck"
              type="password"
              isvalid="true"
              width="100%"
              value={checkPassWord}
              onChange={e => {
                setCheckPassword(e.target.value);
                register('passwordCheck', {
                  required: '비밀번호는 필수 입력입니다.',
                  minLength: {
                    value: 7,
                    message: '7자리 이상 비밀번호를 입력하세요.',
                  },
                  validate: {
                    check: val => {
                      if (passWord !== val) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                });
              }}
              placeholder="비밀번호"
            />
            <Button
              width="100%"
              type="variant"
              value="다음"
              onClick={ChangePage}
            ></Button>
          </div>
        )}
        {page === 2 && <div>2페이지 입니당 ~~</div>}
      </form>
    </AccountWrap>
  );
};

export default Signup;
