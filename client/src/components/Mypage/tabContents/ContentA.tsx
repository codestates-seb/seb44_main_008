import { styled } from 'styled-components';
import Poplike from '../../../assets/images/pop-icons/Poplike';

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
  return (
    <>
      {DUMMY_DATA.map(item => (
        <ListOnce key={item.id}>
          <ListHead>
            <p className="title">{item.postTitle}</p>
            <p className="author">{item.postAuthor}</p>
          </ListHead>
          <ListBody>{item.movieTitle}</ListBody>
          <ListTail>
            <Poplike />
          </ListTail>
        </ListOnce>
      ))}
    </>
  );
};

const ListOnce = styled.div`
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
  }
  .author {
    font-size: 0.8rem;
  }
`;
const ListBody = styled.div`
  width: 10rem;
  font-size: 0.8rem;
`;
const ListTail = styled.div``;

export default ContentA;
