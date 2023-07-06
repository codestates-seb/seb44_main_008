import { styled } from 'styled-components';
import { ModalTypes } from './type';

const Modal = ({ isOpen, id, modalVisibleId, offModalHandler }: ModalTypes) => {
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
              <div className="desc">Hello!</div>
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
  z-index: 1;
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
  width: 22rem;
  height: 34rem;
  background-color: var(--main-dark-color);
  .desc {
    color: var(--footer-icon-color);
    font-size: 2rem;
  }
`;
const ExitButton = styled.button``;
export default Modal;
