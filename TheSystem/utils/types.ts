export type User = {
  uid?: string;
  username: string;
  fullName: string;
  level: number;
  profilePicture?: string;
  email: string;
  rank: string;
  class: string;
  tags: string[];
  todos: string[];
  [key: string]: any;
};
