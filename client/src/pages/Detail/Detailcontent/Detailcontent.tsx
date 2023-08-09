import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getItem } from '../../../api/reviewItem/reviewItem';
import Loading from '../../../components/Common/Loading/Loading';
import Comment from '../../../components/Features/Detail/Comment/Comment';
import Detail from '../../../components/Features/Detail/Detail';
import PopperBox from '../../../components/Features/Detail/Popper/PopperBox';
import ErrorPage from '../../ErrorPage/ErrorPage';
import { useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

const Detailcontent = (): JSX.Element => {
  const { reviewId } = useParams();
  const [popShow, setPppShow] = useState(false);

  const {
    data: dataItem,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ReviewInfo', reviewId],
    queryFn: () => {
      return getItem(reviewId);
    },
  });

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <DetailWrap>
      <div className="detailBox">
        <Detail data={dataItem} reviewId={reviewId ?? ''} />
        <Comment reviewId={reviewId ?? ''} data={dataItem.comments} />
      </div>

      <div className={popShow ? 'popperBox on' : 'popperBox'}>
        <button
          className="showPopBtn"
          onClick={() => {
            setPppShow(!popShow);
          }}
        >
          <BsArrowLeftCircleFill />
        </button>
        <PopperBox
          groups={dataItem.groups}
          reviewId={reviewId ?? ''}
          movie={dataItem.movie.title}
        />
      </div>
    </DetailWrap>
  );
};

const DetailWrap = styled.div`
  padding: 7.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  justify-content: center;
  .detailBox {
    width: 42.5rem;
    margin-right: 2rem;
  }
  .popperBox {
    width: 30rem;
    position: sticky;
    top: 7.5rem;
    height: 100vh;
  }

  @media (max-width: 850px) {
    padding: 6.5rem 2rem 2rem 2rem;
    .detailBox {
      width: 100%;
      margin-right: 0;
    }
    .popperBox {
      display: block;
      position: fixed;
      right: -28rem;
      width: 28rem;
      top: 6rem;
      z-index: 100;
      transition: all 0.4s;
      .showPopBtn {
        display: block;
        position: absolute;
        left: -45px;
        top: 0px;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 0;
        width: 50px;
        height: 50px;
        border-radius: 100px 0 0 100px;
        &:focus-visible {
          outline: 0;
        }
        svg {
          color: #000;
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
          transition: all 0.4s;
        }
      }
      &.on {
        right: 0;
        svg {
          transform: translateY(-50%) rotate(180deg);
        }
      }
    }
  }
  @media (max-width: 500px) {
    padding: 5.5rem 1rem 1rem 1rem;
    .popperBox {
      right: -90%;
      width: 90%;
    }
  }
`;
export default Detailcontent;
