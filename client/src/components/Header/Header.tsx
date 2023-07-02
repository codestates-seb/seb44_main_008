import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store/store';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import LoginBtns from './LoginBtns';
import UserArea from './UserArea';

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 6.25rem;
  background-color: #000;
  .headerInner {
    padding: 0 1.8rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Logo = styled.h1`
  a {
    font-family: 'GongGothicMedium';
    font-weight: 700;
    color: #fff;
    font-size: 1.8rem;
    letter-spacing: 1px;
  }
`;
const SearchInputBox = styled.div`
  width: 40rem;
  height: 3.4rem;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    background-color: var(--main-gray-color);
    border: 0;
    color: #565656;
    border-radius: 10px;
    padding: 0 0.87rem;
    &:focus-visible {
      outline: 0;
    }
  }
  button {
    position: absolute;
    right: 0.87rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    path {
      stroke: #9f9f9f;
    }
  }
`;

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <HeaderWrapper>
      <div className="headerInner">
        <Logo>
          <Link to="/main">MoviePOP</Link>
        </Logo>
        <SearchInputBox>
          <input
            type="text"
            placeholder="지금, 관심있는 영화를 검색해 보세요."
          />
          <button>
            <GrSearch />
          </button>
        </SearchInputBox>
        {user.isLoggedIn ? <UserArea /> : <LoginBtns />}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
