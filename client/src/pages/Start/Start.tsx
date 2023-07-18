import { styled, StyleSheetManager } from 'styled-components';
import Button from '../../components/Common/Button/Button';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import SingleItem from '../../components/Features/SingleItem/SingleItem';
import popbg from '../../assets/images/pop-icons/popbg.jpg';
import { SectionsContainer, Section } from 'react-fullpage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Start = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/account/login');
    window.location.reload();
  };

  //carousel
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
  };

  const dummyData = [
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
  ];

  const items = dummyData.map(item => {
    return (
      <StyleSheetManager key={item.reviewBoardId}>
        <SpecialContainer>
          <SliderContainer>
            <SingleItem
              src={item.thumbnail}
              title={item.title}
              date={item.createdAt}
              author={item.user.nickname}
            ></SingleItem>
          </SliderContainer>
        </SpecialContainer>
      </StyleSheetManager>
    );
  });

  const location = useLocation();
  //fullpage
  let options = {
    activeClass: 'active',
    anchors: ['page1', 'page2', 'page3'],
    arrowNavigation: false,
    className: 'SectionContainer',
    delay: 1000,
    navigation: false,
    scrollBar: false,
    sectionClassName: 'Section',
    verticalAlign: false,
  };

  useEffect(() => {
    const hash = location.hash;
    const thisId = hash ? hash.slice(1) : 'page1';
    const Sections = document.querySelectorAll('.Section');
    const thisSection = document.querySelector(`.${thisId}`);
    for (let section of Sections) {
      section.classList.remove('active');
    }
    thisSection?.classList.add('active');
  }, [location.hash]);

  return (
    <LandingWrap style={{ backgroundImage: `url(${popbg})` }}>
      <SectionsContainer {...options}>
        <Section className="page1 Section">
          <div className="landingHeader">
            <Button value="Login" type="variant" onClick={clickHandler} />
          </div>
          <div className="titlebox">
            <h1 className="title">
              <span>We are POPCORNS</span>
            </h1>
            <h2 className="title">
              <span>This is MOVIEPOP</span>
            </h2>
          </div>
          <p className="pointtxt">좋아하는 영화 리뷰찾고 같이 보자</p>
          <form>
            <input
              type="text"
              placeholder="이메일 입력하고, Movie Pop 시작하기! "
            />
            <Button value="시작하기" type="variant" />
          </form>
        </Section>
        <Section className="page2 Section landinBox">
          <h4 className="slideTxt">
            내가 좋아하는 영화의 <br />
            리뷰글을 남겨 영업해 보세요.
          </h4>
          <div className="sliedWrap">
            <AliceCarousel
              mouseTracking
              infinite={true}
              animationDuration={2000}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              autoPlay
              items={items}
            />
          </div>
        </Section>
        <Section className="page3 Section landinBox landingSlide">
          <div className="scrollBoxslide">
            <ul className="scrollbox">
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
          </div>

          <h4 className="slideTxt">
            다른 사람의 영화 리뷰를 읽고, <br />
            공감하고, 함께 볼 사람을 만나요.
          </h4>
        </Section>
      </SectionsContainer>
    </LandingWrap>
  );
};

export default Start;

const LandingWrap = styled.div`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  .landingHeader {
    width: 100%;
    padding: 1.25rem;
    text-align: right;
  }
  .titlebox {
    width: 100%;
    position: relative;
    text-align: center;
    margin-top: 10rem;
    h1,
    h2 {
      font-size: 4rem;
      span {
        font-family: 'GongGothicMedium';
        font-weight: 700;
        width: 100%;
        color: var(--white-color);
        transform: translateY(-50px);
        opacity: 0;
        animation-name: titleAnimation;
        animation-timing-function: ease;
        animation-duration: 3s;
        letter-spacing: 0.2rem;
      }
    }
    h1 span {
      animation-delay: 0.6s;
      &:first-child {
        animation-delay: 0.7s;
      }
      &:last-child {
        animation-delay: 0.5s;
      }
    }

    h2 {
      top: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      span {
        animation-name: titleAnimation2;
        animation-fill-mode: forwards;
        animation-delay: 4.1s;
        animation-iteration-count: 1;

        &:first-child {
          animation-delay: 4.2s;
        }
        &:last-child {
          color: $secondary-color;
          animation-delay: 4s;
        }
      }
    }
  }

  @keyframes titleAnimation {
    0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    }
    20% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    80% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    100% {
      transform: translateY(50px);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    }
  }
  @keyframes titleAnimation2 {
    0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    }
    20% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    80% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    100% {
      transform: translateY(50px);
      opacity: 1;
      -webkit-clip-path: 100%;
      clip-path: 100%;
    }
  }
  .pointtxt {
    color: var(--white-color);
    font-size: 2rem;
    text-align: center;
    margin: 2rem 0;
  }

  form {
    text-align: center;
    input[type='text'] {
      color: var(--white-color);
      border: 0;
      width: 37.5rem;
      height: 2.55rem;
      background-color: var(--main-gray-color);
      border-radius: 7px;
      margin-right: 1rem;
      padding: 1rem;
      &:focus-visible {
        outline: 0;
      }
    }
    button {
      height: 100%;
    }
  }
  .landinBox {
    align-items: center;
    justify-content: space-between;
    display: flex !important;
    overflow: hidden !important;
    & > h4 {
      margin-left: 4rem;
    }
    .sliedWrap {
      width: 70%;
      margin-right: -10rem;
    }
  }

  .slideTxt {
    color: var(--white-color);
    font-size: 2rem;
    line-height: 3rem;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 4s;
  }
  .active {
    .slideTxt {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .landingSlide {
    padding: 0 6rem 5rem;
  }
  .scrollBoxslide {
    overflow: hidden;
    position: relative;
    width: 50%;
    height: 500px;
    padding-bottom: 5rem;
  }
  .scrollbox {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-wrap: wrap;
    animation: bannermove 7s linear infinite;
  }
  @keyframes bannermove {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, -50%);
    }
  }
  .scrollbox {
    li {
      width: 100%;
      background-color: rgba(217, 217, 217, 0.8);
      border-radius: 7px;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      padding: 1.5rem;
      h6 {
        font-size: 1.4rem;
        font-weight: 600;
      }
      p {
        line-height: 2rem;
      }
    }
    .imgWrap {
      width: 5rem;
      height: 5rem;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 1rem;
      img {
        width: 100%;
      }
    }
  }
`;
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
`;
const SliderContainer = styled.div`
  width: 100%;
`;
