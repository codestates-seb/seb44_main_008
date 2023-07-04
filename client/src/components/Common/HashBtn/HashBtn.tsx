import React, { useCallback } from 'react';
import { HashType } from './type';
import styled from 'styled-components';
import Button from '../Button/Button';

const HashBtn = ({ value, onClick }: HashType) => {
  return <Button value={`# ${value}`} width="100%" onClick={onClick}></Button>;
};

export default HashBtn;
