import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../Common/Button/Button';
import axios from 'axios';

const CommentWrite: React.FC<{ reviewId: string }> = ({ reviewId }) => {
  const [body, setBody] = useState('');
  const [checkBody, setCheckBody] = useState(false);

  const bodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckBody(false);
    setBody(e.currentTarget.value);
  };
  const submitHandler = async () => {
    setCheckBody(body === '');
    try {
      // const result = await axios.post(
      //   `/reviewBoards/${reviewId}/comments`
      // )
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <CommentWriteWrap>
      <textarea
        rows={5}
        placeholder="리뷰에 대한 소감을 남겨보세요!"
        onChange={bodyChange}
        className={`${checkBody ? 'noText' : ''}`}
      ></textarea>
      <Button
        type="variant"
        width="4.3rem"
        value="등록"
        onClick={submitHandler}
      ></Button>
    </CommentWriteWrap>
  );
};

const CommentWriteWrap = styled.div`
  margin-top: 1.875rem;
  position: relative;
  textarea {
    border: 1px solid transparent;
    width: 100%;
    background-color: var(--main-gray-color);
    border: 0;
    padding: 1.5rem 4.2rem 1.5rem 0.9rem;
    color: var(--white-color);
    border-radius: 7px;
    resize: none;
    &:focus-visible {
      outline: 0;
    }
    &.noText {
      border: 1px solid var(--theme-color);
    }
  }
  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;
export default CommentWrite;
