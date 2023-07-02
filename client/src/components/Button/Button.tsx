import styled from 'styled-components';
import { ButtonType } from './type';

const ButtonWrapper = styled.div`
  width: fit-content;
`;
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

const Button = ({ value, type, width }: ButtonType) => {
  return (
    <ButtonWrapper>
      <ButtonStyle width={width} type={type}>
        {value}
      </ButtonStyle>
    </ButtonWrapper>
  );
};

export default Button;
