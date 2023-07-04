import { styled } from 'styled-components';

const DeleteMember = () => {
  return (
    <Container>
      <DeleteButton>회원 탈퇴</DeleteButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--main-dark-color);
  padding-bottom: 3rem;
`;
const DeleteButton = styled.button`
  width: 25rem;
  height: 2rem;
  background-color: var(--main-gray-color);
  border-radius: 7px;
  color: var(--footer-icon-color);
`;
export default DeleteMember;
