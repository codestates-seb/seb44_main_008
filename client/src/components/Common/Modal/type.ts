import { MouseEventHandler, SetStateAction } from 'react';

export interface ModalTypes {
  isOpen: boolean;
  id: number;
  modalVisibleId: number | string;
  onModalHandler: (id: SetStateAction<number>) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
