interface MyPageType {
  tabContent: JSX.Element[];
}

interface dataType {
  userId?: number;
  name?: string;
  nickname?: string;
  email?: string;
  profileImage?: string;
  myTags: {
    tagId?: number;
    tagName?: string;
  }[];
  tags?: {
    tagId?: number;
  }[];
}
