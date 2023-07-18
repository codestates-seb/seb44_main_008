import { useQueryClient, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PostComment } from '../../../../api/comment/comment';
import Button from '../../../Common/Button/Button';

const CommentWrite: React.FC<{ reviewId: string }> = ({ reviewId }) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState('');
  const [checkBody, setCheckBody] = useState(false);

  const bodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheckBody(false);
    setBody(e.currentTarget.value);
  };

  const writeMutations = useMutation({
    mutationFn: postData => PostComment(reviewId, body),
    onSuccess(data) {
      queryClient.invalidateQueries(['ReviewInfo', reviewId]);
      setBody('');
    },
    onError(err) {
      console.log(err);
    },
  });
  const submitHandler = () => {
    setCheckBody(body === '');
    writeMutations.mutate({ content: body });
  };
  return (
    <CommentWriteWrap>
      <textarea
        rows={5}
        placeholder="리뷰에 대한 소감을 남겨보세요!"
        onChange={bodyChange}
        className={`${checkBody ? 'noText' : ''}`}
        value={body}
      ></textarea>
      <Button
        type="button"
        theme="variant"
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
