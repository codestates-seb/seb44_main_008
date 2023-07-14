import { SetStateAction, useEffect, useState } from 'react';
import Pagenation from '../Pagenation';
import { styled } from 'styled-components';
// import { data2 } from './tabCD';
import Modal from '../../../Common/Modal/Modal';
import { useBodyScrollLock } from '../../../../hooks/useBodyScrollLock';

// const getData = async () => {
//   const response = await axios.get('/url/groups', {
//     params: { page: page, size: limit },
//   });
//   setTotalElements(response.data.pageInfo.totalElements);
// };
// useEffect(() => {
//   getData();
// }, [page]);
type tabDType = {
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

const ContentD = ({ data2 }: tabDType) => {
  console.log('data4', data2);
  const [totalElements, setTotalElements] = useState(data2.length);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { lockScroll, openScroll } = useBodyScrollLock();
  const [isOpen, setIsOpen] = useState(false);
  const [modalVisibleId, setModalVisibleId] = useState(0);
  const [currentRender, setCurrentRender] = useState('DetailMine');
  const onModalHandler = (id: SetStateAction<number>) => {
    setModalVisibleId(id);
    setIsOpen(true);
    lockScroll();
    setCurrentRender('DetailMine');
  };
  const offModalHandler = (id: SetStateAction<number>) => {
    setModalVisibleId(id);
    setIsOpen(false);
    openScroll();
  };

  return (
    <>
      {data2.slice(offset, offset + limit).map(item => (
        <ListContainer key={item.groupId}>
          <Modal
            id={item.groupId}
            isOpen={isOpen}
            modalVisibleId={modalVisibleId}
            offModalHandler={offModalHandler}
            currentRender={'DetailMine'}
            setCurrentRender={setCurrentRender}
          />
          <ListOnce onClick={() => onModalHandler(item.groupId)}>
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
        limit={limit}
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

export default ContentD;
