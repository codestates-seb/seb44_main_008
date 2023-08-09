import { ReactComponent as PopEmpty } from '@/assets/images/pop-icons/pop-empty.svg';
import { ReactComponent as PopFill } from '@/assets/images/pop-icons/pop-fill.svg';
import styled from 'styled-components';
import { LikePop } from './poplikeType';

const PopButton = styled.button`
  &:hover {
    .popEmpty {
      animation: vibration 0.1s infinite;
    }
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

const Poplike: React.FC<LikePop> = ({ onClick, like }) => {
  return (
    <PopButton onClick={onClick}>
      {!like && <PopEmpty className="popEmpty" />}
      {like && <PopFill />}
    </PopButton>
  );
};

export default Poplike;
