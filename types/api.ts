export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
