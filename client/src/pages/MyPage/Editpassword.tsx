import { styled } from 'styled-components';
import Input from '../../components/Common/Input/Input';
import { ChangeEvent, useState } from 'react';
import Button from '../../components/Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PatchEditUserPassword } from '../../api/user/userInfo/editUserInfo';

const Editpassword = () => {
  const [currentPw, setCurrentPw] = useState('');
  const [editPw, setEditPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();
  const mutationPatch = useMutation(PatchEditUserPassword, {
    onSuccess: data => {
      console.log(data);
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
    mutationPatch.mutate({
      currentPw: currentPw,
      newPw: editPw,
    });
  };
  console.log(currentPw, editPw, confirmPw);
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
                isvalid={'true'}
              />
              <Input
                value={editPw}
                onChange={editChangeHandler}
                type="password"
                placeholder="변경 비밀번호 (영문, 숫자, 특수문자 조합 8~16글자)"
                isvalid={'true'}
              />
              <Input
                value={confirmPw}
                onChange={confirmChangeHandler}
                type="password"
                placeholder="변경 비밀번호 확인"
                isvalid={'true'}
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
  padding: 4rem 0;
`;
export default Editpassword;
