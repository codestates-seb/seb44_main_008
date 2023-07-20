import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailData, Group } from './detailType';

import styled from 'styled-components';
import { getItem } from '../../../api/reviewItem/reviewItem';
import Loading from '../../../components/Common/Loading/Loading';
import Comment from '../../../components/Features/Detail/Comment/Comment';
import Detail from '../../../components/Features/Detail/Detail';
import PopperBox from '../../../components/Features/Detail/Popper/PopperBox';
import ErrorPage from '../../ErrorPage/ErrorPage';

const Detailcontent = (): JSX.Element => {
  const { reviewId } = useParams();
  const [data, setData] = useState<DetailData>({});

  const [groups, setGroups] = useState<Group[]>([]);

  const {
    data: dataItem,
    isLoading,
    error,
    isSuccess,
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
      <div className="popperBox">
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
`;
export default Detailcontent;
