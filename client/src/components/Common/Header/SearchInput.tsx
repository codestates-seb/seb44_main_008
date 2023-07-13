import { useState } from 'react';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';

const SearchInput = () => {
  const [thisText, setThisText] = useState('');
  const onChangeThis = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisText(e.currentTarget.value);
  };
  const submitQuery = () => {};
  return (
    <SearchInputBox>
      <input
        type="text"
        placeholder="지금, 관심있는 영화를 검색해 보세요."
        value={thisText}
        onChange={onChangeThis}
      />
      <button onClick={submitQuery}>
        <GrSearch />
      </button>
    </SearchInputBox>
  );
};
const SearchInputBox = styled.form`
  width: 40rem;
  height: 3.4rem;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    background-color: var(--main-gray-color);
    border: 0;
    color: var(--white-color);
    border-radius: 10px;
    padding: 0 0.87rem;
    &:focus-visible {
      outline: 0;
    }
    &:placeholder {
      color: #565656;
    }
  }
  button {
    position: absolute;
    right: 0.87rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    path {
      stroke: #9f9f9f;
    }
  }
`;
export default SearchInput;
