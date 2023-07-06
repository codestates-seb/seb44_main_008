import Modal from '../../components/Common/Modal/Modal';
import UserInfo from '../../components/Features/Mypage/editmypage/UserInfo';
import UserTag from '../../components/Features/Mypage/editmypage/UserTag';

const Editmypage = () => {
  return (
    <div>
      <UserInfo />
      <UserTag />
      <Modal />
    </div>
  );
};

export default Editmypage;
