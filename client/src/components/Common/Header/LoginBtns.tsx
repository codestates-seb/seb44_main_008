import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const LoginBtns = () => {
  const navigate = useNavigate();
  const [thisLocation, setThisLocation] = useState('');
  useEffect(() => {
    setThisLocation(window.location.pathname);
  }, [navigate]);
  const btnLogin = useCallback(() => {
    navigate('/account/login');
  }, []);
  const btnRegister = useCallback(() => {
    navigate('/account/signup');
  }, []);
  return (
    <>
      {thisLocation === '/account/login' && (
        <Button value="Register" onClick={btnRegister}></Button>
      )}
      {thisLocation === '/account/signup' && (
        <Button value="Login" onClick={btnLogin}></Button>
      )}
    </>
  );
};

export default LoginBtns;
