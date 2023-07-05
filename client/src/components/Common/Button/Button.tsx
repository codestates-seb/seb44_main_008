import styled from 'styled-components';
import { ButtonType } from './type';

const ButtonStyle = styled.button<ButtonType>`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  background-color: ${props =>
    props.type === 'variant' ? '#f20000' : '#232323'};
  color: #ffffff;
  padding: 0.7rem 1.3rem;

  width: ${props => (props.width ? props.width : 'fit-content')};

  &:hover {
    background-color: ${props =>
      props.type === 'variant' ? '#c20000' : '#f20000'};
  }
`;

const Button = ({ id, value, type, width, onClick }: ButtonType) => {
  return (
    <ButtonStyle
      id={id}
      width={width}
      type={type}
      onClick={onClick}
      name={value}
    >
      {value}
    </ButtonStyle>
  );
};

export default Button;
