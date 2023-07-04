import { ReactComponent as PopEmpty } from './pop-empty.svg';
import styled from 'styled-components';

const PopButton = styled.button`
  &:hover {
    animation: vibration 0.1s infinite;
  }
  @keyframes vibration {
    from {
      transform: rotate(3deg);
    }
    to {
      transform: rotate(-3deg);
    }
  }
`;

const Popunlike = () => {
  return (
    <PopButton>
      <PopEmpty />
    </PopButton>
  );
};

export default Popunlike;
