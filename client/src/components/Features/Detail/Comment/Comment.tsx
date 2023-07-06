import axios from 'axios';
import CommentList from './CommentList';
import CommentWrite from './CommentWriteWrap';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import { useState } from 'react';

const Comment: React.FC<{ reviewId: string }> = ({ reviewId }) => {
  const [answer, setAnswer] = useState<Comments[]>([]);
  const getCommentList = async () => {
    try {
      const response = await axios.get(`/reviewBoards/${reviewId}`, {});
      setAnswer(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <CommentWrite />
      <CommentList answer={answer} />
    </>
  );
};

export default Comment;
