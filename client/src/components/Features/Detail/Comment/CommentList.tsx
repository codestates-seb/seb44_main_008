import styled from 'styled-components';
import UserAvat from '@/assets/images/user-info/userAvatar.png';
import { GrClose } from 'react-icons/gr';
import Poplike from '../../../Common/PopIcons/Poplike';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';

const CommentList = ({ answer }: { answer: Comments[] }) => {
  return (
    <CommentListWrap>
      <li>
        <div>
          <div className="userBox">
            <div className="userImg">
              <img src={UserAvat} alt="유저명" />
            </div>
            <p>
              <span>POPPER</span>
              <span>2023.06.30</span>
            </p>
          </div>
          <button className="closeBtn">
            <GrClose />
          </button>
        </div>
        <div className="commetTxt">
          <p>
            고양이의 보은! 저도 참 좋아합니다. 🐈 어릴 적에 보고 정말 고양이를
            키우고 싶었는데... 지금은 세마리의 집사가 되어있네요..^^
          </p>
          <div className="buttonWrap">
            <Poplike />
            <span>23 Pops</span>
          </div>
        </div>
      </li>
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
