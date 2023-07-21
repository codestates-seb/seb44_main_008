import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '../../../api/tags/getTags';
import { clearUser } from '../../../redux/reducers/user';

const UserArea = () => {
  const hashMenu = useRef<HTMLDivElement>(null);
  const hashRef = useRef<HTMLButtonElement>(null);
  const myMenu = useRef<HTMLDivElement>(null);
  const myRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hashShow, setHashShow] = useState(false);
  const [myShow, setMyShow] = useState(false);

  const {
    data: tagData,
    isLoading,
    error,
    isSuccess,
  } = useQuery(['tags'], () => getAllTags());

  const userImg = useSelector(
    (state: RootState) => state.user.userInfo.user_img,
  );

  const btnMypage = useCallback(() => {
    navigate('/mypage');
    setMyShow(false);
  }, []);
  const BtnLogout = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    alert('로그아웃 되었습니다.');
    setMyShow(false);
    navigate('/');
  }, []);

  const onClickTagButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHashShow(false);
    navigate(`/main/contents/${e.currentTarget.id}`);
  };
  const clickHash = () => {
    setHashShow(prev => !prev);
  };
  const clickMy = () => {
    setMyShow(prev => !prev);
  };
  const clickBody = useCallback(
    (e: MouseEvent) => {
      if (
        hashShow &&
        !hashMenu.current?.contains(e.target as Node) &&
        !hashRef.current?.contains(e.target as Node)
      ) {
        setHashShow(false);
      }
      if (
        myShow &&
        !myMenu.current?.contains(e.target as Node) &&
        !myRef.current?.contains(e.target as Node)
      ) {
        setMyShow(false);
      }
    },
    [hashShow, myShow],
  );
  useEffect(() => {
    window.addEventListener('mousedown', clickBody);
    return () => {
      window.removeEventListener('mousedown', clickBody);
    };
  }, [hashShow, myShow]);

  return (
    <UserAreaWrap>
      <div className="hashArea">
        <button onClick={clickHash} ref={hashRef}>
          #
        </button>
        {hashShow && (
          <div className="hashBtns" ref={hashMenu}>
            <ul>
              {isSuccess &&
                tagData.map(tag => {
                  return (
                    <li key={tag.tagId}>
                      <Button
                        value={`#${tag.tagName}`}
                        id={tag.tagId}
                        width={'100%'}
                        onClick={onClickTagButton}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
      <Link to="/detail/write" className="headerWriteBtn">
        리뷰 작성
      </Link>
      <div className="myArea">
        <button ref={myRef} onClick={clickMy}>
          <img src={userImg} alt="사용자 프로필 사진" />
        </button>
        {myShow && (
          <div className="myBtns" ref={myMenu}>
            <button onClick={btnMypage}>MyPage</button>
            <button onClick={BtnLogout}>Logout</button>
          </div>
        )}
      </div>
    </UserAreaWrap>
  );
};

const UserAreaWrap = styled.div`
  display: flex;
  align-items: center;
  .hashArea {
    > button {
      width: 3.3rem;
      height: 3.3rem;
      font-size: 1.75rem;
      color: var(--white-color);
      background-color: #232323;
      border-radius: 100%;
      transition: all 0.2s;
      &:hover {
        background-color: #c20000;
      }
    }
    .hashBtns {
      width: 28rem;
      background-color: #000;
      position: absolute;
      right: 0;
      top: 100%;
      padding: 1.25rem;
      border-radius: 10px;
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        li {
          width: 29%;
        }
      }
    }
  }
  .myArea {
    > button {
      width: 3.3rem;
      height: 3.3rem;
      position: relative;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .myBtns {
      position: absolute;
      right: 1rem;
      top: 100%;
      width: 10.5rem;
      padding: 0 0.625rem;
      border-radius: 5px;
      background-color: var(--main-gray-color);
      display: flex;
      flex-direction: column;
      button {
        font-size: 1rem;
        color: var(--white-color);
        line-height: 3.125rem;
        &:first-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .headerWriteBtn {
    height: 3.3rem;
    line-height: 100%;
    border-radius: 50px;
    background-color: var(--main-gray-color);
    color: var(--white-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    transition: all 0.2s;
    margin: 0 1rem;
    &:hover {
      background-color: var(--theme-hover-color);
    }
  }
`;

export default UserArea;
