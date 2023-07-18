import { styled } from 'styled-components';
import { InputChangeEvent, InputValue, Props } from './type';
import { useState, useEffect } from 'react';
import '../../../root.css';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { GrClose } from 'react-icons/gr';

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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

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
        <StyledResetButton type="button" onClick={onReset}>
          <GrClose />
        </StyledResetButton>
      </InputCoverStyled>
    </StyleSheetManager>
  );
};

const InputCoverStyled = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
`;

const InputStyled = styled.input<Props>`
  background-color: transparent;
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
  position: absolute;
  width: 1rem;
  right: 0.1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: flex-end;
  path {
    stroke: var(--white-color);
  }
`;

export default Input;
