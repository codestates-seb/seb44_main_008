import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import Pagenation from '../Pagenation';
// import { data } from './tabAB';
import Poplike from '../../../Common/PopIcons/Poplike';

// const getData = async () => {
//   const response = await axios.get('/url/groups', {
//     params: { page: page, size: limit },
//   });
//   setTotalElements(response.data.pageInfo.totalElements);
// };
// useEffect(() => {
//   getData();
// }, [page]);
type tabAType = {
  data: {
    reviewBoardId: number;
    title: string;
    movieTitle: string;
    liked: boolean;
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
  }[];
};

const ContentA = ({ data }: tabAType) => {
  console.log('data1', data);
  const [like, setLike] = useState(true);
  const likeHandler = () => {
    setLike(!like);
  };

  const [totalElements, setTotalElements] = useState(data.length);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <>
      {data.slice(offset, offset + limit).map(item => (
        <ListContainer key={item.reviewBoardId}>
          <ListOnce>
            <ListHead>
              <Titles>
                <p className="title">{item.title}</p>
                <p className="mvTitle">{item.movieTitle}</p>
              </Titles>
              <AuthorInfo>
                <img src={item.user.profileImage} alt="사용자 이미지" />
                <p className="author">{item.user.nickname}</p>
              </AuthorInfo>
            </ListHead>
            <ListTail>
              <Poplike onClick={likeHandler} like={like} />
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
  :hover {
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
  align-items: center;
  .title {
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  .mvTitle {
    font-size: 0.8rem;
    margin-left: 0.4rem;
    color: var(--mypage-font-color);
    margin-bottom: 0.25rem;
  }
`;
const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    margin-right: 0.7rem;
  }
  .author {
    color: var(--white-color);
    opacity: 0.7;
    font-size: 0.8rem;
    justify-content: start;
  }
`;
const ListTail = styled.div`
  button {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export default ContentA;
