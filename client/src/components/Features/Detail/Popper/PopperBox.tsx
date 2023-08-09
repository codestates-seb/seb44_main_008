import { useState } from 'react';
import PopperList from './PopperList';
import PopperDetail from './PopperDetail';
import PopperWrite from './PopperWrite';
import PopperEdit from './PopperEdit';
import { PopperBoxProps } from './popperType';

const PopperBox = ({ groups, reviewId, movie }: PopperBoxProps) => {
  const [currentRender, setCurrentRender] = useState('List');
  const [currentId, setCurrentID] = useState(0);

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
