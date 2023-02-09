export type ILoginCredentials = {
  username: string;
  password: string;
};

export type ISignupCredentials = ILoginCredentials & {
  displayName: string;
};
