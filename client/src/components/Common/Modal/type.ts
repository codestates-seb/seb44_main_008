import { MouseEventHandler, SetStateAction } from 'react';

export interface ModalTypes {
  isOpen: boolean;
  id: number;
  modalVisibleId: number | string;
  offModalHandler: (id: SetStateAction<number>) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  currentRender: string;
  setCurrentRender: any;
}
