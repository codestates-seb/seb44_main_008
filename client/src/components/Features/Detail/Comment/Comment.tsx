import { Comments } from '../../../../pages/Detail/Detailcontent/detailType';
import CommentList from './CommentList';
import CommentWrite from './CommentWrite';

const Comment: React.FC<{
  reviewId: string | undefined;
  data: Comments[] | undefined;
}> = ({ reviewId, data }) => {
  return (
    <>
      <CommentWrite reviewId={reviewId} />
      <CommentList data={data} />
    </>
  );
};

export default Comment;
