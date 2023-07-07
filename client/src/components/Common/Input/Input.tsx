import { styled } from 'styled-components';
import { InputChangeEvent, InputValue, Props } from './type';
import { useState } from 'react';
import '../../../root.css';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const Input = ({
  value = '',
  onChange,
  placeholder,
  isvalid,
  width,
  type,
}: Props) => {
  const [inputValue, setInputValue] = useState<InputValue>(value);
  const onReset = () => {
    setInputValue('');
  };

  const changeHandler = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };
  console.log(inputValue);
  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
      <InputCoverStyled>
        <InputStyled
          value={inputValue}
          onChange={changeHandler}
          placeholder={placeholder}
          isvalid={isvalid!.toString()}
          width={width}
          type={type}
        />
        <StyledResetButton onClick={onReset}>X</StyledResetButton>
      </InputCoverStyled>
    </StyleSheetManager>
  );
};
const InputCoverStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
`;

const InputStyled = styled.input<Props>`
  background-color: var(--main-dark-color);
  color: var(--white-color);
  position: relative;
  width: ${({ width }) => (width ? width : '25rem')};
  border: none;
  padding: 0.7rem;
  font-size: large;
  &:focus {
    outline: none;
  }
  border-bottom: ${({ isvalid }) =>
    isvalid === 'true'
      ? '2px solid var(--ghost-color)'
      : '2px solid var(--theme-color)'};
  animation: ${({ isvalid }) =>
    isvalid === 'false' ? 'vibration 0.1s 4' : ''};
  @keyframes vibration {
    from {
      transform: rotate(1deg);
    }
    to {
      transform: rotate(-1deg);
    }
  }
`;
const StyledResetButton = styled.button`
  color: var(--ghost-color);
  position: absolute;
  width: 1rem;
  right: 0.1rem;
`;

export default Input;
