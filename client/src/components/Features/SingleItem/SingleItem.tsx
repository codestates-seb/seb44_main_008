import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { SingleItemType } from './type';

const SingleItem = ({
  reviewId,
  src,
  title,
  date,
  author,
  isMain,
}: SingleItemType) => {
  const navigate = useNavigate();

  const onClickSingleItem = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const reviewId = event.currentTarget.id;
    navigate(`/detail/content/${reviewId}`);
  };

  return (
    <SingleItemDiv id={reviewId} isMain={isMain} onClick={onClickSingleItem}>
      <ImgDiv isMain={isMain}>
        <SingleItemImg src={src} isMain={isMain} />
      </ImgDiv>
      <SingleItemMeta isMain={isMain}>
        <h1>{title}</h1>
        <div>
          <p>{date}</p>
          <p>{author}</p>
        </div>
      </SingleItemMeta>
    </SingleItemDiv>
  );
};

export default SingleItem;

// Styled-Component
const SingleItemDiv = styled.div<SingleItemType>`
  width: ${props => (props.isMain ? '27rem' : '25rem')};

  @media (max-width: 1100px) {
    width: ${props => (props.isMain ? '19rem' : '19rem')};
  }
  @media (max-width: 850px) {
    width: ${props => (props.isMain ? '15rem' : '18rem')};
  }
  @media (max-width: 800px) {
    width: ${props => (props.isMain ? '14rem' : '18rem')};
  }
  @media (max-width: 730px) {
    width: ${props => (props.isMain ? '13rem' : '17rem')};
  }
  @media (max-width: 500px) {
    width: ${props => (props.isMain ? '13.5rem' : '14.5rem')};
  }
  @media (max-width: 475px) {
    width: ${props => (props.isMain ? '11rem' : '14.5rem')};
  }
  @media (max-width: 390px) {
    width: ${props => (props.isMain ? '9.5rem' : '12.5rem')};
  }
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ImgDiv = styled.div<SingleItemType>`
  height: ${props => (props.isMain ? '18rem' : '20rem')};

  @media (max-width: 1100px) {
    height: ${props => (props.isMain ? '15rem' : '17rem')};
  }
  @media (max-width: 850px) {
    height: ${props => (props.isMain ? '13rem' : '15rem')};
  }
  @media (max-width: 500px) {
    height: ${props => (props.isMain ? '11rem' : '11rem')};
  }
  @media (max-width: 390px) {
    height: ${props => (props.isMain ? '9.5rem' : '11.5rem')};
  }
  overflow: hidden;
  border-radius: 1rem;
`;

const SingleItemImg = styled.img<SingleItemType>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.1);
  }
`;

const SingleItemMeta = styled.div<SingleItemType>`
  width: 100%;
  height: 10%;
  padding: 1rem 0.7rem 0rem 0.7rem;
  color: white;
  & > h1 {
    font-size: ${props => (props.isMain ? '1.3rem' : '1.3rem')};
    @media (max-width: 1500px) {
      font-size: ${props => (props.isMain ? '1rem' : '1rem')};
    }
    @media (max-width: 500px) {
      font-size: ${props => (props.isMain ? '1rem' : '1rem')};
    }
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.2rem;
  }
  & > div {
    width: 100%;
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 500px) {
    & > h1 {
      font-size: 0.9rem;
    }
  }
`;
