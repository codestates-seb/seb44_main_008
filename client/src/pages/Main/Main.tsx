import styled, { StyleSheetManager } from 'styled-components';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import isPropValid from '@emotion/is-prop-valid';

import SingleItem from '../../components/Features/SingleItem/SingleItem';

import ErrorPage from '../ErrorPage/ErrorPage';
import Loading from '../../components/Common/Loading/Loading';

import { getMainItems } from '../../api/reviewItem/reviewItem';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

const Main = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['mainItems'],
    queryFn: () => getMainItems(),
  });

  const userName = useSelector((state: RootState) => state.user.userInfo.name);
  const responsive = {
    0: {
      items: 1,
    },
    360: {
      items: 2,
    },
    620: {
      items: 3,
    },
    1050: {
      items: 4,
    },
    1600: {
      items: 5,
    },
  };

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    // 캐러셀 item 변수
    const popularItems =
      data?.popularBoards &&
      data?.popularBoards.map(item => {
        return (
          <StyleSheetManager
            key={item.reviewBoardId}
            shouldForwardProp={prop => isPropValid(prop)}
          >
            <SpecialContainer>
              <SliderContainer>
                <SingleItem
                  reviewId={String(item.reviewBoardId)}
                  src={item.thumbnail}
                  title={item.title}
                  date={item.createdAt}
                  author={item.user.nickname}
                  isMain={false}
                ></SingleItem>
              </SliderContainer>
            </SpecialContainer>
          </StyleSheetManager>
        );
      });

    const recommendItems =
      data?.recommendBoards &&
      data?.recommendBoards.map(item => {
        return (
          <StyleSheetManager
            key={item.reviewBoardId}
            shouldForwardProp={prop => isPropValid(prop)}
          >
            <SpecialContainer>
              <SliderContainer>
                <SingleItem
                  reviewId={String(item.reviewBoardId)}
                  src={item.thumbnail}
                  title={item.title}
                  date={item.createdAt}
                  author={item.user.nickname}
                  isMain={false}
                ></SingleItem>
              </SliderContainer>
            </SpecialContainer>
          </StyleSheetManager>
        );
      });

    // 여기서 부터 return
    return (
      <MainWrapper>
        <SpecialContainer>
          <h1>{userName}님 맞춤 추천 리뷰 게시글✨</h1>
          <AliceCarousel
            mouseTracking
            infinite={true}
            animationDuration={2000}
            disableButtonsControls
            controlsStrategy="alternate"
            responsive={responsive}
            autoPlay
            items={recommendItems}
          />
        </SpecialContainer>

        <SpecialContainer>
          <h1>인기 리뷰 게시글✨</h1>
          <AliceCarousel
            mouseTracking
            infinite={true}
            animationDuration={2000}
            controlsStrategy="alternate"
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={popularItems}
          />
        </SpecialContainer>

        <DefaultContainer>
          <div>
            <h1>전체 리뷰 게시글</h1>
            <Link to="/main/contents">더 보기</Link>
          </div>
          <StaticContainer>
            {data?.boards &&
              data?.boards.map(item => {
                return (
                  <StyleSheetManager
                    key={item.reviewBoardId}
                    shouldForwardProp={prop => isPropValid(prop)}
                  >
                    <SingleItem
                      reviewId={String(item.reviewBoardId)}
                      src={item.thumbnail}
                      title={item.title}
                      date={item.createdAt}
                      author={item.user.nickname}
                      isMain={true}
                    ></SingleItem>
                  </StyleSheetManager>
                );
              })}
          </StaticContainer>
        </DefaultContainer>
      </MainWrapper>
    );
  }
};

export default Main;

// Styled-Component
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 7rem 0 6rem;
  overflow: hidden;

  background-color: #17191c;
`;
const SpecialContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
    padding-left: 3rem;
    color: white;
  }
  @media (max-width: 1100px) {
    & > h1 {
      font-size: 1.6rem;
      padding-left: 1.3rem;
    }
  }
  @media (max-width: 500px) {
    & > h1 {
      font-size: 1.2rem;
      padding-left: 1rem;
    }
  }

  & .alice-carousel__dots {
    & > .__active {
      background-color: #f20000;
    }
  }
  .alice-carousel {
    width: 120%;
    margin-left: -10%;
  }
`;
const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;

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
  @media (max-width: 500px) {
    & > div {
      & > h1 {
        font-size: 1.2rem;
        padding-left: 1rem;
      }
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
  gap: 4rem 2.5rem;
  @media (max-width: 1500px) {
    gap: 3rem 1rem;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
`;
