import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Start from '../pages/Start';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Allcontens from '../pages/Allcontens';
import Writecontent from '../pages/Writecontent';
import Detailcontent from '../pages/Detailcontent';
import Mypage from '../pages/Mypage';
import Editmypage from '../pages/Editmypage';
import Editpassword from '../pages/Editpassword';

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/contents" element={<Allcontens />} />
        <Route path="/write" element={<Writecontent />} />
        <Route path="/detail" element={<Detailcontent />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/editmy" element={<Editmypage />} />
        <Route path="/editpass" element={<Editpassword />} />
      </Routes>
      {!isLayout && <Footer />}
    </BrowserRouter>
  );
};

export default Routers;
