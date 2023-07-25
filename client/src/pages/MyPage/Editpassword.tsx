import { styled } from 'styled-components';
import Input from '../../components/Common/Input/Input';
import { ChangeEvent, useState } from 'react';
import Button from '../../components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PatchEditUserPassword } from '../../api/user/userInfo/editUserInfo';
import { AxiosError } from '../../assets/type/errorType';

const Editpassword = () => {
  const [currentPw, setCurrentPw] = useState('');
  const [editPw, setEditPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [currentPwErr, setCurrentPwErr] = useState(true);
  const [editPwErr, setEditPwErr] = useState(true);
  const [confirmPwErr, setConfirmPwErr] = useState(true);

  const navigate = useNavigate();
  const mutationPatch = useMutation(PatchEditUserPassword, {
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
      navigate('/mypage');
    },
    onError(err: AxiosError) {
      const errMsg = err.response?.data.message;
      alert(errMsg);
    },
  });

  const pwChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPw(e.target.value);
  };
  const editChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditPw(e.target.value);
  };
  const confirmChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPw(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    {
      currentPw.length === 0
        ? setCurrentPwErr(!currentPwErr)
        : editPw.length === 0
        ? setEditPwErr(!editPwErr)
        : confirmPw.length === 0
        ? setConfirmPwErr(!confirmPwErr)
        : editPw !== confirmPw
        ? alert('비밀번호와 비밀번호 확인이 일치하지 않습니다!!')
        : !passwordRegex.test(editPw)
        ? alert('비밀번호는 영문, 숫자, 특수문자 조합 8~16글자여야 합니다.')
        : editPw === currentPw
        ? alert('현재 비밀번호와 동일한 값으로의 변경은 불가능 합니다.')
        : (() => {
            const confirmed = window.confirm('비밀번호를 변경하시겠습니까?');
            if (confirmed) {
              mutationPatch.mutate({
                currentPw: currentPw,
                newPw: editPw,
              });
            }
          })();
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <InputWrapper>
              <Input
                value={currentPw}
                onChange={pwChangeHandler}
                type="password"
                placeholder="현재 비밀번호"
                isvalid={currentPwErr}
              />
              <Input
                value={editPw}
                onChange={editChangeHandler}
                type="password"
                placeholder="변경 비밀번호 (영문, 숫자, 특수문자 조합 8~16글자)"
                isvalid={editPwErr}
              />
              <Input
                value={confirmPw}
                onChange={confirmChangeHandler}
                type="password"
                placeholder="변경 비밀번호 확인"
                isvalid={confirmPwErr}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button
                width="47%"
                value="마이페이지로 이동"
                onClick={() => navigate('/mypage')}
              />
              <Button
                width="47%"
                value="수정하기"
                type="submit"
                theme="variant"
              />
            </ButtonWrapper>
          </Wrapper>
        </form>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 5rem 0;
  width: 100%;
  background-color: var(--main-dark-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7rem;
  width: 55%;
  margin: auto;
  background-color: var(--main-dark-color);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 20rem;
  justify-content: space-around;
  @media (max-width: 500px) {
    input {
      width: 100%;
    }
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
  padding: 4rem 0;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
export default Editpassword;
