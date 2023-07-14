import { styled } from 'styled-components';
import Element0 from './tabContents/ContentA';
import Element1 from './tabContents/ContentB';
import Element2 from './tabContents/ContentC';
import Element3 from './tabContents/ContentD';
import { useState } from 'react';
import Button from '../../Common/Button/Button';
import { useQuery } from '@tanstack/react-query';
import { GetUser } from '../../../api/user/userInfo/userInfo';
import ErrorPage from '../../../pages/ErrorPage/ErrorPage';
import Loading from '../../Common/Loading/Loading';

const tabTitle: string[] = [
  '찜한 게시글',
  '내가 쓴 게시글',
  '내가 모집중인 팟',
  '내가 참여중인 팟',
];

const MypageMain = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['TabUserInfo'],
    queryFn: () => GetUser(),
  });

  const tabContent: JSX.Element[] = [
    <Element0 data={data?.data.wishBoard} />,
    <Element1 data={data?.data.myBoard} />,
    <Element2 data2={data?.data.myRecruitingGroup} />,
    <Element3 data2={data?.data.myParticipatingGroup} />,
  ];

  if (error) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    // console.log(data);
    return (
      <StyledContainer>
        <StyledInnerContainer>
          <TabList>
            {tabTitle.map((title, idx) =>
              idx === activeTab ? (
                <Button
                  key={idx}
                  value={title}
                  onClick={() => setActiveTab(idx)}
                  type="button"
                  theme="variant"
                  width="8.5rem"
                />
              ) : (
                <Button
                  key={idx}
                  value={title}
                  onClick={() => setActiveTab(idx)}
                  width="8.5rem"
                />
              ),
            )}
          </TabList>
          <StyledContent>{tabContent[activeTab]}</StyledContent>
        </StyledInnerContainer>
      </StyledContainer>
    );
  }
};

const StyledContainer = styled.div`
  background: var(--main-dark-color);
  color: var(--white-color);
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;
const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  align-items: flex-start;
  margin: 0 auto;
  width: 43rem;
`;
const TabList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 2.2rem;
`;
const StyledContent = styled.section`
  width: 100%;
`;

export default MypageMain;
