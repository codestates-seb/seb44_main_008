import axios from 'axios';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import { useEffect, useState } from 'react';

const response = {
  comments: [
    {
      commentId: 1,
      content: `고양이의 보은! 저도 참 좋아합니다. 🐈 어릴 적에 보고 정말
      고양이를 키우고 싶었는데... 지금은 세마리의 집사가
      되어있네요..^^`,
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
};
const Comment: React.FC<{ reviewId: string }> = ({ reviewId }) => {
  const [answer, setAnswer] = useState<Comments[]>([]);
  const getCommentList = async () => {
    try {
      // const response = await axios.get(`/reviewBoards/${reviewId}`, {});
      setAnswer(response.comments);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCommentList();
  }, []);
  return (
    <>
      <CommentWrite />
      <CommentList answer={answer} />
    </>
  );
};

export default Comment;
