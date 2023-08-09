export interface LoginType {
  email: string;
  password: string;
}

export interface SignupType {
  userPostDto: {
    email: string;
    password: string;
    tags: { tagId: number }[];
    name: string;
    nickname: string;
    birth: string;
  };
}
