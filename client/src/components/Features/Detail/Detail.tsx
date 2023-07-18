import { useState } from 'react';
import styled from 'styled-components';
import Popunlike from '../../Common/PopIcons/Poplike';
import { DetailData } from '../../../pages/Detail/Detailcontent/detailType';

const Detail: React.FC<{ data: DetailData }> = ({ data }) => {
  const [like, setLike] = useState(data.wished);
  const handleLikeClick = () => {
    setLike(!like);
  };

  const date = data.createdAt;
  const reviewDate = date?.replace(/-/gi, '.');

  return (
    <DetailSection>
      <h4>{data.title}</h4>
      <div className="movieInfo">
        <p>{data.movie?.title}</p>
        <ul>
          {data.tags?.map(tag => {
            return <li key={tag.tagId}># {tag.tagName}</li>;
          })}
        </ul>
      </div>
      <div className="writeInfo">
        <div>
          <Popunlike onClick={handleLikeClick} like={like} />
          <span>{data.wish}</span>
        </div>
        <div>
          <span>{reviewDate}</span>
          <div className="userImg">
            <img src={data.user?.profileImage} alt={data.user?.nickname} />
          </div>
          <p>{data.user?.nickname}</p>
        </div>
      </div>
      <div className="imgWrap">
        <img src={data.thumbnail} alt={data.movie?.title} />
      </div>
      <p className="detailContent">{data.review}</p>
    </DetailSection>
  );
};

const DetailSection = styled.div`
  h4 {
    font-size: 2.1rem;
    color: var(--white-color);
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .movieInfo {
    margin: 0.8rem 0;
    p {
      font-size: 1.3rem;
      color: var(--white-color);
    }
    ul {
      display: flex;
      li {
        padding: 0.6rem 1.2rem;
        border-radius: 7px;
        background-color: var(--main-gray-color);
        margin-left: 0.4rem;
        color: var(--white-color);
        font-size: 0.8rem;
      }
    }
  }
  .writeInfo {
    color: var(--white-color);
    div {
      .userImg {
        width: 1.84rem;
        height: 1.84rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        overflow: hidden;
        margin: 0 0.6rem 0 1.2rem;
        img {
          width: 100%;
        }
      }
    }
    > div:first-child {
      align-items: self-end;
      span {
        margin-bottom: 2px;
        margin-left: 2px;
      }
      svg {
        width: 2rem;
      }
    }
  }
  .imgWrap {
    border-radius: 7px;
    overflow: hidden;
    margin: 1rem 0;
    img {
      width: 100%;
    }
  }
  .detailContent {
    color: var(--white-color);
    line-height: 1.5rem;
  }
`;
export default Detail;
