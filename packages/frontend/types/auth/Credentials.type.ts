export type Credentials = {
  username: string;
  password: string;
};

export type CredentialsRegister = Credentials & { name: string };
