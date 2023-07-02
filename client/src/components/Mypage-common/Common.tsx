import { styled } from 'styled-components';
import UserAvat from '../../assets/images/user-info/UserAvat';
import Button from '../Button/Button';

const Common = (): JSX.Element => {
  return (
    <>
      <TotalContainer>
        <TopContainer>
          <UserTopContainer>
            <User>
              <UserAvat />
              <span>홍길동님</span>
            </User>
            <Button value={'회원 정보 수정'} type="variant" />
          </UserTopContainer>
        </TopContainer>
        <BotContainer>
          <UserBotContainer>
            <UserInfo>
              <span className="title">닉네임</span>
              <span className="desc">팝콘즈 짱짱</span>
            </UserInfo>
          </UserBotContainer>
          <UserBotContainer>
            <UserInfo>
              <span className="title">이메일</span>
              <span className="desc">popcorns@gmail.com</span>
            </UserInfo>
          </UserBotContainer>
          <UserBotContainer>
            <UserInfo>
              <span className="title">태그</span>
              <span className="last-desc">#공포 #로맨스 #스릴러</span>
            </UserInfo>
          </UserBotContainer>
        </BotContainer>
      </TotalContainer>
    </>
  );
};

const TotalContainer = styled.div`
  background-color: var(--main-dark-color);
`;

const TopContainer = styled.div`
  width: 52rem;
  height: 9.32431rem;
  margin: auto;
  display: flex;
`;
const UserTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  span {
    color: var(--mypage-font-color);
    margin-left: 3rem;
    text-align: center;
    font-size: 1.4rem;
  }
`;
const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 52rem;
  margin: auto;
`;

const UserBotContainer = styled.div`
  width: 28rem;
  padding: 1rem 0.8rem;
  margin-top: 3rem;
  font-size: large;
  border-bottom: 2px solid var(--ghost-color);
`;
const UserInfo = styled.div`
  color: var(--mypage-font-color);
  .title {
    color: var(--ghost-color);
  }
  .desc {
    margin-left: 8rem;
  }
  .last-desc {
    margin-left: 9rem;
  }
`;

export default Common;
