import { styled, StyleSheetManager } from 'styled-components';
import Button from '../../components/Common/Button/Button';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import SingleItem from '../../components/Features/SingleItem/SingleItem';
import popbg from '../../assets/images/pop-icons/popbg.jpg';
import { SectionsContainer, Section } from 'react-fullpage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TfiArrowCircleDown } from 'react-icons/tfi';

const Start = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');

  const clickHandler = () => {
    navigate('/account/login');
  };

  const ChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const getEmail = () => {
    navigate('/account/signup', { state: { value: email } });
  };
  //carousel
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 2,
    },
  };

  const dummyData = [
    {
      reviewBoardId: 1,
      title: '오랜만에 심장이 울었습니다..',
      thumbnail:
        'https://res.heraldm.com/content/image/2023/05/30/20230530000795_0.jpg',
      createdAt: '2023-07-02',
      user: {
        userId: 1,
        nickname: '장근실',
      },
    },
    {
      reviewBoardId: 2,
      title: '범죄도시 1, 2를 봤다면...',
      thumbnail:
        'https://file2.nocutnews.co.kr/newsroom/image/2023/04/29/202304291432372295_0.jpg',
      createdAt: '2023-07-16',
      user: {
        userId: 1,
        nickname: '권우혁',
      },
    },
    {
      reviewBoardId: 6,
      title: '이것은 갓작이다. 패.왕.별.희',
      thumbnail:
        'https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202003/17/newsen/20200317082302729eceb.jpg',
      createdAt: '2023-07-16',
      user: {
        userId: 6,
        nickname: '박영미',
      },
    },
    {
      reviewBoardId: 3,
      title: '이건 제 인생영화입니다.',
      thumbnail: 'https://t1.daumcdn.net/cfile/tistory/202AAE264A1B8A52D4',
      createdAt: '2023-07-13',
      user: {
        userId: 3,
        nickname: '정승현',
      },
    },
    {
      reviewBoardId: 4,
      title: '톰 형님과의 의리로 봐야할 영화',
      thumbnail:
        'https://cdn.gametoc.co.kr/news/photo/202307/74257_230544_299.jpg',
      createdAt: '2023-07-16',
      user: {
        userId: 4,
        nickname: '오태호',
      },
    },
    {
      reviewBoardId: 5,
      title: '스파이더맨 홈커밍',
      thumbnail:
        'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/171BC5F7EC137B12CDD33AA092A979A7184370E95DE757DAFAED487A6E55882D/scale?width=1200&aspectRatio=1.78&format=jpeg',
      createdAt: '2023-07-03',
      user: {
        userId: 5,
        nickname: '송현우',
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
            <Button value="Login" theme="variant" onClick={clickHandler} />
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
              onChange={ChangeEmail}
            />
            <Button value="시작하기" theme="variant" onClick={getEmail} />
          </form>
          <ScrollDown>
            <p></p>
            <span>SCROLL</span>
          </ScrollDown>
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
              autoPlayStrategy={'none'}
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
                  <h6>가디언즈 오브 갤럭시: Volume 3</h6>
                  <p>평일 저녁 맥주 마시면서 같이 볼 직장인 모여라! 🍺</p>
                  <span>9월 29일 저녁 8시 왓챠파티</span>
                </div>
              </li>
              <li>
                <div className="imgWrap">
                  <img
                    src="https://image.blip.kr/v1/file/d7ca01eac91e50d3491832db44b37228"
                    alt=""
                  />
                </div>
                <div>
                  <h6>나이트메어 앨리</h6>
                  <p>같이 소통하면서 영화봐요 ✨</p>
                  <span>8월 13일 저녁 6시 넷플릭스</span>
                </div>
              </li>
              <li>
                <div className="imgWrap">
                  <img
                    src="https://i.pinimg.com/236x/f2/c8/84/f2c884b9024d40a1a78c1051280c91d9.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h6>엘리멘탈</h6>
                  <p>엘리멘탈 5번 정주행합니다 🔥 ❤️ 💦</p>
                  <span>8월 1일 저녁 6시 홍대 CGV</span>
                </div>
              </li>
              <li>
                <div className="imgWrap">
                  <img
                    src="https://thumb.mtstarnews.com/06/2019/10/2019101115024034215_1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h6>명탐정코난-흑철의 어영</h6>
                  <p>같이 추리하면서 코난 즐기실 다섯분 모집합니다! 🕵🏻‍♀️</p>
                  <span>7월 28일 1시 부평 CGV</span>
                </div>
              </li>
              <li>
                <div className="imgWrap">
                  <img
                    src="https://i.pinimg.com/736x/fe/70/81/fe7081518703a1df969ffc9302c989cb.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <h6>미션 임파서블-데드 레코닝 PART ONE</h6>
                  <p>톰 크루즈 보려고 봅니다. 팬심으로 모여라 ❤️</p>
                  <span>8월 3일 3시 화곡 메가박스</span>
                </div>
              </li>
              <li>
                <div className="imgWrap">
                  <img
                    src="https://issuya.com/data/editor/2303/16791071613326.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h6>인사이드 아웃</h6>
                  <p>나랑 같이 놀 친구, 빙봉빙봉 🎵</p>
                  <span>9월 10일 3시 디즈니플러스</span>
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
    justify-content: space-around;
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

  @media (max-width: 1100px) {
    .landingHeader {
      padding: 1rem;
    }
    .titlebox {
      h1,
      h2 {
        font-size: 3rem;
      }
    }
    .pointtxt {
      font-size: 1.6rem;
      margin: 1.5rem 0;
    }
    form {
      input[type='text'] {
        width: 25.5rem;
      }
    }
    .slideTxt {
      font-size: 1.5rem;
      line-height: 2.3rem;
    }
    .scrollbox {
      .imgWrap {
        width: 4rem;
        height: 4rem;
      }
      li {
        padding: 1.2rem;
        h6 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        p {
          font-size: 1rem;
          line-height: 2rem;
        }
        span {
          font-size: 0.9rem;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .landingHeader {
      padding: 1rem;
    }
    .titlebox {
      h1,
      h2 {
        font-size: 1.8rem;
      }
    }
    .pointtxt {
      font-size: 1.2rem;
      margin: 1.5rem 0;
    }
    form {
      input[type='text'] {
        width: 90%;
        margin-bottom: 15px;
        margin-right: 0;
      }
    }

    .landinBox {
      flex-direction: column;
      justify-content: center;
      & > h4 {
        margin-left: 0;
        margin-bottom: 30px;
      }
      .sliedWrap {
        width: 100%;
        margin-right: 0;
      }
    }
    .slideTxt {
      font-size: 1.2rem;
      line-height: 2rem;
    }
    .landingSlide {
      flex-direction: column-reverse;
      padding: 0;
    }
    .scrollBoxslide {
      width: 80%;
      height: 300px;
    }
    .scrollbox {
      .imgWrap {
        width: 3rem;
        height: 3rem;
      }
      li {
        & > div:nth-child(2) {
          width: calc(100% - 4rem);
        }
        padding: 0.7rem;
        h6 {
          font-size: 1rem;
          font-weight: 600;
        }
        p {
          font-size: 0.8rem;
          line-height: 2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          width: 100%;
        }
        span {
          font-size: 0.9rem;
        }
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
    color: var(--white-color);
  }
`;
const SliderContainer = styled.div`
  width: 100%;
  pointer-events: none;
`;
const ScrollDown = styled.div`
  margin-top: 150px;
  text-align: center;
  position: relative;
  span {
    opacity: 0.5;
    color: var(--white-color);
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 1px;
  }
  p {
    margin: 0 auto;
    width: 24px;
    height: 24px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: sdb 1.5s infinite;
    animation: sdb 1.5s infinite;
    box-sizing: border-box;
  }

  @-webkit-keyframes sdb {
    0% {
      -webkit-transform: rotate(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: rotate(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
  }
  @keyframes sdb {
    0% {
      transform: rotate(-45deg) translate(0, 0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: rotate(-45deg) translate(-20px, 20px);
      opacity: 0;
    }
  }
  @media (max-width: 1100px) {
    span {
      bottom: -60px;
      font-size: 0.8rem;
    }
  }
  @media (max-width: 500px) {
    margin-top: 80px;
    span {
      bottom: -50px;
      font-size: 0.8rem;
    }
  }
`;
