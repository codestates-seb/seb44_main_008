import { useMutation } from '@tanstack/react-query';
import { styled } from 'styled-components';
import { DeleteUser } from '../../../api/user/userInfo/userInfo';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../redux/reducers/user';

const DeleteMember = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutationDelete = useMutation(DeleteUser);
  const deletehandler = () => {
    const confirmed = window.confirm('회원 탈퇴를 하시겠습니까?');
    if (confirmed) {
      dispatch(clearUser());
      mutationDelete.mutate();
      alert('회원 탈퇴가 정상적으로 완료되었습니다.');
      navigate('/');
    }
  };
  return (
    <Container>
      <DeleteButton onClick={deletehandler}>회원 탈퇴</DeleteButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--main-dark-color);
  padding-bottom: 3rem;
  :hover {
    background-color: var(--theme-hover-color);
  }
`;
const DeleteButton = styled.button`
  width: 25rem;
  height: 2rem;
  background-color: var(--main-gray-color);
  border-radius: 7px;
  color: var(--footer-icon-color);
`;
export default DeleteMember;
