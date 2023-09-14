export type IRequestJtwDTO = {
  user: {
    sub: string;
    username: string;
    iat: string;
    exp: string;
  };
};
