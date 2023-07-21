import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import styled from 'styled-components';
import LoginBtns from './LoginBtns';
import UserArea from './UserArea';
import SearchInput from './SearchInput';
import TopButton from './TopButton';

const Header = () => {
  const userCheck = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <HeaderWrapper>
      <div className="headerInner">
        <Logo>
          {userCheck ? (
            <Link to="/main">MoviePOP</Link>
          ) : (
            <Link to="/">MoviePOP</Link>
          )}
        </Logo>

        {userCheck ? (
          <>
            <SearchInput />
            <UserArea />
          </>
        ) : (
          <LoginBtns />
        )}
      </div>
      {userCheck ? <TopButton /> : null}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  height: 6.25rem;
  background-color: #000;
  z-index: 100;
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

export default Header;
