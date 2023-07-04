import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';

const HashBtn: React.FC<{ value: string; type: string }> = ({
  value,
  type,
}) => {
  const clickHash = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'search') {
      console.log('Type = Search');
      searchFunc(e);
    }
    if (type === 'register') {
      console.log('Type = Register');
      registerFunc(e);
    }
    if (type === 'write') {
      console.log('Type = write');
      writeFunc(e);
    }
  }, []);
  const registerFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };
  const searchFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };
  const writeFunc = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };
  return (
    <Button value={`# ${value}`} width="100%" onClick={clickHash}></Button>
  );
};

export default HashBtn;
