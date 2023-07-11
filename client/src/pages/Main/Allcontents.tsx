import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled, { StyleSheetManager } from 'styled-components';
import { dummyData } from './dummyData';

import SingleItem from '../../components/Features/SingleItem/SingleItem';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import isPropValid from '@emotion/is-prop-valid';

const Allcontents = () => {
  //로딩 테스트를 위한 가짜 fetch 함수를 넣었다.
  const testFetch = (delay = 1000) =>
    new Promise(res => setTimeout(res, delay));

  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState(dummyData.boards.slice(0, 12));

  //현재 목업 데이터를 사용하고 있기 때문에, 최대한 데이터를 재활용하는 코드를 작성.
  //(0~4번 게시물, 1~5번 게시물, 2~6번 게시물 이런 식으로 가져와서 5개씩 concat함수로 붙였다.)
  //getMoreItem 함수가 실행되면 isLoaded를 true로 만들어 로딩 컴포넌트를 보여주고,
  //함수가 종료될 때 isLoaded를 false로 만들어 로딩컴포넌트를 숨겼다.
  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex(i => i + 1);
    setData(data.concat(dummyData.boards.slice(itemIndex, itemIndex + 4)));
    setIsLoaded(false);
  };

  //intersection 콜백함수
  //entry는 IntersectionObserverEntry 인스턴스의 배열
  //isIntersecting: 대상 객체와 루트 영역의 교차상태를 boolean값으로 나타냄
  //대상 객체가 루트 영역과 교차 상태로 들어갈 때(true), 나갈 때(false)
  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer,
  ) => {
    //보통 교차여부만 확인하는 것 같다. 코드는 로딩상태까지 확인함.
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  const navigate = useNavigate();

  const onClickSingleItem = () => {
    navigate('/detail/content');
  };

  return (
    <DefaultContainer>
      <div>
        <h1>전체 리뷰 게시글</h1>
      </div>
      <StaticContainer>
        {data.map(item => {
          return (
            <StyleSheetManager
              key={item.reviewBoardId}
              shouldForwardProp={prop => isPropValid(prop)}
            >
              <SingleItem
                src={item.thumbnail}
                title={item.title}
                date={item.createdAt}
                author={item.user.nickname}
                isMain={true}
                onClick={onClickSingleItem}
              ></SingleItem>
            </StyleSheetManager>
          );
        })}
      </StaticContainer>
      <div ref={setTarget}>
        {isLoaded && (
          <Loader>
            <p className="loadingTxt">
              <span>L</span>
              <span>o</span>
              <span>a</span>
              <span>d</span>
              <span>i</span>
              <span>n</span>
              <span>g</span>
            </p>
          </Loader>
        )}
      </div>
    </DefaultContainer>
  );
};

export default Allcontents;

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 6.5rem;

  & > div {
    display: flex;
    justify-content: space-between;
    & > h1 {
      font-size: 1.5rem;
      font-weight: 700;
      padding-left: 2rem;
      color: white;
    }
    & > a {
      color: white;
      padding-right: 2rem;
    }
  }
`;

const StaticContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  padding: 1rem;
  gap: 2.5rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3rem;

  .loadingTxt {
    color: var(--white-color);
    text-transform: uppercase;
    span {
      animation: jumb 2s infinite;
      display: table-cell;
      padding: 0 0.2rem;
    }
    span:nth-child(1) {
      animation-delay: 0s;
    }
    span:nth-child(2) {
      animation-delay: 0.1s;
    }
    span:nth-child(3) {
      animation-delay: 0.2s;
    }
    span:nth-child(4) {
      animation-delay: 0.3s;
    }
    span:nth-child(5) {
      animation-delay: 0.4s;
    }
    span:nth-child(6) {
      animation-delay: 0.5s;
    }
    span:nth-child(7) {
      animation-delay: 0.6s;
    }
  }

  @keyframes jumb {
    0% {
      transform: translateY(0px);
      opacity: 0.2;
    }
    50% {
      transform: translateY(-5px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;
