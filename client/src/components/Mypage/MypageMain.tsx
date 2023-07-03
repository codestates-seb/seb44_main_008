import { styled } from 'styled-components';
import Element0 from './tabContents/ContentA';
import Element1 from './tabContents/ContentB';
import Element2 from './tabContents/ContentC';
import Element3 from './tabContents/ContentD';
import Button from '../Button/Button';
import { useState } from 'react';

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
              />
            ) : (
              <Button
                key={idx}
                value={title}
                onClick={() => setActiveTab(idx)}
              />
            ),
          )}
        </TabList>
        <StyledContent>{tabContent[activeTab]}</StyledContent>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div``;
const StyledInnerContainer = styled.div``;
const TabList = styled.div``;
const StyledContent = styled.section``;

export default MypageMain;
