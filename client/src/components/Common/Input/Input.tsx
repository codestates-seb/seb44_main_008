import { styled } from 'styled-components';
import { InputChangeEvent, InputValue, Props } from './type';
import { useState } from 'react';
import '../../../root.css';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const InputCoverStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InputStyled = styled.input<Props>`
  background-color: var(--main-dark-color);
  color: var(--ghost-color);
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
`;

const Input = ({
  value = '',
  onChange,
  placeholder,
  isvalid,
  width,
}: Props) => {
  const [inputValue, setInputValue] = useState<InputValue>(value);

  const changeHandler = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };
  console.log(inputValue);
  return (
    <StyleSheetManager shouldForwardProp={prop => isPropValid(prop)}>
      <InputCoverStyled>
        <InputStyled
          value={value}
          onChange={changeHandler}
          placeholder={placeholder}
          isvalid={isvalid!.toString()}
          width={width}
        />
      </InputCoverStyled>
    </StyleSheetManager>
  );
};
export default Input;
