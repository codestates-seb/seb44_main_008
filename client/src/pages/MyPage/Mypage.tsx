import Common from '../../components/Features/Mypage/Common';
import DeleteMember from '../../components/Features/Mypage/DeleteMember';
import MypageMain from '../../components/Features/Mypage/MypageMain';

const Mypage = () => {
  return (
    <div>
      <Common />
      <MypageMain />
      <DeleteMember />
    </div>
  );
};

export default Mypage;
