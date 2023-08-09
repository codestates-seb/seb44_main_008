import { useState } from 'react';
import Pagenation from '../Pagenation';
import { styled } from 'styled-components';
import Button from '../../../Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { DeleteTabB } from '../../../../api/user/userTab/userTab';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LIMIT } from '../../../../utils/const';
import { tabBType } from './type';

const ContentB = ({ data }: tabBType) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const tabBPost = data;
  const totalElements = tabBPost.length;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;
  const deletePostMutation = useMutation(DeleteTabB, {
    onSuccess: () => {
      queryClient.invalidateQueries(['TabUserInfo']);
    },
  });

  const reverseData = data.slice().reverse();
  const moveHandler = (reviewId: number) => {
    navigate(`/detail/content/${reviewId}`);
  };
  const editBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reviewBoardId: number,
  ) => {
    event.stopPropagation();
    navigate(`/detail/edit/${reviewBoardId}`);
  };
  const delBtn = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reviewBoardId: number,
  ) => {
    event.stopPropagation();
    const deleteHandler = (postId: number) => {
      const confirmed = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
      if (confirmed) {
        deletePostMutation.mutate(postId);
        alert('게시글이 삭제되었습니다.');
      }
    };
    deleteHandler(reviewBoardId);
  };
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
              <Button
                value={'수정'}
                theme="variant"
                onClick={event => editBtn(event, item.reviewBoardId)}
              />
              <Button
                value={'삭제'}
                theme="variant"
                onClick={event => delBtn(event, item.reviewBoardId)}
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
  @media (max-width: 500px) {
    padding: 1rem 1rem;
    margin-bottom: 1.5rem;
  }
`;
const ListHead = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 9rem);
`;
const Titles = styled.div`
  display: flex;
  align-items: center;
  .title {
    font-weight: 700;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
    width: 75%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
      width: 90%;
    }
    .mvTitle {
      font-weight: 500;
      font-size: 0.6rem;
      width: 50%;
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
  display: flex;
  width: 9rem;
  justify-content: flex-end;
  button:last-child {
    margin-left: 7px;
  }
`;

export default ContentB;
