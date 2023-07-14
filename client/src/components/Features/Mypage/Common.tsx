import { styled } from 'styled-components';
import Button from '../../Common/Button/Button';
// import UserAva from '@/assets/images/user-info/userAvatar.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetUser } from '../../../api/user/userInfo/userInfo';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';
import Loading from '../../Common/Loading/Loading';
import { Key } from 'react';

const Common = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['UserInfo'],
    queryFn: () => GetUser(),
  });
  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    console.log(data);
    return (
      <>
        <TotalContainer>
          <TopContainer>
            <UserTopContainer>
              <User>
                <img src={data.profileImage} alt="사용자 이미지" />
                <span>{data.data.name}님</span>
              </User>
              <Button
                value={'회원 정보 수정'}
                type="variant"
                onClick={() => {
                  navigate('/mypage/edit');
                }}
              />
            </UserTopContainer>
          </TopContainer>
          <BotContainer>
            <UserBotContainer>
              <UserInfo>
                <span className="title">닉네임</span>
                <span className="desc">{data.data.nickname}</span>
              </UserInfo>
            </UserBotContainer>
            <UserBotContainer>
              <UserInfo>
                <span className="title">이메일</span>
                <span className="desc">{data.data.email}</span>
              </UserInfo>
            </UserBotContainer>
            <UserBotContainer>
              <UserInfo>
                <span className="title">태그</span>
                <span className="last-desc">
                  {data.data.myTags.map(
                    (tag: { tagId: Key | null | undefined; tagName: any }) => (
                      <span key={tag.tagId}>{`#${tag.tagName} `}</span>
                    ),
                  )}
                </span>
              </UserInfo>
            </UserBotContainer>
          </BotContainer>
        </TotalContainer>
      </>
    );
  }
};

const TotalContainer = styled.div`
  background-color: var(--main-dark-color);
  padding-top: 8rem;
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
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
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
