export interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

type MapItem = {
  tagId: number | string;
};

export interface EditInfoType {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;

  target: {
    id: number | string;
    name: string;
  };

  placeholder: string;

  map(callback: (value: MapItem) => MapItem): string[];

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}
export interface Tag {
  tagId: number | string;
  tagName: string;
}
