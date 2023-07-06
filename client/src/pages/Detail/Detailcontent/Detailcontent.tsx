import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DetailData, Group } from './detailType';

import styled from 'styled-components';
import Detail from '../../../components/Features/Detail/Detail';
import Comment from '../../../components/Features/Detail/Comment/Comment';
import PopperBox from '../../../components/Features/Detail/Popper/PopperBox';

const response = {
  data: {
    reviewBoardId: 1,
    title: '고양이 집사라면 필수 시청인 영화',
    movieTitle: '고양이의 보은',
    review: '17세 여고생인 하루는 ....',
    thumbnail: 'https://s3....',
    wish: 23,
    createdAt: '2023-06-30',
    tags: [{ tagId: 1 }],
    user: {
      userId: 1,
      nickname: '홍길동',
      profileImage:
        'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
    },
    comments: [
      {
        commentId: 1,
        content: '고양이의 보은...',
        like: 23,
        createdAt: '2023-06-30',
        user: {
          userId: 1,
          nickname: '홍길동',
          profileImage:
            'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
        },
      },
    ],
    groups: [
      {
        groupId: 1,
        title: '맥주 한 캔 들고 같이 봐요',
        location: 'http://watcha...',
        date: '2023-06-30',
        max: 5,
        current: 1,
        users: [
          {
            userId: 1,
            profileImage:
              'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
          },
        ],
      },
      {
        groupId: 2,
        title: '맥주 한 캔 들고 같이 봐요',
        location: 'http://watcha...',
        date: '2023-06-30',
        max: 5,
        current: 1,
        users: [
          {
            userId: 1,
            profileImage:
              'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
          },
        ],
      },
      {
        groupId: 3,
        title: '맥주 한 캔 들고 같이 봐요',
        location: 'http://watcha...',
        date: '2023-06-30',
        max: 5,
        current: 1,
        users: [
          {
            userId: 1,
            profileImage:
              'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
          },
        ],
      },
      {
        groupId: 4,
        title: '맥주 한 캔 들고 같이 봐요',
        location: 'http://watcha...',
        date: '2023-06-30',
        max: 5,
        current: 1,
        users: [
          {
            userId: 1,
            profileImage:
              'https://cdn.9oodnews.com/news/photo/202302/21554_31060_4216.jpg',
          },
        ],
      },
    ],
  },
};
const Detailcontent = () => {
  const id = useParams().id ?? '';
  const [data, setData] = useState<DetailData>({});

  const [groups, setGroups] = useState<Group[]>([]);
  const getData = useCallback(async () => {
    try {
      // const response = await axios.get(`/reviewBoards/${id}`);
      setData(response.data);
      setGroups(response.data.groups);
    } catch (err) {
      console.log('err', err);
    }
  }, [id]);
  useEffect(() => {
    getData();
  }, []);
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
