export interface User {
  isLoggedIn: boolean;
  userInfo: UserInfo;
}
export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  user_img: string;
}
