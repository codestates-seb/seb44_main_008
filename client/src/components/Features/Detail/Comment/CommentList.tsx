import { useState } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import Poplike from '../../../Common/PopIcons/Poplike';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteComment } from '../../../../api/comment/comment';
import { getDate } from '../../../../assets/commonts/common';
import {
  deleteCommentLike,
  getCommentLike,
} from '../../../../api/like/commentLike';

const CommentList = ({
  data,
  reviewId,
}: {
  data: Comments[];
  reviewId: string;
}) => {
  const userId = useSelector((state: RootState) => state.user.userInfo.id);

  return (
    <CommentListWrap>
      {data &&
        data.map(answer => {
          return (
            <Li
              key={answer.commentId}
              answer={answer}
              userId={userId}
              reviewId={reviewId}
              commentId={answer.commentId}
            />
          );
        })}
    </CommentListWrap>
  );
};
const Li: React.FC<{
  answer: Comments;
  userId: number;
  reviewId: string;
  commentId: number;
}> = ({ answer, userId, reviewId }) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(answer.liked);
  const [likeCount, setLikeCount] = useState<number>(
    answer.likes ? answer.likes : 0,
  );

  const mutationLike = useMutation(getCommentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
    },
  });
  const mutationUnLike = useMutation(deleteCommentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
    },
  });
  const ClickLike = async (commentId: number) => {
    try {
      if (liked === false) {
        await mutationLike.mutateAsync(commentId);
        setLikeCount(likeCount => likeCount + 1);
      } else {
        await mutationUnLike.mutate(commentId);
        setLikeCount(likeCount => likeCount - 1);
      }
      setLiked(prev => !prev);
    } catch (err) {
      console.log('err', err);
    }
  };

  const mutationDelete = useMutation(DeleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
    },
  });
  const commentDelete = (commentId: number) => {
    const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmed) {
      mutationDelete.mutate(commentId);
      alert('댓글이 정상적으로 삭제되었습니다.');
    }
  };

  return (
    <li>
      <div>
        <div className="userBox">
          <div className="userImg">
            <img src={answer.user.profileImage} alt={answer.user.nickname} />
          </div>
          <p>
            <span>{answer.user.nickname}</span>
            <span>{getDate(answer.createdAt)}</span>
          </p>
        </div>
        {userId === answer.user.userId && (
          <button
            className="closeBtn"
            onClick={() => commentDelete(answer.commentId)}
          >
            <GrClose />
          </button>
        )}
      </div>
      <div className="commetTxt">
        <p>{answer.content}</p>
        <div className="buttonWrap">
          <Poplike onClick={() => ClickLike(answer.commentId)} like={liked} />
          <span>{likeCount} Pops</span>
        </div>
      </div>
    </li>
  );
};
const CommentListWrap = styled.ul`
  li {
    background-color: var(--main-gray-color);
    border-radius: 7px;
    padding: 1.25rem 0.9rem;
    margin-top: 1.25rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: self-start;
      .userBox {
        align-items: center;
        .userImg {
          width: 2.7rem;
          height: 2.7rem;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          overflow: hidden;
          margin-right: 0.8rem;
          img {
            width: 100%;
          }
        }
        p {
          color: var(--white-color);
          span {
            display: block;
            opacity: 0.8;
            font-size: 0.9rem;
          }
          span:first-child {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
            opacity: 1;
          }
        }
      }
      .closeBtn {
        font-size: 1.2rem;
        opacity: 1;
        transition: all 0.3s;
        > :hover {
          opacity: 0.8;
        }
        path {
          stroke: var(--white-color);
        }
      }
    }
    .commetTxt {
      margin-top: 1rem;
      display: flex;
      p {
        color: var(--white-color);
        font-size: 1rem;
        line-height: 1.5rem;
        width: 80%;
      }
      .buttonWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        font-size: 0.7rem;
      }
    }
  }
`;

export default CommentList;
