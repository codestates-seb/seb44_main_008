import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailData, Group } from './detailType';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import Detail from '../../../components/Features/Detail/Detail';
import Comment from '../../../components/Features/Detail/Comment/Comment';
import PopperBox from '../../../components/Features/Detail/Popper/PopperBox';
import axios from 'axios';
import ErrorPage from '../../ErrorPage/ErrorPage';
import Loading from '../../../components/Common/Loading/Loading';

const Detailcontent = (): JSX.Element => {
  const id = useParams().id ?? '';
  const [data, setData] = useState<DetailData>({});

  const [groups, setGroups] = useState<Group[]>([]);

  const getItem = async ({ reviewId }: { reviewId: string }) => {
    const result = await axios.get(`/reviewBoards/${reviewId}`);
    return result.data;
  };
  const {
    data: userData,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['ReviewInfo', id],
    queryFn: () => {
      return getItem({ reviewId: id });
    },
  });
  // if (error) {
  //   return <ErrorPage />;
  // }
  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <DetailWrap>
      <div className="detailBox">
        <Detail data={data} />
        <Comment reviewId={id} />
      </div>
      <div className="popperBox">
        <PopperBox groups={groups} />
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
