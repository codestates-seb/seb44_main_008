import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { GetCommentItem } from '../../../../api/comment/comment';
import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import ErrorPage from '../../../../pages/ErrorPage/ErrorPage';
import Loading from '../../../Common/Loading/Loading';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

const Comment: React.FC<{ reviewId: string | undefined }> = ({ reviewId }) => {
  const [answer, setAnswer] = useState<Comments[]>([]);

  const {
    data: commentItem,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['ReviewInfo'],
    queryFn: () => {
      return GetCommentItem(Number(reviewId));
    },
  });

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <CommentWrite reviewId={reviewId} />
      <CommentList answer={answer} />
    </>
  );
};

export default Comment;
