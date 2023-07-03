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
    <TotalContainer>
      {DUMMY_DATA.map(item => (
        <ListOnce key={item.id}>
          <ListHead>
            {item.postTitle}
            {item.postAuthor}
          </ListHead>
          <ListBody>{item.movieTitle}</ListBody>
          <ListTail>
            <Poplike />
          </ListTail>
        </ListOnce>
      ))}
    </TotalContainer>
  );
};

const TotalContainer = styled.div``;
const ListOnce = styled.div``;
const ListHead = styled.div``;
const ListBody = styled.div``;
const ListTail = styled.div``;

export default ContentA;
