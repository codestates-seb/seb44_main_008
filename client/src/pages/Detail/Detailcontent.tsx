import styled from 'styled-components';
import Detail from '../../components/Features/Detail/Detail';
import Comment from '../../components/Features/Detail/Comment/Comment';
import PopperList from '../../components/Features/Detail/Popper/PopperList';
import PopperDetail from '../../components/Features/Detail/Popper/PopperDetail';
import PopperWrite from '../../components/Features/Detail/Popper/PopperWrite';

const Detailcontent = () => {
  return (
    <DetailWrap>
      <div className="detailBox">
        <Detail />
        <Comment />
      </div>
      <div className="popperBox">
        <PopperList />
        {/* <PopperDetail /> */}
        {/* <PopperWrite /> */}
      </div>
    </DetailWrap>
  );
};

const DetailWrap = styled.div`
  padding: 7.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  justify-content: center;
  .detailBox {
    width: 42.5rem;
    margin-right: 2rem;
  }
  .popperBox {
    width: 30rem;
    position: sticky;
    top: 7.5rem;
    height: 100vh;
  }
`;
export default Detailcontent;
