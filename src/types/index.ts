export type ILoginCredentials = {
  username: string;
  password: string;
};

export type ISignupCredentials = ILoginCredentials & {
  displayName: string;
};

export type IUser = {
  _id: string
  username: string
  displayName: string
  dateJoined: string
  avatar?: string
  bio: string
}
