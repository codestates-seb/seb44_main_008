import { styled } from 'styled-components';
import popIcon from '../../../assets/images/toast-img/popcorn_PNG2 2.png';
import React, { useEffect } from 'react';

export interface Props {
  text: string;
  setToastState: React.Dispatch<React.SetStateAction<boolean>>;
  setToastAnimation: React.Dispatch<React.SetStateAction<string>>;
  toastAnimation: string;
}

const ToastNotification = ({
  text,
  setToastState,
  setToastAnimation,
  toastAnimation,
}: Props) => {
  useEffect(() => {
    let timer2: NodeJS.Timeout;
    let timer = setTimeout(() => {
      setToastAnimation('toast-alert closeAnimation');
      timer2 = setTimeout(() => {
        setToastState(false);
      }, 500);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Container className={toastAnimation}>
      <img src={popIcon} alt="토스트 팝콘이미지" />
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  height: 3rem;
  min-width: 18rem;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  color: black;
  position: fixed;
  bottom: 30px;
  right: 30px;
  img {
    width: 25px;
    height: auto;
    margin-right: 10px;
  }
  @keyframes slideIn {
    from {
      transform: translateY(100px);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100px);
    }
  }
  &.openAnimation {
    animation: slideIn 0.5s ease-in-out 0s 1 normal forwards;
  }
  &.closeAnimation {
    animation: slideIn 0.5s ease-in-out 0s 1 normal forwards;
  }
`;

const Text = styled.div`
  width: 100%;
  font-size: 15px;
  letter-spacing: 0.3px;
  text-align: center;
`;
export default ToastNotification;
