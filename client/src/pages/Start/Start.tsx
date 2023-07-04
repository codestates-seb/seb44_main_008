import Footer from '../../components/Common/Footer/Footer';
import Common from '../../components/Features/Mypage/Common';
import Header from '../../components/Common/Header/Header';
import MypageMain from '../../components/Features/Mypage/MypageMain';
import DeleteMember from '../../components/Features/Mypage/DeleteMember';

const Start = () => {
  return (
    <div>
      <Header />
      <Common />
      <MypageMain />
      <DeleteMember />
      <Footer />
    </div>
  );
};

export default Start;
