import React from 'react';

type MapItem = {
  tagId: number | string;
};

export interface WriteContentType {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;

  target: {
    id: number | string;
    name: string;
  };

  placeholder: string;

  map(callback: (value: MapItem) => MapItem): string[];

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClickImg?: React.MouseEventHandler<HTMLImageElement> | void;
}
