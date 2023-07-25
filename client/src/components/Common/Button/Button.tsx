import styled from 'styled-components';
import { ButtonType } from './type';

const Button = ({ id, value, type, width, onClick, theme }: ButtonType) => {
  return (
    <ButtonStyle
      id={id}
      width={width}
      type={type}
      onClick={onClick}
      name={value}
      theme={theme}
    >
      {value}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<ButtonType>`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  background-color: ${props =>
    props.theme === 'variant' ? '#f20000' : '#232323'};
  color: #ffffff;
  padding: 0.7rem 1.3rem;

  width: ${props => (props.width ? props.width : 'fit-content')};

  &.clicked {
    background-color: #f20000 !important;
  }

  &:hover {
    background-color: ${props =>
      props.theme === 'variant' ? '#c20000' : '#f20000'};
  }

  @media (max-width: 1100px) {
    padding: 0.6rem 0.7rem;
    font-size: 0.8rem;
  }
  @media (max-width: 500px) {
    padding: 0.5rem 0.4rem;
    font-size: 0.1rem;
  }
`;
