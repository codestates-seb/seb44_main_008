import { styled } from 'styled-components';
import { useState } from 'react';
import Pagenation from '../Pagenation';
import Poplike from '../../../Common/PopIcons/Poplike';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteTabA } from '../../../../api/user/userTab/userTab';
import { useNavigate } from 'react-router-dom';
import { LIMIT } from '../../../../utils/const';

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const tabAPost = data;
  const like = true;
  const deletePostMutation = useMutation(DeleteTabA, {
    onSuccess: () => {
      queryClient.invalidateQueries(['TabUserInfo']);
    },
  });
  const likeHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reviewId: number,
  ) => {
    event.stopPropagation();

    const confirmed = window.confirm('정말 이 게시글을 찜 해제하시겠습니까?');
    if (confirmed) {
      deletePostMutation.mutate(reviewId);
      alert('게시글이 찜 해제되었습니다.');
    }
  };

  const moveHandler = (reviewId: number) => {
    navigate(`/detail/content/${reviewId}`);
  };
  const totalElements = tabAPost.length;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const reverseData = data.slice().reverse();
  return (
    <>
      {reverseData.slice(offset, offset + LIMIT).map(item => (
        <ListContainer key={item.reviewBoardId}>
          <ListOnce onClick={() => moveHandler(item.reviewBoardId)}>
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
              <Poplike
                onClick={event => likeHandler(event, item.reviewBoardId)}
                like={like}
              />
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
  @media (max-width: 500px) {
    padding: 1rem 1rem;
  }
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
  @media (max-width: 500px) {
    .title {
      font-weight: 500;
      font-size: 0.9rem;
      width: 70%;
    }
    .mvTitle {
      font-weight: 500;
      font-size: 0.6rem;
      width: 7rem;
      justify-content: flex-start;
    }
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
  @media (max-width: 500px) {
    img {
      width: 1rem;
      height: 1rem;
    }
    .author {
      font-size: 0.6rem;
    }
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
