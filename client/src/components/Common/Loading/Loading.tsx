import { styled } from 'styled-components';
import popcorn from '../../../assets/images/pop-icons/popcorn.png';

const Loading = () => {
  return (
    <LoadingBox>
      <img src={popcorn} alt="로딩 팝콘" className="loadingPop" />
      <p className="loadingTxt">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
      </p>
    </LoadingBox>
  );
};

const LoadingBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .loadingPop {
    width: 5rem;
    animation: rotate_image 6s linear infinite;
    margin-top: -5rem;
    margin-bottom: 3rem;
  }
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
  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
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

export default Loading;
