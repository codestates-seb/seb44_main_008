import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
import Start from '../Start/Start';
import Signup from '../Account/SignupForm';
import Login from '../Account/LoginForm';
import Main from '../Main/Main';
import Allcontents from '../Main/Allcontents';
import Writecontent from '../Detail/Writecontent/Writecontent';
import EditContent from '../Detail/Writecontent/EditContent';
import Detailcontent from '../Detail/Detailcontent/Detailcontent';
import Mypage from '../MyPage/Mypage';
import Editmypage from '../MyPage/Editmypage';
import Editpassword from '../MyPage/Editpassword';
import ErrorPage from '../ErrorPage/ErrorPage';
import TagContents from '../Main/TagContents';
import KeywordContents from '../Main/KeywordContents';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';

const Routers = () => {
  const hideNavbar = ['/', '/start', '', '/#page1'];

  const userCheck = useSelector((state: RootState) => state.user.isLoggedIn);

  const [isLayout, setIsLayout] = useState(
    hideNavbar.includes(window.location.pathname),
  );
  useEffect(() => {
    setIsLayout(hideNavbar.includes(window.location.pathname));
  }, []);
  return (
    <BrowserRouter>
      <LayoutController hideNavbar={hideNavbar} setIsLayout={setIsLayout} />
      {!isLayout && <Header />}
      <Routes>
        <Route path="/" element={<Start />} />
        {!userCheck && (
          <>
            <Route path="/account/signup" element={<Signup />} />
            <Route path="/account/login" element={<Login />} />
          </>
        )}

        <Route path="/main" element={<Main />} />
        <Route path="/main/contents" element={<Allcontents />} />
        <Route path="/main/contents/:tagIdParam" element={<TagContents />} />
        <Route
          path="/main/search/:keywordParam"
          element={<KeywordContents />}
        />
        <Route path="/detail/write" element={<Writecontent />} />
        <Route path="/detail/edit/:reviewId" element={<EditContent />} />
        <Route path="/detail/content/:reviewId" element={<Detailcontent />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<Editmypage />} />
        <Route path="/mypage/edit/pass" element={<Editpassword />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      {!isLayout && <Footer />}
    </BrowserRouter>
  );
};
const LayoutController: React.FC<{
  hideNavbar: string[];
  setIsLayout: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ hideNavbar, setIsLayout }) => {
  const location = useLocation();
  useEffect(() => {
    setIsLayout(hideNavbar.includes(location.pathname));
  }, [location]);
  return null;
};
export default Routers;
