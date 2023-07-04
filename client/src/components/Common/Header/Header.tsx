import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import styled from 'styled-components';
import LoginBtns from './LoginBtns';
import UserArea from './UserArea';
import SearchInput from './SearchInput';

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

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <HeaderWrapper>
      <div className="headerInner">
        <Logo>
          <Link to="/main">MoviePOP</Link>
        </Logo>

        {user.isLoggedIn ? (
          <>
            <SearchInput />
            <UserArea />
          </>
        ) : (
          <LoginBtns />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
