import CommentList from './CommentList';
import CommentWrite from './CommentWrite';
import { commentType } from './commentType';

const Comment = ({ reviewId, data }: commentType) => {
  return (
    <>
      <CommentWrite reviewId={reviewId} />
      <CommentList data={data} reviewId={reviewId} />
    </>
  );
};

export default Comment;
