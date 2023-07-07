import { SetStateAction, useState } from 'react';
import { postsType } from './type';
import Pagenation from '../Pagenation';
import { styled } from 'styled-components';
import { data2 } from './tabCD';
import Modal from '../../../Common/Modal/Modal';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';

const ContentC = () => {
  const { lockScroll, openScroll } = useBodyScrollLock();
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const postData = (posts: postsType[]) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisibleId, setModalVisibleId] = useState(0);
  const [currentRender, setCurrentRender] = useState('Detail');
  const onModalHandler = (id: SetStateAction<number>) => {
    setModalVisibleId(id);
    setIsOpen(true);
    lockScroll();
    setCurrentRender('Detail');
  };
  const offModalHandler = (id: SetStateAction<number>) => {
    setModalVisibleId(id);
    setIsOpen(false);
    openScroll();
  };

  return (
    <>
      {data2.map(item => (
        <ListContainer key={item.groupId}>
          <Modal
            id={item.groupId}
            isOpen={isOpen}
            modalVisibleId={modalVisibleId}
            offModalHandler={offModalHandler}
            currentRender={currentRender}
            setCurrentRender={setCurrentRender}
          />
          <ListOnce
            className="list"
            onClick={() => onModalHandler(item.groupId)}
          >
            <ListHead>
              <Titles>
                <p className="title">{item.title}</p>
              </Titles>
              <AuthorInfo>
                <p className="mvTitle">{item.movieTitle}</p>
              </AuthorInfo>
            </ListHead>
            <ListTail>
              <p>일시 : {item.date}</p>
              <p>장소 : {item.location}</p>
              <p>{`모집 인원 : ${item.current}/${item.max}`}</p>
            </ListTail>
          </ListOnce>
        </ListContainer>
      ))}
      <Pagenation />
    </>
  );
};

const ListContainer = styled.div`
  > :hover {
    background-color: var(--main-gray-color);
  }
`;

const ListOnce = styled.div`
  width: 100%;
  background-color: var(--ghost-color);
  margin-bottom: 2.4rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ListHead = styled.div`
  display: flex;
  flex-direction: column;
`;
const Titles = styled.div`
  display: flex;
  .title {
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  > p {
    font-size: 0.7rem;
    color: var(--mypage-font-color);
  }
`;

const ListTail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  align-items: flex-end;
  justify-content: space-between;
  height: 3.35rem;
`;

export default ContentC;
