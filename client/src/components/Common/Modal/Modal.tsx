import { styled } from 'styled-components';
import { ModalTypes } from './type';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import PopperDetail from '../../Features/Detail/Popper/PopperDetail';
import PopperEdit from '../../Features/Detail/Popper/PopperEdit';

const Modal = ({
  isOpen,
  id,
  modalVisibleId,
  offModalHandler,
  currentRender,
  setCurrentRender,
}: ModalTypes) => {
  const [currentId, setCurrentID] = useState(id);

  const prevStep = () => {
    offModalHandler(id);
  };

  return (
    <>
      {modalVisibleId === id && isOpen ? (
        <Container>
          <ModalBackDrop onClick={() => prevStep()}>
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              <button className="closeBtn" onClick={() => prevStep()}>
                <GrClose />
              </button>
              <ModalPopperBox>
                {currentRender === 'Detail' && (
                  <PopperDetail
                    currentId={currentId}
                    setCurrentID={setCurrentID}
                    setCurrentRender={setCurrentRender}
                    currentPage="myPageMyPop"
                    reviewId={currentId.toString()}
                  />
                )}
                {currentRender === 'Edit' && (
                  <PopperEdit
                    currentId={currentId}
                    setCurrentRender={setCurrentRender}
                    currentPage="myPageMyPop"
                  />
                )}
                {currentRender === 'DetailMine' && (
                  <PopperDetail
                    currentId={currentId}
                    setCurrentID={setCurrentID}
                    setCurrentRender={setCurrentRender}
                    currentPage="myPageOtherPop"
                    reviewId={currentId.toString()}
                  />
                )}
              </ModalPopperBox>
            </ModalView>
          </ModalBackDrop>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalBackDrop = styled.div`
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  width: 35%;
  background-color: var(--main-dark-color);
  z-index: 1000;
  position: relative;
  .closeBtn {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    svg {
      font-size: 1.2rem;
      path {
        stroke: var(--main-dark-color);
      }
    }
  }
  @media (max-width: 850px) {
    width: 60%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`;
const ModalPopperBox = styled.div`
  width: 100%;
`;
export default Modal;
