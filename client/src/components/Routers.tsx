import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from '../pages/Start';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Allcontens from '../pages/Allcontens';
import Writecontent from '../pages/Writecontent/Writecontent';
import Detailcontent from '../pages/Detailcontent';
import Mypage from '../pages/Mypage';
import Editmypage from '../pages/Editmypage';
import Editpassword from '../pages/Editpassword';

const Routers = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Routers;
