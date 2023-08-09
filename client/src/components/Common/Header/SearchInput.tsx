import { useState } from 'react';
import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { InputType } from './HeaderType';

const SearchInput: React.FC<InputType> = ({ istoggle, setIsToggle }) => {
  const [thisText, setThisText] = useState('');
  const navigate = useNavigate();
  const onChangeThis = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisText(e.currentTarget.value);
  };
  const submitQuery = () => {
    if (thisText === '') {
      return;
    } else {
      navigate(`/main/search/${thisText}`);
    }
  };
  return (
    <>
      <SearchInputBox istoggle={istoggle?.toString()}>
        <div
          className="InputBg"
          onClick={() => {
            setIsToggle?.(false);
          }}
        ></div>
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
    </>
  );
};
const SearchInputBox = styled.form<InputType>`
  width: 40rem;
  height: 3.4rem;
  position: relative;
  margin-right: 0.6rem;
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

  @media (max-width: 850px) {
    height: 2.5rem;
  }
  @media (max-width: 500px) {
    display: ${props => (props.istoggle === 'true' ? 'block' : 'none')};
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    margin-right: 0;
    left: 0;
    top: 0;
    input {
      height: 3rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
    }
    button {
      right: 3.4rem;
    }
    .InputBg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
    }
  }
`;

export default SearchInput;
