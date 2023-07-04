import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../../components/Common/Header/Header';
import Footer from '../../components/Common/Footer/Footer';
import Start from '../Start/Start';
import Signup from '../Account/Signup';
import Login from '../Account/Login';
import Main from '../Main/Main';
import Allcontens from '../Main/Allcontents';
import Writecontent from '../Detail/Writecontent/Writecontent';
import Detailcontent from '../Detail/Detailcontent';
import Mypage from '../MyPage/Mypage';
import Editmypage from '../MyPage/Editmypage';
import Editpassword from '../MyPage/Editpassword';

const Routers = () => {
  const hideNavbar = ['/', '/start'];

  const [isLayout, setIsLayout] = useState(
    hideNavbar.includes(window.location.pathname),
  );
  useEffect(() => {
    setIsLayout(hideNavbar.includes(window.location.pathname));
  }, []);
  return (
    <BrowserRouter>
      {!isLayout && <Header />}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/account/signup" element={<Signup />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/contents" element={<Allcontens />} />
        <Route path="/detail/write" element={<Writecontent />} />
        <Route path="/detail/content" element={<Detailcontent />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<Editmypage />} />
        <Route path="/mypage/edit/pass" element={<Editpassword />} />
      </Routes>
      {!isLayout && <Footer />}
    </BrowserRouter>
  );
};

export default Routers;
