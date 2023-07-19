import { useState } from 'react';
import { Group } from '../../../../pages/Detail/Detailcontent/detailType';
import PopperList from './PopperList';
import PopperDetail from './PopperDetail';
import PopperWrite from './PopperWrite';
import PopperEdit from './PopperEdit';

type PopperBoxProps = {
  groups: Group[];
  reviewId: string;
  movie: string;
};
const PopperBox: React.FC<PopperBoxProps> = ({ groups, reviewId, movie }) => {
  const [currentRender, setCurrentRender] = useState('List');
  const [currentId, setCurrentID] = useState(0);
  const [currentPage, setCurrentPage] = useState('');

  return (
    <>
      {currentRender === 'List' && (
        <PopperList
          groups={groups}
          setCurrentID={setCurrentID}
          setCurrentRender={setCurrentRender}
        />
      )}
      {currentRender === 'Detail' && (
        <PopperDetail
          reviewId={reviewId}
          currentId={currentId}
          setCurrentID={setCurrentID}
          setCurrentRender={setCurrentRender}
          currentPage="popDetail"
        />
      )}
      {currentRender === 'Write' && (
        <PopperWrite
          setCurrentRender={setCurrentRender}
          reviewId={reviewId}
          movie={movie}
        />
      )}
      {currentRender === 'Edit' && (
        <PopperEdit
          currentId={currentId}
          setCurrentRender={setCurrentRender}
          currentPage="popDetail"
        />
      )}
    </>
  );
};

export default PopperBox;
