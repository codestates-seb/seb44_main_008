import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';

import SingleItem from '../../components/Features/SingleItem/SingleItem';

const Main = () => {
  const dummyData = {
    recommendBoards: [
      {
        reviewBoardId: 1,
        title: '사용자 맞춤 추천 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 2,
        title: '사용자 맞춤 추천 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 3,
        title: '사용자 맞춤 추천 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 4,
        title: '사용자 맞춤 추천 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
    ],
    popularBoards: [
      {
        reviewBoardId: 1,
        title: '인기 리뷰 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 2,
        title: '인기 리뷰 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 3,
        title: '인기 리뷰 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
      {
        reviewBoardId: 4,
        title: '인기 리뷰 게시글',
        thumbnail:
          'https://cdn.pixabay.com/photo/2023/06/14/06/22/cat-8062388_1280.jpg',
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
        },
      },
    ],
  };

  const navigate = useNavigate();

  const onClickSingleItem = () => {
    navigate('/detail/content');
  };

  const responsive = {
    0: {
      items: 1,
    },
    550: {
      items: 2,
    },
    750: {
      items: 3,
    },
    976: {
      items: 4,
    },
  };

  const popularItems = dummyData.popularBoards.map(item => {
    return (
      <SpecialContainer>
        <SliderContainer>
          <SingleItem
            src={item.thumbnail}
            title={item.title}
            date={item.createdAt}
            author={item.user.nickname}
            isMain={false}
            onClick={onClickSingleItem}
          ></SingleItem>
        </SliderContainer>
      </SpecialContainer>
    );
  });

  const recommendItems = dummyData.recommendBoards.map(item => {
    return (
      <SpecialContainer>
        <SliderContainer>
          <SingleItem
            src={item.thumbnail}
            title={item.title}
            date={item.createdAt}
            author={item.user.nickname}
            isMain={false}
            onClick={onClickSingleItem}
          ></SingleItem>
        </SliderContainer>
      </SpecialContainer>
    );
  });

  return (
    <MainWrapper>
      <SpecialContainer>
        <h1>홍길동님 맞춤 추천 리뷰 게시글✨</h1>
        <AliceCarousel
          mouseTracking
          infinite={true}
          animationDuration={2000}
          disableDotsControls
          disableButtonsControls
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
          disableDotsControls
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
          {dummyData.recommendBoards.map(item => {
            return (
              <SingleItem
                src={item.thumbnail}
                title={item.title}
                date={item.createdAt}
                author={item.user.nickname}
                isMain={true}
                onClick={onClickSingleItem}
              ></SingleItem>
            );
          })}
          {dummyData.popularBoards.map(item => {
            return (
              <SingleItem
                src={item.thumbnail}
                title={item.title}
                date={item.createdAt}
                author={item.user.nickname}
                isMain={true}
                onClick={onClickSingleItem}
              ></SingleItem>
            );
          })}
        </StaticContainer>
      </DefaultContainer>
    </MainWrapper>
  );
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
  width: 120%;
  margin-top: 2rem;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
    padding-left: 10rem;
    color: white;
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

const SliderContainer = styled.div`
  width: 100%;
`;
