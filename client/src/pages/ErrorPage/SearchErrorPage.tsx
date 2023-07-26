import { useNavigate } from 'react-router-dom';
import errorIcon from '@/assets/images/errorpage/errorIcon.svg';
import { styled } from 'styled-components';

const SearchErrorPage = () => {
  const navigate = useNavigate();
  const handleMove = () => {
    navigate('/main');
  };
  return (
    <Wrapper>
      <img src={errorIcon} alt="에러페이지 아이콘" />
      <span>앗 이런! 찾는 영화가 없습니다 🤫</span>
      <ButtonStyled onClick={handleMove}>
        <button>홈으로 돌아가기</button>
      </ButtonStyled>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  background: var(--main-dark-color);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  span {
    color: white;
    font-size: 2.2rem;
    padding-bottom: 10rem;
    opacity: 0.8;
  }
  button {
    color: var(--ghost-color);
    font-size: 1.6rem;
    padding: 0.5rem;
  }
`;
const ButtonStyled = styled.div`
  border: 2px solid var(--ghost-color);
  cursor: pointer;
`;

export default SearchErrorPage;
