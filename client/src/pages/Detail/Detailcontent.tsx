import styled from 'styled-components';
import Detail from '../../components/Features/Detail/Detail';

const DetailWrap = styled.div`
  padding: 7.5rem 2.5rem 2.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  .detailBox {
    width: 42.5rem;
  }
`;

const Detailcontent = () => {
  return (
    <DetailWrap>
      <div className="detailBox">
        <Detail />
      </div>
    </DetailWrap>
  );
};

export default Detailcontent;
