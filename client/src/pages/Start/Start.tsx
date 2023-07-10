import { useEffect, useState } from 'react';
import { styled, StyleSheetManager } from 'styled-components';
import Button from '../../components/Common/Button/Button';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import SingleItem from '../../components/Features/SingleItem/SingleItem';

const Start = () => {
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const handleDragStart = e => e.preventDefault();

  const dummyData = {
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

  const [position, setPosition] = useState(0);

  const onScroll = () => {
    setPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <LandingBox>
      <div>
        <div className="landingHeader">
          <Button value="Login" />
        </div>
        <h1>
          <span>M</span>
          <span>o</span>
          <span>v</span>
          <span>i</span>
          <span>e</span>
          <span>P</span>
          <span>O</span>
          <span>P</span>
        </h1>
        <p>좋아하는 영화 리뷰찾고 같이 보자</p>
        <form>
          <input type="text" />
          <Button value="시작하기" />
        </form>
      </div>
      <div>
        <h4>
          내가 좋아하는 영화의 <br />
          리뷰글을 남겨 영업해 보세요.
        </h4>
        {dummyData.popularBoards.map(item => {
          return (
            <StyleSheetManager key={item.reviewBoardId}>
              <SingleItem
                src={item.thumbnail}
                title={item.title}
                date={item.createdAt}
                author={item.user.nickname}
              ></SingleItem>
            </StyleSheetManager>
          );
        })}
      </div>
      <div>
        <ul>
          <li>
            <div className="imgWrap">
              <img
                src="https://img.wkorea.com/w/2022/12/style_639ae72b68d07.jpg"
                alt=""
              />
            </div>
            <div>
              <h6>가디언즈 오브 갤럭시 3</h6>
              <p>평일 저녁 맥주 마시면서 같이 볼 직장인 모여라!</p>
              <span>9월 29일 저녁 8시 왓챠파티</span>
            </div>
          </li>
        </ul>
        <h4>
          다른 사람의 영화 리뷰를 읽고, <br />
          공감하고, 함께 볼 사람을 만나요.
        </h4>
      </div>
    </LandingBox>
  );
};

export default Start;

const LandingBox = styled.div``;
const SpecialContainer = styled.div`
  width: 120%;
  margin-top: 2rem;

  position: relative;

  & > h1 {
    font-size: 1.5rem;
    font-weight: 700;
    padding-left: 10rem;
    color: white;
  }

  & .alice-carousel__dots {
    position: absolute;
    top: -50px;
    left: 1200px;
    & > .__active {
      background-color: #f20000;
    }
  }
`;
const SliderContainer = styled.div`
  width: 100%;
`;
