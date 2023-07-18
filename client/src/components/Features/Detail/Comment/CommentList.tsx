import { useState } from 'react';
import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import Poplike from '../../../Common/PopIcons/Poplike';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { useMutation } from '@tanstack/react-query';
import { DeleteComment } from '../../../../api/comment/comment';

const CommentList = (data?: Comments[]) => {
  const [like, setLike] = useState(false);
  const likeHandler = () => {
    setLike(!like);
  };
  const userId = useSelector(
    (state: RootState) => state.user.value.userInfo.id,
  );
  console.log(data);
  const mutationDelete = useMutation(DeleteComment(data.commentId));
  const commentDelete = () => {
    const confirmed = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirmed) {
      mutationDelete.mutate();
      alert('댓글이 정상적으로 삭제되었습니다.');
    }
  };
  return (
    <CommentListWrap>
      {data.data.map(answer => {
        return (
          <li key={answer.commentId}>
            <div>
              <div className="userBox">
                <div className="userImg">
                  <img
                    src={answer.user.profileImage}
                    alt={answer.user.nickname}
                  />
                </div>
                <p>
                  <span>{answer.user.nickname}</span>
                  <span>{answer.createdAt}</span>
                </p>
              </div>
              {userId === answer.user.userId && (
                <button className="closeBtn" onClick={commentDelete}>
                  <GrClose />
                </button>
              )}
            </div>
            <div className="commetTxt">
              <p>{answer.content}</p>
              <div className="buttonWrap">
                <Poplike onClick={likeHandler} like={like} />
                <span>{answer.liked} Pops</span>
              </div>
            </div>
          </li>
        );
      })}
    </CommentListWrap>
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
      align-items: self-end;
      p {
        color: var(--white-color);
        font-size: 1rem;
        line-height: 1.5rem;
        width: 80%;
        word-break: keep-all;
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
