import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

const Comment: React.FC<{
  reviewId: string;
  data: Comments[];
}> = ({ reviewId, data }) => {
  return (
    <>
      <CommentWrite reviewId={reviewId} />
      <CommentList data={data} reviewId={reviewId} />
    </>
  );
};

export default Comment;
