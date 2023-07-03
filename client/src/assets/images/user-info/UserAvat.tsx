import { styled } from 'styled-components';
import { ReactComponent as UserAva } from '../user-info/userAvatar.svg';

const UserAvat = () => {
  return (
    <>
      <StyledUserAva />
    </>
  );
};

const StyledUserAva = styled(UserAva)`
  display: flex;
  width: 80px;
  height: 80px;
  align-items: center;
  border-radius: 50%;
`;

export default UserAvat;
