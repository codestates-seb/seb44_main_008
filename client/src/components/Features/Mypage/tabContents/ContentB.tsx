import { useState } from 'react';
import avatar from '@/assets/images/user-info/userAvatar.png';
import { postsType } from './type';
import { data } from './dummy';
import Pagenation from '../Pagenation';
import { styled } from 'styled-components';
import Button from '../../../Common/Button/Button';
import { ButtonType } from '../../../Common/Button/type';

const ContentB = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  const postData = (posts: postsType[]) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };
  return (
    <>
      {data.map(item => (
        <ListContainer key={item.id}>
          <ListOnce>
            <ListHead>
              <Titles>
                <p className="title">{item.postTitle}</p>
                <p className="mvTitle">{item.movieTitle}</p>
              </Titles>
              <AuthorInfo>
                <img src={avatar} alt="사용자 이미지" />
                <p className="author">{item.postAuthor}</p>
              </AuthorInfo>
            </ListHead>
            <ListTail>
              <StyledButton value={'수정'} type="variant" />
              <StyledButton value={'삭제'} type="variant" />
            </ListTail>
          </ListOnce>
        </ListContainer>
      ))}
      <Pagenation />
    </>
  );
};

const ListContainer = styled.div`
  > :hover {
    background-color: var(--main-gray-color);
  }
`;

const ListOnce = styled.div`
  width: 100%;
  background-color: var(--ghost-color);
  margin-bottom: 2.4rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const ListHead = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
`;
const Titles = styled.div`
  display: flex;
  .title {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  .mvTitle {
    font-size: 0.8rem;
    margin-left: 0.4rem;
    color: var(--mypage-font-color);
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    margin-right: 0.7rem;
  }
  .author {
    color: var(--white-color);
    opacity: 0.7;
    font-size: 0.8rem;
    justify-content: start;
  }
`;

const ListTail = styled.div`
  display: flex;
  width: 8.7rem;
  justify-content: space-between;
`;
const StyledButton = styled(Button)<ButtonType>``;

export default ContentB;
