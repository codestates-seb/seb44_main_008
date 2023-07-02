import { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Input from '../components/Input/Input';

const Start = () => {
  const [email, setEmail] = useState<string>('');
  const placeholder = '이메일';
  const isValid = true;
  return (
    <div>
      Start
      <Footer />
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        isvalid={isValid}
      />
    </div>
  );
};

export default Start;
