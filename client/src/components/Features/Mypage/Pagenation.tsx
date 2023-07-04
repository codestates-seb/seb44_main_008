import { styled } from 'styled-components';

const Pagenation = () => {
  return (
    <>
      <PaginationContainer>
        <StyledButton>&lt;</StyledButton>
        <StyledButton>1</StyledButton>
        <StyledButton>2</StyledButton>
        <StyledButton>&gt;</StyledButton>
      </PaginationContainer>
    </>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;
const StyledButton = styled.button`
  width: 1.8rem;
  height: 1.8rem;
  background-color: var(--ghost-color);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--white-color);
  &:hover {
    opacity: 0.7;
  }
`;
export default Pagenation;
