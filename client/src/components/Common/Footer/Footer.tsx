import '../../root.css';
import { AiFillGithub } from 'react-icons/ai';
import { RxNotionLogo } from 'react-icons/rx';
import { FiFigma } from 'react-icons/fi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1d21;
  color: white;
  height: 10.9rem;
  padding-left: 2.5rem;
  padding-right: 0.5rem;
`;
const Front = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.p`
  font-size: x-large;
  margin-bottom: 1rem;
  font-weight: 700;
`;
const Info = styled.p`
  font-size: x-small;
  opacity: 0.6;
`;
const Icons = styled.div`
  display: flex;
  width: 11.625rem;
  justify-content: space-evenly;
  font-size: x-large;
`;
const Git = styled(AiFillGithub)`
  fill: var(--footer-icon-color);
`;
const Notion = styled(RxNotionLogo)`
  color: var(--footer-icon-color);
`;
const Figma = styled(FiFigma)`
  color: var(--footer-icon-color);
`;
const Footer = () => {
  return (
    <>
      <Container>
        <Front>
          <Title>MoviePoP</Title>
          <Info>© 2023 codeStates Main-project Team, popcorns</Info>
        </Front>
        <Icons>
          <Link
            to="https://github.com/codestates-seb/seb44_main_008/tree/main"
            target="_blank"
          >
            <Git />
          </Link>
          <Link
            to="https://www.notion.so/codestates/59dd3db808d6484aab2b784978c78c37?pvs=4"
            target="_blank"
          >
            <Notion />
          </Link>
          <Link
            to="https://www.figma.com/file/maARXS3UetvMalzTyq5YrL/MoviePop?type=design&node-id=163%3A2456&mode=design&t=HH3uxJUuzWVt5zE0-1"
            target="_blank"
          >
            <Figma />
          </Link>
        </Icons>
      </Container>
    </>
  );
};

export default Footer;
