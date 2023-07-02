export interface User {
  isLoggedIn: boolean;
  userInfo: UserInfo;
}
export interface UserInfo {
  id: number;
  user_img: string;
}
