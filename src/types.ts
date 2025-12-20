export type User = {
  username: string;
  name: string;
  img?: string;
  friendUsers?: User[];
};

export type Message = {
  from: string;
  to: string;
  text: string;
  createdAt: string;
};
