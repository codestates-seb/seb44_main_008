import styled from 'styled-components';
import { useState } from 'react';
import { WriteModalType } from './type';

import Input from '../../../Common/Input/Input';
import Button from '../../../Common/Button/Button';

const MovieTitleModal = ({ setModalOn, setMovieTitle }: WriteModalType) => {
  const dummyData = {
    data: {
      movies: [
        {
          movieId: 1,
          movieTitle: '고양이의 보은',
        },
        {
          movieId: 2,
          movieTitle: '옥탑방 고양이',
        },
        {
          movieId: 3,
          movieTitle: '건축학 고양이',
        },
        {
          movieId: 4,
          movieTitle: '고양이가 세상을 구한다',
        },
        {
          movieId: 5,
          movieTitle: '고양이는 내 친구',
        },
      ],
    },
  };

  const [searchTitle, setSearchTitle] = useState('');

  const onClickBackground = () => {
    document.body.style.overflow = 'unset';
    setModalOn(false);
  };

  const onChangeMovieTitle = e => {
    setSearchTitle(e.target.value);
  };

  // axios 통신
  const onClickSearchButton = () => {
    const postData = {};
  };

  const onClickMovieTitle = e => {
    setMovieTitle(e.target.innerHTML);
    setModalOn(false);
    document.body.style.overflow = 'unset';
  };
  return (
    <MovieTitleModalWrapper>
      <ModalBackground onClick={onClickBackground}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <div className="search--bar">
            <div>
              <Input
                value={searchTitle}
                onChange={onChangeMovieTitle}
                placeholder="영화 제목을 검색하세요"
                isvalid={true}
                width="100%"
              ></Input>
            </div>
            <Button value="검색하기" type="variant" width="5.5rem"></Button>
          </div>
          <div className="result--section">
            <SearchResultContainer>
              {dummyData &&
                dummyData.data.movies.map(item => {
                  return (
                    <SearchResult
                      key={item.movieId}
                      value={item.movieTitle}
                      onClick={onClickMovieTitle}
                    >
                      {item.movieTitle}
                    </SearchResult>
                  );
                })}
            </SearchResultContainer>
          </div>
        </ModalContainer>
      </ModalBackground>
    </MovieTitleModalWrapper>
  );
};

export default MovieTitleModal;

const MovieTitleModalWrapper = styled.div`
  width: 100%;
  background-color: black;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);

  z-index: 1;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 65vh;

  z-index: 2;

  border-radius: 1rem;
  background-color: #17191c;

  & > .search--bar {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    margin-top: 2rem;
    margin-bottom: 1rem;

    & > div {
      width: 54%;
    }

    & > button {
      margin-left: 1.5rem;
    }
  }

  & > .result--section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SearchResultContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
  height: 45vh;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
    padding-left: 10px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    background-clip: padding-box;
    border-left: 5px solid transparent;
  }
`;

const SearchResult = styled.li`
  width: 90%;

  margin: 1rem 0;
  padding: 1rem;

  color: white;
  border-radius: 0.5rem;
  background-color: #232323;

  &:hover {
    background-color: #f20000;
  }
`;
