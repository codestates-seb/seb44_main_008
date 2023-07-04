import styled from 'styled-components';
import Popunlike from '../../Common/PopIcons/Popunlike';
import UserAvat from '@/assets/images/user-info/userAvatar.png';

const DetailSection = styled.div`
  h4 {
    font-size: 2.1rem;
    color: var(--white-color);
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .movieInfo {
    margin: 0.8rem 0;
    p {
      font-size: 1.3rem;
      color: var(--white-color);
    }
    ul {
      display: flex;
      li {
        padding: 0.6rem 1.2rem;
        border-radius: 7px;
        background-color: var(--main-gray-color);
        margin-left: 0.4rem;
        color: var(--white-color);
        font-size: 0.8rem;
      }
    }
  }
  .writeInfo {
    color: var(--white-color);
    div {
      svg {
        width: 2rem;
        height: 2rem;
        margin: 0 0.5rem 0 1rem;
      }
    }
    > div:first-child {
      align-items: self-end;
      span {
        margin-bottom: 2px;
        margin-left: 2px;
      }
      svg {
        width: 2rem;
        height: auto;
        margin: 0;
      }
    }
  }
  .imgWrap {
    border-radius: 7px;
    overflow: hidden;
    margin: 1rem 0;
    img {
      width: 100%;
    }
  }
  .detailContent {
    color: var(--white-color);
    line-height: 1.5rem;
  }
`;
const Detail = () => {
  return (
    <DetailSection>
      <h4>고양이 집사라면 필수 시청인 영화</h4>
      <div className="movieInfo">
        <p>고양이의 보은</p>
        <ul>
          <li>#힐링</li>
          <li>#로맨스</li>
        </ul>
      </div>
      <div className="writeInfo">
        <div>
          <Popunlike />
          <span>23</span>
        </div>
        <div>
          <span>2023.06.30</span>
          <UserAvat />
          <p>정승현</p>
        </div>
      </div>
      <div className="imgWrap">
        <img
          src="https://i.ytimg.com/vi/xa7r2aQz2tQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAfMGgw2iICyXPv-ALunB-3oOdwlQ"
          alt="고양이의 보은 사진"
        />
      </div>
      <p className="detailContent">
        17세 여고생인 하루는 집으로 가는 길에 트럭에 치일뻔한 고양이를
        구해줍니다. 그 고양이는 하루에게 고맙다고 이야기를 하고 하루의 일상은
        변화가 생기기 시작합니다. 하루는 자신이 구해준 고양이가 고양이 왕국의
        왕자인 룬이라는 사실을 알게 되고 하루의 집 앞에 찾아온 고양이 무리는
        왕자를 구해준 보답으로 왕자와 결혼해 달라고 하고 사라집니다. 그러던 중
        이상한 목소리에 듣게 되고 하루는 고양이 사무소를 찾게 됩니다. 고양이
        사무소에서 바론, 무타, 토토를 만나게 되지만 고양이 왕국의 고양이 무리가
        와서 하루를 데리고 가 버립니다. 바론, 무타는 추격해서 고양이 왕국으로
        들어가게 됩니다. 고양이 왕국에 도착하자 하루는 서서히 고양이로 변하고
        바론과 무타의 도움으로 하루는 탈출을 시도합니다. 이를 고양이 왕국의 왕은
        막으려고 하고 한바탕 소동이 벌어집니다.
      </p>
    </DetailSection>
  );
};

export default Detail;
