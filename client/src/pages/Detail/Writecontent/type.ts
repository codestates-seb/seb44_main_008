import React from 'react';

export interface WriteContentType {
  placeholder?: string;
  isvalid?: boolean;

  tabObject?: {
    tagId: number;
    tagName: string;
  };

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClickImg?: React.MouseEventHandler<HTMLImageElement> | void;
}

export interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  isvalid?: string;
}
