import styled from 'styled-components';
import Button from '../../../Common/Button/Button';

const CommentWrite = () => {
  return (
    <CommentWriteWrap>
      <textarea
        rows={5}
        placeholder="리뷰에 대한 소감을 남겨보세요!"
      ></textarea>
      <Button type="variant" width="4.3rem" value="등록"></Button>
    </CommentWriteWrap>
  );
};

const CommentWriteWrap = styled.div`
  margin-top: 1.875rem;
  position: relative;
  textarea {
    width: 100%;
    background-color: var(--main-gray-color);
    border: 0;
    padding: 1.5rem 4.2rem 1.5rem 0.9rem;
    color: var(--ghost-color);
    border-radius: 7px;
    resize: none;
    &:focus-visible {
      outline: 0;
    }
  }
  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;
export default CommentWrite;
