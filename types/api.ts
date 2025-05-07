export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    created_at: Date;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  group_id: number;
};
