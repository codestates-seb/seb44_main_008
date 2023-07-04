import { styled } from 'styled-components';
import Element0 from './tabContents/ContentA';
import Element1 from './tabContents/ContentB';
import Element2 from './tabContents/ContentC';
import Element3 from './tabContents/ContentD';
import { useState } from 'react';
import Button from '../../Common/Button/Button';

const tabTitle: string[] = [
  '찜한 게시글',
  '내가 쓴 게시글',
  '내가 모집중인 팟',
  '내가 참여중인 팟',
];

const tabContent: JSX.Element[] = [
  <Element0 />,
  <Element1 />,
  <Element2 />,
  <Element3 />,
];

const MypageMain = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  console.log(activeTab);
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
                type="variant"
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
