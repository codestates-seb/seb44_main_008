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
    review: `17세 여고생인 하루는 집으로 가는 길에 트럭에 치일뻔한 고양이를
    구해줍니다. 그 고양이는 하루에게 고맙다고 이야기를 하고 하루의 일상은
    변화가 생기기 시작합니다. 하루는 자신이 구해준 고양이가 고양이 왕국의
    왕자인 룬이라는 사실을 알게 되고 하루의 집 앞에 찾아온 고양이 무리는
    왕자를 구해준 보답으로 왕자와 결혼해 달라고 하고 사라집니다. 그러던 중
    이상한 목소리에 듣게 되고 하루는 고양이 사무소를 찾게 됩니다. 고양이
    사무소에서 바론, 무타, 토토를 만나게 되지만 고양이 왕국의 고양이 무리가
    와서 하루를 데리고 가 버립니다. 바론, 무타는 추격해서 고양이 왕국으로
    들어가게 됩니다. 고양이 왕국에 도착하자 하루는 서서히 고양이로 변하고
    바론과 무타의 도움으로 하루는 탈출을 시도합니다. 이를 고양이 왕국의 왕은
    막으려고 하고 한바탕 소동이 벌어집니다.`,
    thumbnail:
      'https://i.ytimg.com/vi/xa7r2aQz2tQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAfMGgw2iICyXPv-ALunB-3oOdwlQ',
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
