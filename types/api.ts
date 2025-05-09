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