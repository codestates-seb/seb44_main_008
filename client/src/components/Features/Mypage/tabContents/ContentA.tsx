import { styled } from 'styled-components';
import Poplike from '@/assets/images/pop-icons/pop-fill.svg';
import { useState } from 'react';
import Pagenation from '../Pagenation';
import avatar from '@/assets/images/user-info/userAvatar.png';

interface postsType {
  id: number;
  postTitle: string;
  postAuthor: string;
  movieTitle: string;
}

const DUMMY_DATA = [
  {
    id: 0,
    postTitle: '고양이 집사라면 필수 시청!',
    postAuthor: '정승현',
    movieTitle: '고양이의 보은',
  },
  {
    id: 1,
    postTitle: '고양이 집사라면 필수 시청!',
    postAuthor: '정승현',
    movieTitle: '고양이의 보은',
  },
  {
    id: 2,
    postTitle: '고양이 집사라면 필수 시청!',
    postAuthor: '정승현',
    movieTitle: '고양이의 보은',
  },
  {
    id: 3,
    postTitle: '고양이 집사라면 필수 시청!',
    postAuthor: '정승현',
    movieTitle: '고양이의 보은',
  },
];

const ContentA = () => {
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
      {DUMMY_DATA.map(item => (
        <ListOnce key={item.id}>
          <ListHead>
            <p className="title">{item.postTitle}</p>
            <AuthorInfo>
              <img src={avatar} alt="사용자 이미지" />
              <p className="author">{item.postAuthor}</p>
            </AuthorInfo>
          </ListHead>
          <ListBody>Movie Title : {item.movieTitle}</ListBody>
          <ListTail>
            <img src={Poplike} alt="좋아요 버튼" />
          </ListTail>
        </ListOnce>
      ))}
      <Pagenation />
    </>
  );
};

const ListOnce = styled.button`
  width: 100%;
  background-color: var(--ghost-color);
  margin-bottom: 2.4rem;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ListHead = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
    color: var(--white-color);
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
const ListBody = styled.div`
  display: flex;
  width: 20rem;
  font-size: 1rem;
  color: var(--main-dark-color);
  justify-content: flex-start;
  opacity: 0.8;
`;
const ListTail = styled.div`
  img {
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
  }
`;

export default ContentA;
