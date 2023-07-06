import styled from 'styled-components';
import { GrClose } from 'react-icons/gr';
import Popunlike from '../../../Common/PopIcons/Poplike';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';

const CommentList = ({ answer }: { answer: Comments[] }) => {
  return (
    <CommentListWrap>
      {answer.map(answer => {
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
              <button className="closeBtn">
                <GrClose />
              </button>
            </div>
            <div className="commetTxt">
              <p>{answer.content}</p>
              <div className="buttonWrap">
                <Popunlike />
                <span>{answer.like} Pops</span>
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
