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
}
export interface Tag {
  tagId: number | string;
  tagName: string;
}
export interface UserInfoType {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string | FileData | null;
}
