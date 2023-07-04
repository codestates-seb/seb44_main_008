import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const LoginBtns = () => {
  const navigate = useNavigate();
  const [thisLocation, setThisLocation] = useState('');
  useEffect(() => {
    setThisLocation(window.location.pathname);
  }, []);
  const btnLogin = useCallback(() => {
    navigate('/login');
  }, []);
  const btnRegister = useCallback(() => {
    navigate('/register');
  }, []);
  return (
    <>
      {thisLocation === '/register' && (
        <Button value="Login" onClick={btnLogin}></Button>
      )}
      {thisLocation === '/login' && (
        <Button value="Register" onClick={btnRegister}></Button>
      )}
    </>
  );
};

export default LoginBtns;
