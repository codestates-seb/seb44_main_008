import { SetStateAction, useState } from 'react';
import Pagenation from '../Pagenation';
import { styled } from 'styled-components';
import Modal from '../../../Common/Modal/Modal';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';
import { LIMIT } from '../../../../utils/const';

type tabCType = {
  data2: {
    groupId: number;
    title: string;
    location: string;
    maxCapacity: number;
    currentParticipant: number;
    meetingDate: string;
    movieTitle: string;
  }[];
};

const ContentC = ({ data2 }: tabCType) => {
  const tabCPost = data2;
  const totalElements = tabCPost.length;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { lockScroll, openScroll } = useBodyScrollLock();
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisibleId, setModalVisibleId] = useState(0);
  const [currentRender, setCurrentRender] = useState('Detail');
  const reverseData = data2.slice().reverse();
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
      {reverseData.slice(offset, offset + LIMIT).map(item => (
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
              <p>일시 : {item.meetingDate}</p>
              <p>장소 : {item.location}</p>
              <p>{`모집 인원 : ${item.currentParticipant}/${item.maxCapacity}`}</p>
            </ListTail>
          </ListOnce>
        </ListContainer>
      ))}
      <Pagenation
        total={totalElements}
        limit={LIMIT}
        page={page}
        setPage={setPage}
      />
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
