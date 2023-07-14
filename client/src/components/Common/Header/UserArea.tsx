import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../../../redux/store/store';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '../../../api/tags/getTags';

const UserArea = () => {
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

  // const getHashData = useCallback(async () => {
  //   try {
  //     // const {data : { result}} = axios.get("/api/v1/hash");
  //     // setHashArray(result)

  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // }, []);
  const btnMypage = useCallback(() => {
    navigate('/mypage');
    setMyShow(false);
  }, []);
  const BtnLogout = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    //dispatch(resetUser());
    setMyShow(false);
  }, []);

  const onClickTagButton = e => {
    setHashShow(false);
    console.log(e.target.id);
    navigate(`/main/contents/${e.target.id}`);
  };
  return (
    <UserAreaWrap>
      <div className="hashArea">
        <button
          onClick={() => {
            setHashShow(prev => !prev);
          }}
        >
          #
        </button>
        {hashShow && (
          <div className="hashBtns">
            <ul>
              {tagData?.map(tag => {
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
        <button
          onClick={() => {
            setMyShow(prev => !prev);
          }}
        >
          <img src={userImg} alt="사용자 프로필 사진" />
        </button>
        {myShow && (
          <div className="myBtns">
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
    border-radius: 20px;
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
