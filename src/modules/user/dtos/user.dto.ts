export type CreateUserDTO = {
  name: string;
  username: string;
  password: string;
  email: string;
};

export type UserCreatedDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;

export type UsernameAndEmail = {
  username: string;
  email: string;
};
