import { styled } from 'styled-components';
import Button from '../../Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { GetUser } from '../../../api/user/userInfo/userInfo';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';
import Loading from '../../Common/Loading/Loading';
import { tagItemType } from '../../../api/tags/tagsType';

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
    return (
      <>
        <TotalContainer>
          <TopContainer>
            <UserTopContainer>
              <User>
                <img src={data.data.profileImage} alt="사용자 이미지" />
                <span>{data.data.name}님</span>
              </User>
              <Button
                value={'회원 정보 수정'}
                type="button"
                theme="variant"
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
                  {data.data.myTags.map((tag: tagItemType) => (
                    <span key={tag.tagId}>{`#${tag.tagName} `}</span>
                  ))}
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
  width: 29rem;
  height: 9.32431rem;
  margin: auto;
  display: flex;
  @media (max-width: 500px) {
    width: 80%;
    justify-content: center;
    height: 4rem;
  }
`;
const UserTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const User = styled.div`
  display: flex;
  align-items: center;
  span {
    color: var(--mypage-font-color);
    margin-left: 3rem;
    text-align: center;
    font-size: 1.4rem;
    @media (max-width: 500px) {
      font-size: 1.1rem;
    }
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    @media (max-width: 500px) {
      width: 50px;
      height: 50px;
    }
  }
`;
const BotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
  @media (max-width: 500px) {
    width: 30%;
  }
`;

const UserBotContainer = styled.div`
  width: 28rem;
  padding: 1rem 0.8rem;
  margin-top: 3rem;
  font-size: large;
  border-bottom: 2px solid var(--ghost-color);
  @media (max-width: 500px) {
    width: 18rem;
    padding: 1rem 0;
    font-size: small;
    margin-top: 0.5rem;
  }
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
  @media (max-width: 500px) {
    .desc {
      margin-left: 5rem;
    }
    .last-desc {
      margin-left: 5.9rem;
    }
  }
`;

export default Common;
