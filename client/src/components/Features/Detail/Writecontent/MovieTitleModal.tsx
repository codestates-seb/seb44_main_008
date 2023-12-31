import React, { useState } from 'react';
import styled from 'styled-components';
import { WriteModalType } from './type';

import { useQuery } from '@tanstack/react-query';
import { getMovie } from '../../../../api/movie/movie';
import Input from '../../../Common/Input/Input';

const MovieTitleModal = ({
  setModalOn,
  setMovieTitle,
  setMovieId,
}: WriteModalType) => {
  const [searchTitle, setSearchTitle] = useState('');

  const onClickBackground = () => {
    document.body.style.overflow = 'unset';
    setModalOn && setModalOn(false);
  };

  const onChangeMovieTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setSearchTitle(target.value);
  };

  // api 통신
  const { data, isSuccess } = useQuery(
    ['movies', searchTitle],
    () => getMovie(searchTitle),
    { enabled: !!searchTitle },
  );

  const onClickMovieTitle = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLUListElement;
    setMovieTitle && setMovieTitle(target.innerHTML);
    setMovieId && setMovieId(Number(target.id));
    setModalOn && setModalOn(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <MovieTitleModalWrapper>
      <ModalBackground onClick={onClickBackground}>
        <ModalContainer
          onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            event.stopPropagation()
          }
        >
          <div className="search--bar">
            <Input
              value={searchTitle}
              onChange={onChangeMovieTitle}
              placeholder="영화 제목을 검색하세요"
              isvalid={true}
              width="100%"
            ></Input>
          </div>
          {isSuccess && (
            <div className="result--section">
              <SearchResultContainer>
                {data?.map(item => {
                  return (
                    <SearchResult
                      key={item.movieId}
                      id={String(item.movieId)}
                      value={item.title}
                      onClick={onClickMovieTitle}
                    >
                      {item.title}
                    </SearchResult>
                  );
                })}
              </SearchResultContainer>
            </div>
          )}
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);

  z-index: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

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
    margin-top: 2rem;
    width: 80%;
  }

  & > .result--section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 500px) {
    width: 80%;
    height: 50%;
    & > .result--section {
      width: 100%;
      height: 75%;
    }
  }

  @media (max-width: 850px) {
    width: 75%;
    height: 50%;
    & > .result--section {
      width: 100%;
      height: 75%;
    }
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

  @media (max-width: 500px) {
  }
`;

const SearchResult = styled.li`
  width: 100%;

  margin: 1rem 0;
  padding: 1rem;

  color: white;
  border-radius: 0.5rem;
  background-color: #232323;

  &:hover {
    background-color: #f20000;
  }
`;
