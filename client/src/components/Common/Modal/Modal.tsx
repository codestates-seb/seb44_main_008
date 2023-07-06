import { styled } from 'styled-components';
import { ModalTypes } from './type';
import { PopperBox } from '../../Features/Detail/Popper/PopperStyle';
import { useCallback, useState } from 'react';
import PopperDetail from '../../Features/Detail/Popper/PopperDetail';

type PopperDetailProps = {
  currentId: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  setCurrentRender: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
};

const Modal = ({ isOpen, id, modalVisibleId, offModalHandler }: ModalTypes) => {
  const [currentId, setCurrentID] = useState(id);
  const [currentRender, setCurrentRender] = useState('List');
  const clickEdit = useCallback(() => {
    setCurrentRender('Edit');
    setCurrentID(id);
  }, []);
  return (
    <>
      {modalVisibleId === id && isOpen ? (
        <Container>
          <ModalBackDrop onClick={() => offModalHandler(id)}>
            <ModalView
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              }
            >
              <ExitButton onClick={() => offModalHandler(id)}>↩</ExitButton>
              <div>
                <ModalPopperBox>
                  <PopperDetail
                    currentId={currentId}
                    setCurrentID={setCurrentID}
                    setCurrentRender={setCurrentRender}
                    currentPage="popDetail"
                  />
                </ModalPopperBox>
              </div>
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
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
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
  border-radius: 20px;
  width: 50%;
  background-color: var(--main-dark-color);
  padding: 1rem;
  z-index: 1000;
  .desc {
    color: var(--footer-icon-color);
  }
`;
const ExitButton = styled.button``;
const ModalPopperBox = styled.div``;
export default Modal;
