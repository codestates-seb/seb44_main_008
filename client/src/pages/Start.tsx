import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';
import Common from '../components/Mypage/Common';
import Header from '../components/Header/Header';
import MypageMain from '../components/Mypage/MypageMain';

const Start = () => {
  const [email, setEmail] = useState<string>('');
  const placeholder = '이메일';
  const isValid = true;
  return (
    <div>
      <Header />
      <Common />
      {/* <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        isvalid={isValid}
      /> */}
      <MypageMain />
      <Footer />
    </div>
  );
};

export default Start;
