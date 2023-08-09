export interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

interface MapItem {
  tagId: number;
}

export interface EditInfoType {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;

  target: {
    id: string;
    name: string;
  };

  placeholder: string;

  map(callback: (value: MapItem) => MapItem): string[];

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export interface Tag {
  tagId: number;
  tagName: string;
}
export interface UserInfoType {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string | FileData | null;
  data: {
    userId: number;
    nickname: string;
    email: string;
    profileImage: string;
    tags: Tag[];
    myTags: Tag[];
  };
}
