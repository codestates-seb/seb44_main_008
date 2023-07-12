import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../components/Common/Button/Button';
import { AccountWrap } from './AccountStyle';
import noImg from '../../assets/images/account/noImg.png';
import { useMutation } from '@tanstack/react-query';
import { Signup } from '../../api/auth/account/login';
import { useNavigate } from 'react-router-dom';
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

const SignupForm = (props: any) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupType>({ mode: 'onChange' });

  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [email, setEmail] = useState('');
  const [passWord, setPassword] = useState('');
  const [checkPassWord, setCheckPassword] = useState('');
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [birth, setBirth] = useState('');

  const ChangePage = () => {
    setPage(2);
  };

  const tags = [
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

  const SignupMutation = useMutation({
    mutationFn: (newUser: SignupType) => Signup(newUser),
    onSuccess(data) {
      if (data.status === 201) {
        navigate(`${import.meta.env.VITE_BASE_URL}/users/login`);
      }
      console.log('성공');
    },
    onError(error: any) {
      if (error.response && error.response.status === 409) {
        alert(error.response.message);
      }
      console.log('실패');
    },
  });

  const onVaild: SubmitHandler<SignupType> = (data: any) => {
    console.log(data);
    setPostData(data);
  };

  return (
    <AccountWrap>
      <form onSubmit={handleSubmit(onVaild)}>
        {page === 1 && (
          <div>
            <div className="signImg">
              <label htmlFor="picture" />
              {image ? <img src={imagePreview} /> : <img src={noImg} />}
              <input {...register('profileImage')} id="picture" type="file" />
            </div>
            <input
              id="email"
              type="text"
              placeholder="test@email.com"
              {...register('email', {
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: '이메일 형식에 맞지 않습니다.',
                },
              })}
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
            <input
              id="passwordCheck"
              type="password"
              {...register('passwordCheck', {
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
              })}
              placeholder="비밀번호 확인"
            />
            <Button
              width="100%"
              type="variant"
              value="다음"
              onClick={ChangePage}
            ></Button>
          </div>
        )}
        {page === 2 && (
          <div>
            <div className="tagBtnWrap">
              <ul>
                {tags.map(tag => {
                  return (
                    <li key={tag.tagId}>
                      <Button
                        value={`#${tag.tagName}`}
                        id={tag.tagId}
                        width={'100%'}
                        onClick={e => {
                          setTag(tag.tagName);
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
              <input type="hidden" value={tag} readOnly />
            </div>
            <input
              id="name"
              type="text"
              {...register('name', {
                required: '이름은 필수 입력입니다.',
              })}
              placeholder="이름"
            />
            <input
              id="nickname"
              type="text"
              {...register('nickname', {
                required: '닉네임은 필수 입력입니다.',
              })}
              placeholder="닉네임"
            />
            <input
              id="birth"
              type="date"
              {...register('birth', {
                required: '생년월일은 필수 입력입니다.',
              })}
            />
            <Button width="100%" type="submit" value="회원가입" />
          </div>
        )}
      </form>
    </AccountWrap>
  );
};

export default SignupForm;
