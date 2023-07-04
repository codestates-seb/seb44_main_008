import Footer from '../components/Footer/Footer';
import Common from '../components/Mypage/Common';
import Header from '../components/Header/Header';
import MypageMain from '../components/Mypage/MypageMain';
import DeleteMember from '../components/Mypage/DeleteMember';

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
