import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const TopButton = () => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollY + viewportHeight >= documentHeight) {
        setShowButton(false);
      } else if (scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <TopBtn>
        <button id="top" onClick={scrollToTop} type="button">
          {' '}
          <FaArrowUp />
        </button>
      </TopBtn>
    )
  );
};
const TopBtn = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white-color);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 100%;
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 100;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  button {
    width: 100%;
    display: block;
    height: 100%;
    font-size: 18px;
  }
`;
export default TopButton;
