import { styled } from 'styled-components';
import Button from '../../../Common/Button/Button';
import { EditInfoType, Tag } from './type';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTag = () => {
  const tags = [
    {
      tagId: 1,
      tagName: '로맨스',
    },
    {
      tagId: 2,
      tagName: '호러',
    },
    {
      tagId: 3,
      tagName: '판타지',
    },
    {
      tagId: 4,
      tagName: '스포츠',
    },
    {
      tagId: 5,
      tagName: 'SF',
    },
    {
      tagId: 6,
      tagName: '액션',
    },
    {
      tagId: 7,
      tagName: '애니메이션',
    },
    {
      tagId: 8,
      tagName: '범죄',
    },
    {
      tagId: 9,
      tagName: '힐링',
    },
    {
      tagId: 10,
      tagName: '미스테리',
    },
    {
      tagId: 11,
      tagName: '뮤지컬',
    },
    {
      tagId: 12,
      tagName: '코미디',
    },
  ];
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  console.log(selectedTags);

  const onClickTag = (
    event: EditInfoType,
  ): void | MouseEvent<HTMLButtonElement> | undefined => {
    const element = document.getElementById(
      event.target.id.toString(),
    )?.classList;
    const newTagId: number | string = event.target.id;
    const newTagName: string = event.target.name.substr(1);
    const tagIdArray = selectedTags.map(tagObject => tagObject.tagId);

    if (tagIdArray.indexOf(newTagId) !== -1) {
      element?.toggle('clicked');
      const deletedTagList = selectedTags.filter(tag => tag.tagId !== newTagId);
      setSelectedTags(deletedTagList);
    } else if (selectedTags.length >= 3) {
      alert('태그는 최대 3개까지 선택 가능합니다.');
    } else {
      element?.toggle('clicked');
      const newTag = {
        tagId: newTagId,
        tagName: newTagName,
      };
      setSelectedTags([...selectedTags, newTag]);
    }
  };
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <TopContainer>
          <p>태그</p>
          <ButtonList>
            {tags.map(tag => {
              return (
                <li key={tag.tagId}>
                  <Button
                    value={`#${tag.tagName}`}
                    id={tag.tagId}
                    width={'100%'}
                    onClick={onClickTag}
                  />
                </li>
              );
            })}
          </ButtonList>
        </TopContainer>
        <TailContainer>
          <Button
            width="47%"
            value="비밀번호 수정"
            onClick={() => navigate('/mypage/edit/pass')}
          />
          <Button width="47%" value="회원정보 저장" type="variant" />
        </TailContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--main-dark-color);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 55%;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding-top: 2rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > p {
    align-self: flex-start;
    padding-bottom: 1rem;
    font-size: 0.8rem;
    color: var(--footer-icon-color);
  }
`;

const ButtonList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5rem;
  & > li {
    width: 15.5%;
  }
  li .clicked {
    background-color: var(--theme-color);
  }
  li .clicked:hover {
    background-color: var(--theme-hover-color);
  }
`;

const TailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 5rem;
`;
export default UserTag;
