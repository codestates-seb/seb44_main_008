import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import styled from 'styled-components';
import LoginBtns from './LoginBtns';
import UserArea from './UserArea';
import SearchInput from './SearchInput';
import TopButton from './TopButton';
import { GrSearch } from 'react-icons/gr';
import { useState } from 'react';

const Header = () => {
  const [istoggle, setIsToggle] = useState<boolean>(false);

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
          <ButtonAlign>
            <SearchInput istoggle={istoggle} setIsToggle={setIsToggle} />
            <button
              className="seachButton"
              onClick={() => {
                setIsToggle(!istoggle);
              }}
            >
              <GrSearch />
            </button>

            <UserArea />
          </ButtonAlign>
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
  .seachButton {
    display: none;
  }
  @media (max-width: 850px) {
    height: 5.5rem;
    .headerInner {
      padding: 0 1.3rem;
    }
  }
  @media (max-width: 500px) {
    height: 5rem;
    .seachButton {
      display: flex;
      width: 2.2rem;
      height: 2.2rem;
      font-size: 1rem;
      background-color: #232323;
      border-radius: 100%;
      align-items: center;
      justify-content: center;
      path {
        stroke: var(--white-color);
      }
    }
  }
`;

const ButtonAlign = styled.div`
  display: contents;
  @media (max-width: 500px) {
    display: flex;
    .seachButton {
      margin-right: 0.5rem;
    }
  }
`;
const Logo = styled.h1`
  a {
    font-family: 'GongGothicMedium';
    font-weight: 700;
    color: var(--white-color);
    font-size: 1.8rem;
    letter-spacing: 1px;
    padding-right: 0.6rem;
    @media (max-width: 850px) {
      font-size: 1.5rem;
    }
    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
`;

export default Header;
